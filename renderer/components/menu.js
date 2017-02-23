import path from 'path'
import { loadPage } from '../page.js'

/*export function createMenu() {
  let links = document.querySelectorAll('.menu li a')
  for (let link of links) {
    link.addEventListener('click', (event) => {
      event.preventDefault()
      let page = event.target.getAttribute('href')
      const pathToLoad = path.resolve(__dirname, page)
      let targetEle = document.getElementsByClassName('task')[0]
      loadPage(pathToLoad, targetEle)
    })
  }
}*/

export function createMenu() {
  let menu = document.getElementsByClassName('file-type')[0]
  const fileTypes = ['xml', 'json', 'sql']
  for (let eachType of fileTypes) {
    let optionEle = document.createElement('option')
    optionEle.innerHTML = eachType
    optionEle.setAttribute('value', path.resolve(__dirname, 'component', eachType, '.html'))
    menu.appendChild(optionEle)
  }

  document.getElementsByClassName('file-type')[0].addEventListener('change', (event) => {
    console.log(__dirname)
  })
}