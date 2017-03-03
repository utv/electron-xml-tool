import xmlModule from '../utils/xml'

function createTable(obj) {
  let tbody = document.createElement('tbody')
  // render row and columns
  // entries = [ {name, key, value} ]
  let entries = xmlModule.getXmlEntries(obj)

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

  // add tbody into table
  let fileDetailEle = document.getElementsByClassName('file-detail')[0]
  fileDetailEle.getElementsByTagName('thead')[0].insertAdjacentElement('afterend', tbody)
}

export function createFileContent(dir, outputFile, fileType, filePath) {
  let fileDetailEle = document.getElementsByClassName('file-detail')[0]
  // inner
  // *** fill in here ***
  // clear rows
  if (fileDetailEle.firstChild) {
    while (fileDetailEle.firstChild) {
      fileDetailEle.removeChild(fileDetailEle.firstChild)
    }
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

  // table body
  if (filePath !== '' && fileType !== '' && fileType === 'xml') {
    // read xml file and display data
    xmlModule.readXML(fileType, filePath, createTable)
  }
}
