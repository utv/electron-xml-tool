
export function createFileDetail(file = '') {
  let fileDetailEle = document.getElementsByClassName('file-detail')[0]

  // clear rows
  while (fileDetailEle.firstChild) {
    console.log(fileDetailEle.firstChild)
    fileDetailEle.removeChild(fileDetailEle.firstChild)
  }

  // table header
  const thInnerHTML = ['Name', 'Key', 'Value']
  let thead = document.createElement('thead')
  fileDetailEle.insertAdjacentElement('afterbegin', thead)
  let row = thead.insertRow()
  for (let eachTH of thInnerHTML) {
    let th = document.createElement('th')
    th.innerHTML = eachTH
    row.appendChild(th)
  }

}

function initEvent() {

}

export function initFileDetail() {
  createFileDetail()
  initEvent()
}