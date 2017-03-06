'use strict'
import { fileManager } from '../utils/file-manager'
import { Input } from './input'

export class FileContentTable {
  constructor() {
    this.table = document.getElementsByClassName('file-content')[0]
    this.tableHead = document.getElementById('table-head')
    this.body = document.getElementById('content')
  }

  clear() {
    this.tableHead.style.display = 'none'
    let body = this.body
    if (body.firstChild) {
      while (body.firstChild) {
        body.removeChild(body.firstChild)
      }
    }
  }

  display(entries) {
    let tbody = this.body
    // render row and columns
    // entries = [ {name, key, value} ]
    let rows = []
    for (let entry in entries) {
      let row = document.createElement('tr')
      for (let key in entries[entry]) {
        let td = document.createElement('td')
        td.setAttribute('class', key)
        td.innerHTML = entries[entry][key]
        row.appendChild(td)
      }
      rows.push(row)
    }

    for (let row of rows) {
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
    // read xml and display it
    if (fileType === 'xml') {
      fileManager.readXML(filePath, (entries) => {
        this.display(entries)
      })
    }
  }

}