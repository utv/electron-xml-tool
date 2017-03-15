'use strict'
import path from 'path'
import xml2js from 'xml2js'
import { xmlManager } from '../utils/xml'
import { resultBuilder } from '../utils/result'


export class FileContentTable {
  constructor() {
    this.table = document.getElementsByClassName('file-content')[0]
    this.tableHead = document.getElementById('table-head')
    this.body = document.getElementById('content')
    // this.status = document.getElementById('status')
    this.rows = []
    this.entries = []
  }

  clear() {
    if (this.rows.length > 0) {
      this.rows.forEach((row) => {
        row.removeEventListener('click', this.rowSelect)
      })
    }

    this.tableHead.style.display = 'none'
    let body = this.body
    if (body.firstChild) {
      while (body.firstChild) {
        body.removeChild(body.firstChild)
      }
    }
  }

  rowSelect(event) {
    if (event.target.parentNode.className !== 'selected-row') {
      event.target.parentNode.className = 'processing-row'
      // let dirPath = row.dirPath
      let row = event.target.parentNode
      let resultFile = row.resultFile
      let entries = this.entries

      resultBuilder.loadResult2Json(resultFile,
        (json) => {
          if (event.target.parentNode.fileType === 'XML') {
            let fileType = event.target.parentNode.fileType
            let tagFilePath = row.tagFilePath
            let fieldRename = row.children[0].innerHTML
            let selectedFieldName = row.children[1].innerHTML
            resultBuilder.addField(json, resultFile, fileType, tagFilePath, fieldRename, selectedFieldName)
            row.highlightRows(resultFile, fileType, tagFilePath, entries)
          }
          // event.target.parentNode.className = 'selected-row'
        })

    } else if (event.target.parentNode.className === 'processing-row') {
      // do nothing, it's processing
    }
    else {
      // remove this key from result then update css
      /*event.target.parentNode.className = 'processing-row'
      let dirPath = event.target.parentNode.dirPath
      resultBuilder.loadResult2Json(dirPath, (json) => {
        if (event.target.parentNode.fileType === 'xml') {
          let row = event.target.parentNode
          xmlManager.removeFromXmlTag(json, row)
          console.log(json)
        }
      })
      event.target.parentNode.classList.remove('selected-row')*/
    }

  }

  // display(dirPath, fileType, filePath, entries) {
  display(resultFile, fileType, tagFilePath, entries) {
    let tbody = this.body
    // render row and columns
    // entries = [ {rename, name, value} ]

    for (let entry in entries) {
      let row = document.createElement('tr')
      // row.dirPath = dirPath
      // row.filePath = filePath
      row.resultFile = resultFile
      row.fileType = fileType
      row.tagFilePath = tagFilePath

      for (let key in entries[entry]) {
        let td = document.createElement('td')
        td.setAttribute('class', key)
        td.innerHTML = entries[entry][key]
        row.appendChild(td)
      }
      console.log(this.highlightRows)
      row.highlightRows = this.highlightRows
      row.addEventListener('click', this.rowSelect)
      this.rows.push(row)
      tbody.appendChild(row)
    }

    // obj['map'][each][i]['$', '_']
    // tbody.appendChild(row)
    // add tbody into table
    this.tableHead.insertAdjacentElement('afterend', tbody)
  }

  highlightRows(resultFile, fileType, tagFilePath, entries) {
    // get a list of selected field
    resultBuilder.loadResult2Json(resultFile, (json) => {
      let selectedKeys = resultBuilder.getSelectedKeys(json, fileType, tagFilePath)
      if (selectedKeys === null) return

      // entries = [ {rename, name, value} ]
      console.log('highlighted')
      for (let entry in entries) {
        let key = entries[entry]['name']
        if (selectedKeys.indexOf(key) !== -1) {
          console.log(key)
        }
      }

      let content = document.getElementById('content')
      if (content.childElementCount > 0) {
        let rows = content.querySelectorAll('tr')
        for (let i = 0; i < rows.length; i++) {
          let fieldName = rows.item(i).getElementsByClassName('name')[0].innerHTML
          if (selectedKeys.indexOf(fieldName) !== -1) {
            rows.item(i).className = 'selected-row'
          }
        }
      }
    })
  }

  populate(dirPath, fileType, filePath) {
    if (fileType === undefined || filePath === undefined)
      return

    // invisible table head
    this.clear()
    this.tableHead.style.display = 'block'

    // if a output node for this file is not created,
    // read android xml file and display it
    if (fileType === 'XML') {
      let self = this
      xmlManager.readXML(filePath, (entries) => {
        this.entries = entries
        let tagFilePath = resultBuilder.createTagFilePath(dirPath, filePath)
        let resultFile = resultBuilder.createResultFilePath(dirPath)
        self.display(resultFile, fileType, tagFilePath, entries)
        // entries = [ {rename, name, value} ]
        self.highlightRows(resultFile, fileType, tagFilePath, entries)
      })
    }
  }

}