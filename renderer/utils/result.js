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

  getTagByAttr(json, tag, attr, attrVal) {
    let tagArr = this.getValue(json, tag)

    // tagArr[eachTag]['$'][attr]
    for (let eachTag in tagArr) {
      // if (this.getValue(tagArr[eachTag], attr).indexOf(attrVal) !== -1) {
      if (this.getValue(tagArr[eachTag], attr) === attrVal) {
        console.log(this.getValue(tagArr[eachTag], attr))
        return tagArr[eachTag]
        // return tagArr
      }
    }
    return null
  }

  getTag(json, tag) {
    let tagArr = this.getValue(json, tag)
    console.log(tagArr)
    // tagArr[eachTag]['$'][attr]
    for (let eachTag in tagArr) {
      if (typeof this.getValue(tagArr[eachTag]) !== 'undefined') {
        return tagArr[eachTag]
        // return tagArr
      }
    }
    return null
  }

  loadResult2Json(resultFilePath, callback) {
    var parser = new xml2js.Parser()
    let data = fs.readFileSync(resultFilePath)

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

  createRootNode(resultFilePath) {
    if (fs.existsSync(resultFilePath)) return

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
        'name': path.basename(resultFilePath)
      }).end({ pretty: true })

    fs.writeFileSync(this.createResultFile(resultFilePath), root.toString())
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
    let process = require('process')
    if (process.platform.match(/^win/))
      return '%container%' + relativePath.replace(/\\/g, '\\\\')
    return '%container%' + relativePath.replace(/\//g, '\\\\')
  }

  createResultFile(dirPath) {
    return path.resolve(path.dirname(dirPath), path.basename(dirPath) + '.xml')
  }

  createOutputXML(resultFilePath, callback) {
    this.createRootNode(resultFilePath)
    this.loadResult2Json(resultFilePath, callback)
    // console.log(this.createResultFilePath)
  }

  getSelectedKeys(json, fileType, tagFilePath) {
    let tagNode = resultBuilder.getTagByAttr(json, fileType, 'File', tagFilePath)
    if (tagNode === null) return

    let fields = this.getValue(tagNode, 'Field')
    let selectedKeys = []
    for (let field in fields) {
      selectedKeys.push(this.getValue(fields[field], '_'))
    }
    return selectedKeys
  }

  hasKey(tagNode, val) {
    let fields = tagNode['Field']
    for (let i in fields) {
      console.log(fields[i]['_'])
      if (fields[i]['_'] === val) return true
    }
    return false
  }

  removeFromXmlTag(json, dirPath, filePath, fieldRename) {
    /*let dirPath = row.dirPath
    let filePath = row.filePath
    let tagFilePath = resultBuilder.createTagFilePath(dirPath, filePath)
    let fieldRename = row.children[0].innerHTML
    let fieldName = row.children[1].innerHTML
    let tagNode = resultBuilder.getTag(json, 'XML', 'File', tagFilePath)
    let xmlNode = resultBuilder.getTag(json, 'XML', 'File', tagFilePath)
    let target = resultBuilder.getTag(xmlNode, 'Field', '_', fieldName)
    console.log(target)*/
  }

  isFieldExist(json, fileType, tagFilePath, fieldName) {
    let fields = resultBuilder.getValue(json, 'Field')
    if (fields === null) return false
    // if (fields.length === 1) return resultBuilder.getValue(fields, '_') === fieldName

    for (let field in fields) {
      if (resultBuilder.getValue(fields[field], '_') === fieldName) return true
    }
    return false
  }

  addField(json, resultFile, fileType, tagFilePath, fieldRename, fieldName) {
    let tagNode = resultBuilder.getTagByAttr(json, fileType, 'File', tagFilePath)
    if (tagNode === null) {
      // let applicationName = path.basename(dirPath)
      this.createXmlTagNode(json, tagFilePath)
    }

    if (!this.isFieldExist(tagNode, fileType, tagFilePath, fieldName)) {
      if (typeof tagNode['Field'] === 'undefined') {
        tagNode['Field'] = []
      }

      tagNode['Field'].push({
        '$': {
          'Name': fieldRename
        },
        '_': fieldName
      })

      let builder = new xml2js.Builder()
      let xml = builder.buildObject(json)
      fs.writeFileSync(resultFile, xml)

      // resultBuilder.writeResult2File(json, dirPath)
    } else {
      console.log('this field exists')
    }
  }

  createXmlTagNode(json, tagFilePath) {
    // let appTagNode = resultBuilder.getTag(json, 'Application', 'name', applicationName)
    let appTagNode = resultBuilder.getTag(json, 'Application')
    if (appTagNode === null) return
    if (typeof appTagNode['XML'] === 'undefined') {
      appTagNode['XML'] = []
      let prop = {
        '$': {
          'Name': applicationName,
          'File': tagFilePath
        },
        '_': ''
      }
      appTagNode['XML'].push(prop)
    }

  }

  writeResult2File(json, dirPath) {
    let builder = new xml2js.Builder()
    let xml = builder.buildObject(json)
    fs.writeFileSync(resultBuilder.createResultFile(dirPath), xml)
  }
}
export let resultBuilder = new ResultBuilder()
