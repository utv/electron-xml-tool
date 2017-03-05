'use strict'

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

  populate(fileType, filePath) {
    console.log(fileType)
    console.log(filePath)
    if (fileType === undefined || filePath === undefined)
      return

    this.clear()
    this.tableHead.style.display = 'block'

  }

}