import fs from 'fs'
import path from 'path'

const defaultSettings = {
  rounds: 5,
  roundTime: 60, // in mcsec
  roundStartSound: path.resolve(__dirname, '../../sounds/round_start.wav'),
  roundFinishedSound: path.resolve(__dirname, '../../sounds/round_finished.wav'),
  falseStartSound: path.resolve(__dirname, '../../sounds/false_start.wav'),
  pushSound: path.resolve(__dirname, '../../sounds/push.wav'),
  backgroundSound: path.resolve(__dirname, '../../sounds/background_sound.wav'),
  timerIsRunningOverSound: path.resolve(__dirname, '../../sounds/time_is_over.wav'),
  gameOverSound: path.resolve(__dirname, '../../sounds/game_over.wav')
}
let settings = {}
const settingsPath = path.join(__dirname, '../../settings.json')

if (fs.existsSync(settingsPath)) {
  const settingsData = fs.readFileSync(settingsPath)
  try {
    settings = JSON.parse(settingsData.toString('utf-8'))

    // check json
    for (const key in defaultSettings) {
      if (!(key in settings)) { // settings must exist
        throw new Error()
      }

      if (typeof defaultSettings[key] !== typeof settings[key]) { // and same type as default
        throw new Error()
      }

      if (typeof settings[key] === 'number' && settings[key] <= 0) { // number must be > 0
        throw new Error()
      }
    }
  } catch (e) {
    saveSettings(defaultSettings)
  }
} else {
  saveSettings(defaultSettings)
}

if (Object.keys(settings).length === 0) {
  settings = defaultSettings
}

function saveSettings (values, callback = () => {}) {
  fs.writeFile(settingsPath, JSON.stringify(values), callback)
}

export { settings, defaultSettings, saveSettings }
