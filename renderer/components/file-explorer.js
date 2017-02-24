// import appState from '../../appState.js'
// import fs from 'fs'
// import { parseString } from 'xml2js'
import path from 'path'

export function createFileExplorer(dir, fileType) {
  // if (typeof appState['dir'] && typeof appState['fileType'] === 'undefined') return
  let fileExplorerEle = document.getElementsByClassName('file-explorer')[0]
  // clear children if exists
  if (fileExplorerEle.childElementCount > 0) {
    while (fileExplorerEle.firstChild) {
      fileExplorerEle.removeChild(fileExplorerEle.firstChild)
    }
  }

  // add new children
  if (fileType === 'xml') {
    let optionEle = document.createElement('option')
    optionEle.setAttribute('value', 'Select One')
    optionEle.innerHTML = path.basename('Select One')
    fileExplorerEle.appendChild(optionEle)

    // let finder = require('findit')('C:/Users/Computer/Desktop/MyXML/Android/me.lyft.android')
    let finder = require('findit')(dir)
    finder.on('file', function (file, stat) {
      let optionEle = document.createElement('option')
      optionEle.setAttribute('value', file)
      optionEle.innerHTML = path.basename(file)
      fileExplorerEle.appendChild(optionEle)
    })
  }

  fileExplorerEle.addEventListener('change', (event) => {

  })
}
