
export function createFileDetail(file = '') {
  let fileDetailEle = document.getElementsByClassName('file-detail')[0]

  // clear select box
  if (fileDetailEle.firstChild) {
    while (fileDetailEle.firstChild) {
      fileDetailEle.remove(fileDetailEle.firstChild)
    }
  }

  const thInnerHTML = ['Name', 'Key', 'Value']

  for (let eachTH of thInnerHTML) {
    let thEle = document.createElement('th')
    thEle.innerHTML = eachTH
    fileDetailEle.appendChild(thEle)
  }
}

export function initFileSelect() {
  createFileDetail()
  // initEvent()
}