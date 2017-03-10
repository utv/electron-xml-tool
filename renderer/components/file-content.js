'use strict'
import { xmlManager } from '../utils/xml'
import { resultBuilder } from '../utils/result'


export class FileContentTable {
  constructor() {
    this.table = document.getElementsByClassName('file-content')[0]
    this.tableHead = document.getElementById('table-head')
    this.body = document.getElementById('content')
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
      event.target.parentNode.className = 'selected-row'
      // add this key into result
    } else {
      event.target.parentNode.classList.remove('selected-row')
      // remove this key from result
    }

  }

  display(entries) {
    let tbody = this.body
    // render row and columns
    // entries = [ {name, key, value} ]

    for (let entry in entries) {
      let row = document.createElement('tr')
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
        this.display(entries)
        // read resultXML to get selected fields
        resultBuilder.loadResult2Json(dirPath, (json) => {
          let selectedKeys = (json, filePath) => {
            // do work
          }
        })
      })


    }
  }

}