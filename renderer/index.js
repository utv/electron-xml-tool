
import electron from 'electron'
import path from 'path'
import { createFileTypeSelect, clearFileTypeSelect, initFileTypeSelectEvent } from './components/file-type'
import { initFileListEvent, clearFileList } from './components/file-list'
import { clearFileDetail } from './components/file-detail.js'
// import { createDirChooser } from './components/dir-chooser.js'

document.getElementsByClassName('dir-chooser')[0].addEventListener('click', () => {
  electron.remote.dialog.showOpenDialog({ properties: ['openDirectory'] }, (filePaths) => {
    if (filePaths === undefined) return

    document.getElementsByTagName('strong')[0].innerHTML = path.basename(filePaths[0])
    document.getElementById('dir').setAttribute('value', filePaths[0])
    clearFileTypeSelect()
    clearFileList()
    clearFileDetail()
    createFileTypeSelect()
  })
})

initFileTypeSelectEvent()
initFileListEvent()
// initFileDetail()
// createFileSelect()
