
import appState from '../../appState.js'
import { createFileExplorer } from './file-explorer.js'


/*let fileSelectEle = {
  ele: document.getElementsByClassName('file-type')[0],
  fileTypes: ['Select One', 'xml', 'json', 'sql'],
  createUI: function () {
    for (let eachType of this.fileTypes) {
      let optionEle = document.createElement('option')
      optionEle.setAttribute('value', eachType)
      optionEle.innerHTML = eachType
      this.ele.appendChild(optionEle)
    }
  }
}

fileSelectEle.ele.addEventListener('change', (event) => {
  if (event.target[event.target.selectedIndex].innerHTML === 'Select One')
    return

  appState['fileType'] = event.target[event.target.selectedIndex].innerHTML
  console.log(appState)
  createFileExplorer(appState['fileType'])
})

export default fileSelectEle*/

export function createFileSelect(dir) {
  let selectEle = document.getElementsByClassName('file-type')[0]
  const fileTypes = ['Select One', 'xml', 'json', 'sql']
  for (let eachType of fileTypes) {
    let optionEle = document.createElement('option')
    optionEle.setAttribute('value', eachType)
    optionEle.innerHTML = eachType
    selectEle.appendChild(optionEle)
  }

  selectEle.addEventListener('change', (event) => {
    if (event.target[event.target.selectedIndex].innerHTML === 'Select One')
      return

    let fileType = event.target[event.target.selectedIndex].innerHTML
    console.log(fileType)
    createFileExplorer(dir, fileType)
  })
}
