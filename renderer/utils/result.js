import fs from 'fs'
import path from 'path'
import xml2js from 'xml2js'

class ResultBuilder {
  constructor() {
    this.dirPath = ''
    this.outputFilePath = ''
    this.json = ''
  }

  getValue(theKey) {
    if (this.json === '') return
    function traverse(obj, key) {
      if (obj === '') return

      if (obj[key] === undefined) {
        for (let i in obj) {
          if (obj.hasOwnProperty(i) && typeof obj[i] === 'object') {
            let result = traverse(obj[i], key)
            if (result !== null)
              return result
          }
        }
        return null
      } else {
        return obj[key]
      }
    }

    return traverse(this.json, theKey)
  }

  getTagNode(nodeName) {
    console.log(this.json)
    let obj = this.getValue(nodeName)
    // console.log(obj)
  }

  loadResult2Json(callback) {
    var parser = new xml2js.Parser()
    let data = fs.readFileSync(this.outputFilePath)

    parser.parseString(data, (err, result) => {
      if (err) {
        console.log(err)
        return
      }
      else {
        this.json = result
        callback()
      }
    })
  }

  createRootNode() {
    if (fs.existsSync(this.outputFilePath)) return

    let caption = ''
    let xmlbuilder = require('xmlbuilder')
    let root = xmlbuilder.create('Parser', { encoding: 'UTF-8' }).dec('1.0', 'UTF-8')
      .att('version', '1.0')
      .att('Name', 'GroupLyftParser')
      .att('Namespace', 'Susteen.Core.AppData' + caption)
      .att('Device', '')
      .att('icon', '')
      .ele('Application',
      {
        'AppearsInGroups': 'Messengers',
        'Caption': 'GroupLyft',
        'name': path.basename(this.dirPath)
      }).end({ pretty: true })

    this.outputFilePath = path.resolve(path.dirname(this.dirPath), path.basename(this.dirPath) + '.xml')
    fs.writeFileSync(this.outputFilePath, root.toString())
  }

  createOutputXML(dirPath, callback) {
    this.dirPath = dirPath
    this.outputFilePath = path.join(path.dirname(dirPath), path.basename(dirPath) + '.xml')
    this.createRootNode()
    this.loadResult2Json(callback)
    // console.log(this.outputFilePath)
  }
}
export let resultBuilder = new ResultBuilder()
