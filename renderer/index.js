
import electron from 'electron'
// import path from 'path'
import { FileTypeSelect } from './components/file-type'
import { FileListSelect } from './components/file-list'
// import { clearFileDetail } from './components/file-detail.js'
import { DirChooser } from './components/dir-chooser'

// components
let dirChooser = new DirChooser()
let fileTypeSelect = new FileTypeSelect()
let fileListSelect = new FileListSelect()

dirChooser.onClick(() => {
  electron.remote.dialog.showOpenDialog({ properties: ['openDirectory'] }, (filePaths) => {
    if (filePaths === undefined) return

    dirChooser.dirPath = filePaths[0]
    dirChooser.displayDirText.setAttribute('value', filePaths[0])
    fileTypeSelect.clear()
    fileListSelect.clear()
    // clearFileDetail()
    fileTypeSelect.populate()
  })
})

fileTypeSelect.onChange((event) => {
  if (event.target[event.target.selectedIndex].innerHTML === 'Select One')
    return

  fileTypeSelect.selectedFileType = event.target[event.target.selectedIndex].innerHTML
  fileListSelect.populate(dirChooser.dirPath, fileTypeSelect.selectedFileType)
})


// let fileDetailTable = document.getElementsByClassName('file-detail')[0]
