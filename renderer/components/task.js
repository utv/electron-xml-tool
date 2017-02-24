import { loadPage } from '../page.js'
import path from 'path'

/*export function createTaskUI() {
  // if (typeof appState['dir'] && typeof appState['fileType'] === 'undefined') return
  if (typeof appState['fileType'] === 'undefined') return

  // let fileType
  // if (appState['fileType'] === 'xml')  fileType
  // let taskUI = document.getElementsByClassName('task')[0]
  // loadPage(path.resolve(__dirname, 'xml.html'), )
}*/

let task = {
  ele: document.getElementsByClassName('task')[0],
  fileExplorer: {
    ele: document.getElementsByClassName('file-explorer')[0],
    page: path.resolve(__dirname, 'file-explorer.html')
  },
  resultPanel: {
    ele: document.getElementsByClassName('result-panel')[0],
    page: path.resolve(__dirname, 'result-panel.html')
  },
  createUI: function (fileType) {
    if (typeof fileType === 'undefined') return

    loadPage(this.fileExplorer.page, this.fileExplorer.ele)
    loadPage(this.resultPanel.page, this.resultPanel.ele)

  }
}

export default task