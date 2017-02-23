
function createDirChooser() {
  let dirChooserEle = document.getElementsByClassName('dir-chooser')[0]
  dirChooserEle.addEventListener('change', (event) => {
    console.log(event.target.value)
  })
}