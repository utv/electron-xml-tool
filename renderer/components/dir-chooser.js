import electron from 'electron'
import path from 'path'
import { createFileTypeSelect } from './select-file-type'
import { createRootNode } from '../utils/builder.js'
import appState from '../../appState.js'

export function createDirChooser() {
  document.getElementsByClassName('dir-chooser')[0].addEventListener('click', () => {
    electron.remote.dialog.showOpenDialog({ properties: ['openDirectory'] }, (filePaths) => {
      if (filePaths === undefined) return

      document.getElementsByTagName('strong')[0].innerHTML = path.basename(filePaths[0])
      appState['dir'] = filePaths[0]
      createFileTypeSelect(filePaths[0])
      appState['outputFileName'] = createRootNode(filePaths[0])
    })
  })
}
