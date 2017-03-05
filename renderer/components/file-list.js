'use strict'
import fs from 'fs'
import xml2js from 'xml2js'
import path from 'path'
import { xmlManager } from '../utils/xml'

class FileListSelect {
  constructor() {
    this.select = document.getElementsByClassName('file-list')[0]
  }

  clear() {
    let fileList = this.select
    // clear children if exists
    if (fileList.firstChild) {
      while (fileList.firstChild) {
        fileList.removeChild(fileList.firstChild)
      }
    }
  }

  addToOption(file, fileType, callback) {
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

  populate(dirPath, selectedFileType) {
    if (dirPath === '' || selectedFileType === '')
      return

    this.clear()
    let fileList = this.select
    let optionEle = document.createElement('option')
    optionEle.setAttribute('value', 'Select One')
    optionEle.innerHTML = path.basename('Select One')
    fileList.appendChild(optionEle)
    // add new children
    if (selectedFileType === 'xml') {
      let finder = require('findit')(dirPath)
      finder.on('file', function (file, stat) {
        xmlManager.isXML(file, () => {
          let optionEle = document.createElement('option')
          optionEle.setAttribute('value', file)
          optionEle.innerHTML = path.basename(file)
          fileList.appendChild(optionEle)
        })
      })
    }
  }

  onChange(listener) {
    this.select.addEventListener('change', listener)
  }

}
export { FileListSelect }
