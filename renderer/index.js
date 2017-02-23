
import fs from 'fs'
import path from 'path'

let links = document.querySelectorAll('.menu li a')
for (let link of links) {
  link.addEventListener('click', (event) => {
    event.preventDefault()
    let page = event.target.getAttribute('href')
    const pathToLoad = path.resolve(__dirname, './components', page)
    let targetEle = document.getElementsByClassName('task')[0]
    loadPage(pathToLoad, targetEle)
  })
}

function loadPage(pathToLoad, targetEle) {
  const pageEle = fs.readFileSync(pathToLoad)
  // remove children
  while (targetEle.firstChild) {
    targetEle.removeChild(targetEle.firstChild)
  }

  // add new page elements
  targetEle.innerHTML = pageEle
}
