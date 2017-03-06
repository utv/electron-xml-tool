// import { appState } from '../../appState.js'
import fs from 'fs'
import path from 'path'
import xml2js from 'xml2js'

/*export function createRootNode(file = '') {
  let dest = path.join(path.dirname(file), path.basename(file) + '.xml')
  console.log(dest)

  if (fs.existsSync(dest)) return

  let caption = ''
  let xmlbuilder = require('xmlbuilder')
  var root = xmlbuilder.create('Parser', { encoding: 'UTF-8' })
  root.att('version', '1.0')
  root.att('Name', '')
  root.att('Namespace', 'Susteen.Core.AppData' + caption)
  root.att('Device', '')
  root.att('icon', '')

  let app = root.ele('Application',
    {
      'AppearsInGroups': 'Messengers',
      'Caption': '',
      'name': ''
    })

  root.end({ pretty: true })
  fs.writeFileSync(dest, root.toString())
  return dest
}*/



export class OutputBuilder {
  constructor() {
    this.dirPath = ''
    this.outputFilePath = ''
    this.json = ''
  }

  editNode(nodeName) {
    if (this.json === '') return

    this.traverse(nodeName)
  }

  traverse(obj, key) {
    if (this.json === '') return

    if (obj[key] === undefined) {
      for (let i in obj) {
        console.log(obj[i])
        if (obj.hasOwnProperty(i))
          return this.traverse(obj[i], key)
      }
      return ''
    } else {
      console.log(obj[key])
      return obj[key]
    }
  }

  getValue(theKey) {
    if (this.json === '') return
    return this.traverse(this.json, theKey)
  }

  loadXmltoJson() {
    var parser = new xml2js.Parser()
    let data = fs.readFileSync(this.outputFilePath)

    parser.parseString(data, (err, result) => {
      if (err) return
      else {
        // console.log(JSON.stringify(result))
        this.json = result
      }
    })
  }

  createRootNode() {
    if (fs.existsSync(this.outputFilePath)) return

    let caption = ''
    let xmlbuilder = require('xmlbuilder')
    var root = xmlbuilder.create('Parser', { encoding: 'UTF-8' })
    root.att('version', '1.0')
    root.att('Name', 'GroupLyftParser')
    root.att('Namespace', 'Susteen.Core.AppData' + caption)
    root.att('Device', '')
    root.att('icon', '')

    let app = root.ele('Application',
      {
        'AppearsInGroups': 'Messengers',
        'Caption': 'GroupLyft',
        'name': path.basename(this.dirPath)
      })

    root.end({ pretty: true })
    // console.log(root.toString())
    // fs.writeFileSync(dest, root.toString())
  }

  createOutputXML(dirPath) {
    this.dirPath = dirPath
    this.outputFilePath = path.join(path.dirname(dirPath), path.basename(dirPath) + '.xml')
    this.createRootNode()
    this.loadXmltoJson()
    // console.log(this.outputFilePath)
  }
}
