'use strict'
import electron from 'electron'
import { FileTypeSelect } from './components/file-type'
import { FileListSelect } from './components/file-list'
import { DirChooser } from './components/dir-chooser'
import { FileContentTable } from './components/file-content'
import { OutputBuilder } from './utils/builder'
import path from 'path'

let outputBuilder = new OutputBuilder()
// components
let dirChooser = new DirChooser()
let appNameInput = document.getElementById('app-name')
let fileTypeSelect = new FileTypeSelect()
let fileListSelect = new FileListSelect()
let fileContentTable = new FileContentTable()

dirChooser.onClick(() => {
  electron.remote.dialog.showOpenDialog({ properties: ['openDirectory'] }, (filePaths) => {
    if (filePaths === undefined) return

    fileTypeSelect.clear()
    fileListSelect.clear()
    fileContentTable.clear()
    // clearFileDetail()

    dirChooser.dirPath = filePaths[0]
    dirChooser.displayDirText.innerHTML = path.basename(filePaths[0])
    outputBuilder.createOutputXML(filePaths[0])
    appNameInput.value = outputBuilder.getValue('Application')
    fileTypeSelect.populate()
  })
})

fileTypeSelect.onChange((event) => {
  if (event.target[event.target.selectedIndex].innerHTML === 'Select One')
    return

  fileListSelect.clear()
  fileContentTable.clear()
  fileTypeSelect.selectedFileType = event.target[event.target.selectedIndex].innerHTML
  fileListSelect.populate(dirChooser.dirPath, fileTypeSelect.selectedFileType)
})

fileListSelect.onChange((event) => {
  if (event.target[event.target.selectedIndex].innerHTML === 'Select One')
    return

  let filePath = event.target[event.target.selectedIndex].value
  let fileType = fileTypeSelect.selectedFileType
  fileContentTable.populate(dirChooser.dirPath, fileType, filePath)
})
// let fileDetailTable = document.getElementsByClassName('file-detail')[0]
