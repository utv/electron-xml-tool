import fs from 'fs'
import path from 'path'
import xml2js from 'xml2js'

class ResultBuilder {
  constructor() {

  }

  getValue(json, theKey) {
    if (json === '') return
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

    return traverse(json, theKey)
  }

  loadResult2Json(dirPath, callback) {
    var parser = new xml2js.Parser()
    let data = fs.readFileSync(this.createResultFilePath(dirPath))

    parser.parseString(data, (err, result) => {
      if (err) {
        console.log(err)
        return
      }
      else {
        // json = result
        callback(result)
      }
    })
  }

  createRootNode(dirPath) {
    if (fs.existsSync(this.createResultFilePath(dirPath))) return

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
        'name': path.basename(dirPath)
      }).end({ pretty: true })

    fs.writeFileSync(this.createResultFilePath(dirPath), root.toString())
  }

  createResultFilePath(dirPath) {
    return path.resolve(path.dirname(dirPath), path.basename(dirPath) + '.xml')
  }

  createOutputXML(dirPath, callback) {
    this.createRootNode(dirPath)
    this.loadResult2Json(dirPath, callback)
    // console.log(this.createResultFilePath)
  }
}
export let resultBuilder = new ResultBuilder()
