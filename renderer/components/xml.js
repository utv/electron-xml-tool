import { loadPage } from '../page.js'
import { createFileExplorer } from './file-explorer.js'
import path from 'path'

export function createXmlUI() {
  let pathToLoad = path.resolve(__dirname, 'file-explorer.html')
  loadPage(pathToLoad, document.getElementsByClassName('file-list')[0])
  createFileExplorer()
}

let xmlTask = {
  fileExplorer: document.getElementsByClassName('file-explorer')[0],
  createUI: function () {
    loadPage(path.resolve(__dirname, 'file-explorer.html'), this.fileExplorer)

  }
}