
// import appState from '../../appState.js'
import { createFileList } from './file-list'

export function initFileTypeSelectEvent() {
  let selectEle = document.getElementsByClassName('file-type')[0]
  selectEle.addEventListener('change', (event) => {
    if (event.target[event.target.selectedIndex].innerHTML === 'Select One')
      return

    let dir = document.getElementById('dir').getAttribute('value')
    let fileType = event.target[event.target.selectedIndex].innerHTML
    createFileList(dir, fileType)
  })
}

export function createFileTypeSelect() {
  const fileTypes = ['Select One', 'xml', 'json', 'sql']
  clear()

  let selectEle = document.getElementsByClassName('file-type')[0]
  for (let eachType of fileTypes) {
    let optionEle = document.createElement('option')
    optionEle.setAttribute('value', eachType)
    optionEle.innerHTML = eachType
    selectEle.appendChild(optionEle)
  }
}

function clear() {
  let selectEle = document.getElementsByClassName('file-type')[0]
  // clear select box
  if (selectEle.firstChild) {
    while (selectEle.firstChild) {
      selectEle.remove(selectEle.firstChild)
    }
  }
}

export function clearFileTypeSelect() {
  clear()
}
