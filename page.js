export function loadPage(pathToLoad, targetEle) {
  const pageEle = fs.readFileSync(pathToLoad)
  // remove children
  while (targetEle.firstChild) {
    targetEle.removeChild(targetEle.firstChild)
  }

  // add new page elements
  targetEle.innerHTML = pageEle
}
