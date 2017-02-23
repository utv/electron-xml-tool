
import path from 'path'
import { loadPage } from '../page.js'
import { readFileSync } from 'fs'
import appState from '../../appState.js'


export function createFileSelect() {
  let selectEle = document.getElementsByClassName('file-type')[0]
  const fileTypes = ['xml', 'json', 'sql']
  for (let eachType of fileTypes) {
    let optionEle = document.createElement('option')
    optionEle.setAttribute('value', path.resolve(__dirname, eachType + '.html'))
    optionEle.innerHTML = eachType
    selectEle.appendChild(optionEle)
  }

  document.getElementsByClassName('file-type')[0].addEventListener('change', (event) => {
    loadPage(event.target.value, document.getElementsByClassName('task')[0])
    appState['fileType'] = event.target[event.target.selectedIndex].innerHTML
    console.log(appState)
  })
}
