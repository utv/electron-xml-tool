'use strict'

class DirChooser {
  constructor() {
    this.button = document.getElementsByClassName('dir-chooser')[0]
    this.displayDirText = document.getElementsByTagName('strong')[0]
    this.dirPath = ''
  }

  onClick(listener) {
    this.button.addEventListener('click', listener)
  }
}

export { DirChooser }
