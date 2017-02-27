// import appState from '../../appState.js'
import fs from 'fs'
import xml2js from 'xml2js'
import path from 'path'

function addToOption(file, fileType, callback) {
  if (fileType === 'xml') {
    var parser = new xml2js.Parser()
    fs.readFile(file, (err, data) => {
      parser.parseString(data, function (err, result) {
        if (err) return
        else callback()
      })
    })
  }
}

function createFileList(fileExplorerEle, dir, fileType) {
  let optionEle = document.createElement('option')
  optionEle.setAttribute('value', 'Select One')
  optionEle.innerHTML = path.basename('Select One')
  fileExplorerEle.appendChild(optionEle)
  // add new children
  if (fileType === 'xml') {
    let finder = require('findit')(dir)
    finder.on('file', function (file, stat) {
      addToOption(file, fileType, () => {
        let optionEle = document.createElement('option')
        optionEle.setAttribute('value', file)
        optionEle.innerHTML = path.basename(file)
        fileExplorerEle.appendChild(optionEle)
      })
    })
  }
}

export function createFileExplorer(dir, fileType) {
  // if (typeof appState['dir'] && typeof appState['fileType'] === 'undefined') return
  let fileExplorerEle = document.getElementsByClassName('file-explorer')[0]
  // clear children if exists
  if (fileExplorerEle.childElementCount > 0) {
    while (fileExplorerEle.firstChild) {
      fileExplorerEle.removeChild(fileExplorerEle.firstChild)
    }
  }

  createFileList(fileExplorerEle, dir, fileType)
  fileExplorerEle.addEventListener('change', (event) => {
    let file = event.target[event.target.selectedIndex]

  })
}
