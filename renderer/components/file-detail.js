import xml2js from 'xml2js'
import fs from 'fs'
import xmlModule from '../utils/xml'


function display(entries) {
  let tbody = document.createElement('tbody')
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
  let fileDetailEle = document.getElementsByClassName('file-detail')[0]
  fileDetailEle.getElementsByTagName('thead')[0].insertAdjacentElement('afterend', tbody)
}

function readXML(file, fileType, callback) {
  if (fileType === 'xml') {
    fs.readFile(file, (err, data) => {
      xml2js.parseString(data, (err, result) => {
        if (err) return
        // console.log(result)
        let entries = xmlModule.getXmlEntries(result)
        callback(entries)
      })
    })
  }
}

export function createFileDetail(file = '', fileType = '') {
  clear()
  // table header
  let fileDetailEle = document.getElementsByClassName('file-detail')[0]
  const thInnerHTML = ['Name', 'Key', 'Value']
  let thead = document.createElement('thead')
  fileDetailEle.insertAdjacentElement('afterbegin', thead)
  let row = thead.insertRow()
  for (let eachTH of thInnerHTML) {
    let th = document.createElement('th')
    th.innerHTML = eachTH
    row.appendChild(th)
  }

  // table body
  if (file !== '' && fileType !== '') {
    readXML(file, fileType, display)
  }

}

<<<<<<< HEAD
function clear() {
  let fileDetailEle = document.getElementsByClassName('file-detail')[0]
  // clear rows
  while (fileDetailEle.firstChild) {
    fileDetailEle.removeChild(fileDetailEle.firstChild)
  }
=======
function initEvent() {
  let fileDetailEle = document.getElementsByClassName('file-detail')[0]

>>>>>>> de682c84003035204141ad978d91bacb25dde010
}

export function clearFileDetail() {
  clear()
}
