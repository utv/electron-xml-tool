// import { appState } from '../../appState.js'
import fs from 'fs'
import path from 'path'
import xml2js from 'xml2js'

export class OutputBuilder {
  constructor() {
    this.dirPath = ''
    this.outputFilePath = ''
    this.json = ''
  }

  getValue(theKey) {
    function traverse(obj, key) {
      if (obj === '') return

      if (obj[key] === undefined) {
        for (let i in obj) {
          if (obj.hasOwnProperty(i)) {
            if (typeof obj[i] === 'object') {
              let result = traverse(obj[i], key)
              if (result !== null)
                return result
            }
          }
        }
        return null
      } else {
        return obj[key]
      }
    }

    if (this.json === '') return
    return traverse(this.json, theKey)
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
