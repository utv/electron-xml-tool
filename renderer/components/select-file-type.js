
import { resolve } from 'path'
import { readFileSync } from 'fs'

function createOption(parent, inner, value) {
  let optionEle = document.createElement('option')
  optionEle.setAttribute('value', value)
  optionEle.innerHTML = inner
  parent.appendChild(optionEle)
}

function createFileSelect() {
  let fileTypeEle = document.getElementsByClassName('file-type')[0]
  const fileTypes = ['xml', 'json', 'sql']
  createOption(fileTypeEle, 'Select one', 'nothing')
  for (let eachType of fileTypes) {
    let pathToLoad = resolve(__dirname, './components', eachType, '.html')
    createOption(fileTypeEle, eachType, pathToLoad)
  }

  fileTypeEle.addEventListener('change', () => {

  })
}




