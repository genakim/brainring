import { app, BrowserWindow, nativeTheme } from 'electron'
import SerialPort from 'serialport'
import five from 'johnny-five'

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

let mainWindow

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    useContentSize: true,
    webPreferences: {
      // Change from /quasar.conf.js > electron > nodeIntegration;
      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: QUASAR_NODE_INTEGRATION

      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      // preload: path.resolve(__dirname, 'electron-preload.js')
    }
  })

  mainWindow.loadURL(process.env.APP_URL)

  SerialPort.list().then(devices => {
    devices.forEach(device => {
      if (device.productId !== '0043') {
        mainWindow.webContents.send('deviceInfo', 404) // device not found
        return
      }

      mainWindow.webContents.send('deviceInfo', 200) // device found

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

          mainWindow.webContents.send('push', 'green')
        })

        buttonGreen.on('up', function () {
          console.log('btn 1 up')
          ledGreen.off()
        })

        buttonRed.on('down', function () {
          console.log('down')
          ledRed.on()

          mainWindow.webContents.send('push', 'red')
        })

        buttonRed.on('up', function () {
          console.log('up')
          ledRed.off()
        })
      })
    })
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
