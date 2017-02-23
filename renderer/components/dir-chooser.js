import electron from 'electron'

export function createDirChooser() {
  document.getElementsByClassName('dir-chooser')[0].addEventListener('click', () => {
    electron.remote.dialog.showOpenDialog({ properties: ['openDirectory'] }, (filenames) => {
      document.getElementsByTagName('strong')[0].innerHTML = filenames[0]
    })
  })
}
