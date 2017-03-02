import xml2js from 'xml2js'
import fs from 'fs'
import xmlModule from '../utils/xml'


function renderXML(obj) {
  let tbody = document.createElement('tbody')
  // render row and columns
  // entries = [ {name, key, value} ]
  let entries = xmlModule.getXmlEntries(obj)

  let rows = []
  for (let entry in entries) {
    let row = document.createElement('tr')
    for (let key in entries[entry]) {
      let td = document.createElement('td')
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
  let fileDetailEle = document.getElementsByClassName('file-detail')[0]
  fileDetailEle.getElementsByTagName('thead')[0].insertAdjacentElement('afterend', tbody)
}

function renderBody(file, fileType, callback) {
  if (fileType === 'xml') {
    fs.readFile(file, (err, data) => {
      xml2js.parseString(data, (err, result) => {
        if (err) return
        // console.log(result)
        callback(result)
      })
    })
  }
}

export function createFileDetail(file = '', fileType = '') {
  let fileDetailEle = document.getElementsByClassName('file-detail')[0]

  // clear rows
  while (fileDetailEle.firstChild) {
    fileDetailEle.removeChild(fileDetailEle.firstChild)
  }

  // table header
  const thInnerHTML = ['Name', 'Key', 'Value']
  let thead = document.createElement('thead')
  fileDetailEle.insertAdjacentElement('afterbegin', thead)
  let row = thead.insertRow()
  for (let eachTH of thInnerHTML) {
    let th = document.createElement('th')
    th.innerHTML = eachTH
    row.appendChild(th)
  }

  if (file !== '' && fileType !== '') {
    renderBody(file, fileType, renderXML)
  }

}

function initEvent() {

}

export function initFileDetail() {
  createFileDetail()
  initEvent()
}