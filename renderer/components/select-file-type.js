
// import appState from '../../appState.js'
import { createFileList } from './file-list'

function initEvent() {
  let selectEle = document.getElementsByClassName('file-type')[0]
  selectEle.addEventListener('change', (event) => {
    if (event.target[event.target.selectedIndex].innerHTML === 'Select One')
      return

    let fileType = event.target[event.target.selectedIndex].innerHTML
    createFileList(fileType)
  })
}

export function createFileSelect(dir) {
  let selectEle = document.getElementsByClassName('file-type')[0]
  const fileTypes = ['Select One', 'xml', 'json', 'sql']
  // clear select box
  if (selectEle.firstChild) {
    while (selectEle.firstChild) {
      selectEle.remove(selectEle.firstChild)
    }
  }

  for (let eachType of fileTypes) {
    let optionEle = document.createElement('option')
    optionEle.setAttribute('value', eachType)
    optionEle.innerHTML = eachType
    selectEle.appendChild(optionEle)
  }

  createFileList(dir)
}

export function initFileSelect() {
  createFileSelect()
  initEvent()
}
