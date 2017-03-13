import fs from 'fs'
import path from 'path'
import xml2js from 'xml2js'

class ResultBuilder {
  constructor() {

  }

  // get a first key found in this obj  
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

  getTag(json, tag, attr, attrVal) {
    let tagArr = this.getValue(json, tag)
    console.log(tagArr)
    // tagArr[eachTag]['$'][attr]
    for (let eachTag in tagArr) {
      if (this.getValue(tagArr[eachTag], attr).indexOf(attrVal) !== -1) {
        console.log(this.getValue(tagArr[eachTag], attr))
        return tagArr[eachTag]
        // return tagArr
      }
    }
    return null
  }

  /*getTag(json, searchTag, searchAttr, filePath) {
    function traverse(obj, tag, attr, attrVal) {
      if (obj === '') return
      // pending ********* do more conditions here ********
      if (obj[tag] !== undefined && obj[tag]['$'][attr].includes(path.basename(filePath))) {
        return obj[tag]
      }
      else {
        for (let i in obj) {
          if (obj.hasOwnProperty(i) && typeof obj[i] === 'object') {
            let result = traverse(obj[i], tag, attr, attrVal)
            if (result !== null)
              return result
          }
        }
        return null
      }
    }

    return traverse(json, searchTag, searchAttr, filePath)
  }*/

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

    let xmlbuilder = require('xmlbuilder')
    let root = xmlbuilder.create('Parser', { encoding: 'UTF-8' }).dec('1.0', 'UTF-8')
      .att('version', '1.0')
      .att('Name', 'Parser')
      .att('Namespace', 'Susteen.Core.AppData')
      .att('Device', '')
      .att('icon', '')
      .ele('Application',
      {
        'AppearsInGroups': 'Messengers',
        'Caption': '',
        'name': path.basename(dirPath)
      }).end({ pretty: true })

    fs.writeFileSync(this.createResultFilePath(dirPath), root.toString())
  }

  // createApplicationNode(json, appName) {
  //   let appNode = {
  //     'Application': [{
  //       '$': {
  //         'AppearsInGroups': 'Messengers',
  //         'Caption': '',
  //         'name': appName
  //       }
  //     }]
  //   }
  //   json.push(appNode)
  // }

  createTagFilePath(dirPath, filePath) {
    let dir = path.basename(dirPath)
    let relativePath = filePath.substring(filePath.lastIndexOf(dir) + dir.length, filePath.length)
    return '%container%' + relativePath.replace(/\\/g, '\\\\')
  }

  createResultFilePath(dirPath) {
    return path.resolve(path.dirname(dirPath), path.basename(dirPath) + '.xml')
  }

  createOutputXML(dirPath, callback) {
    this.createRootNode(dirPath)
    this.loadResult2Json(dirPath, callback)
    // console.log(this.createResultFilePath)
  }

  hasKey(tagNode, val) {
    let fields = tagNode['Field']
    for (let i in fields) {
      console.log(fields[i]['_'])
      if (fields[i]['_'] === val) return true
    }
    return false
  }

  writeResult2File(json, dirPath) {
    let builder = new xml2js.Builder()
    let xml = builder.buildObject(json)
    fs.writeFileSync(resultBuilder.createResultFilePath(dirPath), xml)
  }
}
export let resultBuilder = new ResultBuilder()
