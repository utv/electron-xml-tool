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
      let row = event.target.parentNode
      let dirPath = row.dirPath
      let dest = resultBuilder.createResultFilePath(dirPath)
      resultBuilder.loadResult2Json(dest,
        (json) => {
          if (event.target.parentNode.fileType === 'xml') {
            let filePath = row.filePath
            let tagFilePath = resultBuilder.createTagFilePath(dirPath, filePath)
            let fieldRename = row.children[0].innerHTML
            let fieldName = row.children[1].innerHTML
            resultBuilder.addField(json, dest, tagFilePath, fieldRename, fieldName)
            // console.log(json)
          }
        })
      event.target.parentNode.className = 'selected-row'
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

  // entries = obj['map']['string'][i]['$']
  display(dirPath, fileType, filePath, entries) {
    let tbody = this.body
    // render row and columns
    // entries = [ {rename, name, value} ]

    for (let entry in entries) {
      let row = document.createElement('tr')
      row.dirPath = dirPath
      row.fileType = fileType
      row.filePath = filePath

      for (let key in entries[entry]) {
        let td = document.createElement('td')
        td.setAttribute('class', key)
        td.innerHTML = entries[entry][key]
        row.appendChild(td)
      }
      row.addEventListener('click', this.rowSelect)
      this.rows.push(row)
      tbody.appendChild(row)
    }

    // obj['map'][each][i]['$', '_']
    // tbody.appendChild(row)
    // add tbody into table
    this.tableHead.insertAdjacentElement('afterend', tbody)
  }

  populate(dirPath, fileType, filePath) {
    if (fileType === undefined || filePath === undefined)
      return

    // invisible table head
    this.clear()
    this.tableHead.style.display = 'block'

    // if a output node for this file is not created,
    // read android xml file and display it
    if (fileType === 'xml') {
      xmlManager.readXML(filePath, (entries) => {
        this.display(dirPath, fileType, filePath, entries)
        // read resultXML to get selected fields

        resultBuilder.loadResult2Json(resultBuilder.createResultFilePath(dirPath),
          (json) => {
            console.log(json)
            let tagFilePath = resultBuilder.createTagFilePath(dirPath, filePath)
            let tagNode = resultBuilder.getTag(json, 'XML', 'File', tagFilePath)
            if (tagNode === null) return

            // return a list of selected key
            // let selectedKeys = 
            // console.log(selectedKeys)
            // this.display(dirPath, fileType, filePath, entries, selectedKeys)
          })
      })


    }
  }

}