'use strict'
import electron from 'electron'
import { FileTypeSelect } from './components/file-type'
import { FileListSelect } from './components/file-list'
import { DirChooser } from './components/dir-chooser'
import { FileContentTable } from './components/file-content'

// components
let dirChooser = new DirChooser()
let fileTypeSelect = new FileTypeSelect()
let fileListSelect = new FileListSelect()
let fileContentTable = new FileContentTable()

dirChooser.onClick(() => {
  electron.remote.dialog.showOpenDialog({ properties: ['openDirectory'] }, (filePaths) => {
    if (filePaths === undefined) return

    dirChooser.dirPath = filePaths[0]
    dirChooser.displayDirText.innerHTML = filePaths[0]

    fileTypeSelect.clear()
    fileListSelect.clear()
    fileContentTable.clear()
    // clearFileDetail()
    fileTypeSelect.populate()
  })
})

fileTypeSelect.onChange((event) => {
  if (event.target[event.target.selectedIndex].innerHTML === 'Select One')
    return

  fileContentTable.clear()
  fileTypeSelect.selectedFileType = event.target[event.target.selectedIndex].innerHTML
  fileListSelect.populate(dirChooser.dirPath, fileTypeSelect.selectedFileType)
})

fileListSelect.onChange((event) => {
  if (event.target[event.target.selectedIndex].innerHTML === 'Select One')
    return

  let filePath = event.target[event.target.selectedIndex].value
  let fileType = fileTypeSelect.selectedFileType
  fileContentTable.populate(fileType, filePath)
})
// let fileDetailTable = document.getElementsByClassName('file-detail')[0]
