
// import appState from '../../appState.js'
import { createFileList } from './file-list'

export function createFileTypeSelect(dir, outputFile) {
  let selectEle = document.getElementsByClassName('file-type')[0]
  // inner
  function listener(event) {
    if (event.target[event.target.selectedIndex].innerHTML === 'Select One')
      return

    let fileType = event.target[event.target.selectedIndex].innerHTML
    createFileList(dir, outputFile, fileType)
  }

  // clear children if exists
  if (selectEle.firstChild) {
    while (selectEle.firstChild) {
      selectEle.remove(selectEle.firstChild)
    }
  }
  selectEle.removeEventListener('change', listener)

  // populate children
  const fileTypes = ['Select One', 'xml', 'json', 'sql']
  for (let eachType of fileTypes) {
    let optionEle = document.createElement('option')
    optionEle.setAttribute('value', eachType)
    optionEle.innerHTML = eachType
    selectEle.appendChild(optionEle)
  }

  selectEle.addEventListener('change', listener)
}
