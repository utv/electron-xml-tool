
'use strict'

class FileTypeSelect {
  constructor() {
    this.select = document.getElementsByClassName('file-type')[0]
    this.selectedFileType = ''
    this.fileTypes = ['Select One', 'xml', 'json', 'sql']
  }

  clear() {
    let selectEle = this.select
    if (selectEle.firstChild) {
      while (selectEle.firstChild) {
        selectEle.remove(selectEle.firstChild)
      }
    }
  }

  populate() {
    this.clear()
    let selectEle = this.select
    for (let eachType of this.fileTypes) {
      let optionEle = document.createElement('option')
      optionEle.setAttribute('value', eachType)
      optionEle.innerHTML = eachType
      selectEle.appendChild(optionEle)
    }
  }

  onChange(listener) {
    this.select.addEventListener('change', listener)
  }
}
export { FileTypeSelect }
