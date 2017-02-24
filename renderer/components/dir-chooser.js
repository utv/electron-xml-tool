import electron from 'electron'
import appState from '../../appState.js'
import path from 'path'
import { createFileSelect } from './select-file-type'

export function createDirChooser() {
  document.getElementsByClassName('dir-chooser')[0].addEventListener('click', () => {
    electron.remote.dialog.showOpenDialog({ properties: ['openDirectory'] }, (filePaths) => {
      document.getElementsByTagName('strong')[0].innerHTML = path.basename(filePaths[0])
      // appState['dir'] = filePaths[0]
      createFileSelect(filePaths[0])
    })
  })
}
