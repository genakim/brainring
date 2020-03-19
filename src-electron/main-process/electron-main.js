import { app, BrowserWindow, nativeTheme, Menu, dialog } from 'electron'
import SerialPort from 'serialport'
import five from 'johnny-five'
const path = require('path')

let board,
  buttonRed,
  buttonGreen,
  ledRed,
  ledGreen

try {
  if (process.platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(require('path').join(app.getPath('userData'), 'DevTools Extensions'))
  }
} catch (_) { }

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
  global.__statics = require('path').join(__dirname, 'statics').replace(/\\/g, '\\\\')
}


setMenu()

let operatorWindow, settingsWindow

function createWindow () {
  /**
   * Initial window options
   */
  operatorWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    useContentSize: true,
    fullscreenable: true,
    webPreferences: {
      // Change from /quasar.conf.js > electron > nodeIntegration;
      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: QUASAR_NODE_INTEGRATION

      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      // preload: path.resolve(__dirname, 'electron-preload.js')
    }
  })

  operatorWindow.loadURL(process.env.APP_URL)

  SerialPort.list().then(devices => {
    devices.forEach(device => {
      if (device.productId !== '0043') {
        operatorWindow.webContents.send('deviceInfo', 404) // device not found
        return
      }

      operatorWindow.webContents.send('deviceInfo', 200) // device found

      board = new five.Board(
        {
          port: device.path
          // timeout: 36000
        }
      )

      board.on('ready', function () {
        buttonGreen = new five.Button(7)
        buttonRed = new five.Button({
          pin: 2,
          isPullup: true
        })

        ledGreen = new five.Led(12)
        ledRed = new five.Led(13)

        buttonGreen.on('down', function () {
          console.log('down')
          ledGreen.on()

          operatorWindow.webContents.send('push', 'green')
        })

        buttonGreen.on('up', function () {
          console.log('btn 1 up')
          ledGreen.off()
        })

        buttonRed.on('down', function () {
          console.log('down')
          ledRed.on()

          operatorWindow.webContents.send('push', 'red')
        })

        buttonRed.on('up', function () {
          console.log('up')
          ledRed.off()
        })
      })
    })
  })

  operatorWindow.on('closed', () => {
    operatorWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (operatorWindow === null) {
    createWindow()
  }
})
function openSettings () {
  settingsWindow = new BrowserWindow({
    title: 'Настройки',
    width: 400,
    height: 700,
    useContentSize: false,
    parent: operatorWindow,
    modal: true,
    titleBarStyle: 'hidden',
    thickFrame: true,
    resizable: false,
    minimizable: false,
    maximizable: false,
    webPreferences: {
      // Change from /quasar.conf.js > electron > nodeIntegration;
      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: QUASAR_NODE_INTEGRATION

      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      // preload: path.resolve(__dirname, 'electron-preload.js')
    }
  })
  settingsWindow.removeMenu()
  console.log(process.env.APP_URL);
  settingsWindow.loadURL(process.env.APP_URL + '/#/settings')
}
function setMenu () {
  const isMac = process.platform === 'darwin'
  const template = [
    {
      label: 'Игра',
      submenu: [
        {
          label: 'Настройки',
          enabled: true,
          click: () => {
            openSettings()
          }
        },
        isMac ? { label: 'Выйти', role: 'close' } : { label: 'Выйти', role: 'quit' }
      ]
    },
    {
      label: 'Помощь',
      role: 'help',
      submenu: [
        {
          label: 'Правила игры',
        },
        {
          label: 'Периферия'
        },
        { type: 'separator' },
        {
          label: 'О программе',
          click: () => {
            dialog.showMessageBox(operatorWindow, {
                type: 'info',
                title: 'О программе',
                message: 'Брейн ринг. Автор Геннадий Ким (web.artisant@gmail.com)',
                buttons: ['Ok']
            })
          }
        }
      ]
    }
  ]
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}
