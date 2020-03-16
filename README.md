#Брейн ринг

Игра по мотивам брейн-ринга.  
В качестве периферии использована *Arduino Uno*. Управление происходит через модуль
[Johny-Five](https://johnny-five.io/).
В качестве програмной основы использован фреймворк [Quasar](https://quasar.dev/) и [ElectronJs](https://www.electronjs.org/).

##Примечания
Есть некоторые проблемы при работе модуля `SerialPort` с *ElectronJS*. 
После установки зависимостей `npm install` выполните команду `./node_modules/.bin/electron-rebuild -$(electron -v)`
