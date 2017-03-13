'use strict'
import fs from 'fs'
import path from 'path'
import xml2js from 'xml2js'
import { resultBuilder } from './result'

// get obj out of an xml field, key 'rename' means name to be set by dev
function getProps(obj = {}) {
  /*
  let prop = {
    'rename': 'name to be set by dev',
    'name': 'key name',
    'value': 'value'
  }
  */
  let prop = {}
  if (obj['$'] !== undefined && obj['_'] !== undefined) {
    prop['rename'] = obj['$']['name']
    prop['name'] = obj['$']['name']
    prop['value'] = obj['_']
  } else if (obj['$'] !== undefined && obj['$']['value'] !== undefined) {
    prop['rename'] = obj['$']['name']
    prop['name'] = obj['$']['name']
    prop['value'] = obj['$']['value']
  }

  return prop
}

// create XML tag, read xml data from android xml files.
class XmlManger {
  constructor() {

  }

  // get obj out of android xml file
  getXmlEntries(obj = {}) {
    // obj['map']['string'][i]['$']
    let entries = []
    for (let varType in obj['map']) {
      // if (Array.isArray)
      // console.log(obj['map'][varType].length)

      for (let arr in obj['map'][varType]) {
        let prop = getProps(obj['map'][varType][arr])
        entries.push(prop)
      }
    }
    return entries
  }

  // if it's xml, do callback
  isXML(filePath, callback) {
    if (filePath === '' || callback === undefined) return

    var parser = new xml2js.Parser()
    fs.readFile(filePath, (err, data) => {
      parser.parseString(data, function (err, result) {
        if (err) return
        else callback()
      })
    })
  }

  // read xml to obj, send obj to callback
  readXML(file, callback) {
    fs.readFile(file, (err, data) => {
      xml2js.parseString(data, (err, result) => {
        if (err) return
        // console.log(result)
        let entries = xmlManager.getXmlEntries(result)
        callback(entries)
      })
    })
  }

  removeFromXmlTag(json, row) {
    let dirPath = row.dirPath
    let filePath = row.filePath
    let tagFilePath = resultBuilder.createTagFilePath(dirPath, filePath)
    let fieldRename = row.children[0].innerHTML
    let fieldName = row.children[1].innerHTML
    let tagNode = resultBuilder.getTag(json, 'XML', 'File', tagFilePath)
    let xmlNode = resultBuilder.getTag(json, 'XML', 'File', tagFilePath)
    let target = resultBuilder.getTag(xmlNode, 'Field', '_', fieldName)
    console.log(target)
  }

  // param: row = 'tr' element containing info about a field
  add2XmlTag(json, row) {
    let dirPath = row.dirPath
    let filePath = row.filePath
    let tagFilePath = resultBuilder.createTagFilePath(dirPath, filePath)
    let fieldRename = row.children[0].innerHTML
    let fieldName = row.children[1].innerHTML
    let tagNode = resultBuilder.getTag(json, 'XML', 'File', tagFilePath)
    if (tagNode === null) {
      let appTagName = path.basename(dirPath)
      this.createXmlTagNode(json, appTagName, tagFilePath)
    }
    this.addField(json, tagFilePath, fieldRename, fieldName)
    console.log(json)
    resultBuilder.writeResult2File(json, dirPath)
  }

  addField(json, tagFilePath, fieldRename, fieldName) {
    let xmlTag = resultBuilder.getTag(json, 'XML', 'File', tagFilePath)
    if (xmlTag === null) return
    if (typeof xmlTag['Field'] === 'undefined') {
      xmlTag['Field'] = []
    }

    let prop = {
      '$': {
        'Name': fieldRename
      },
      '_': fieldName
    }

    xmlTag['Field'].push(prop)
    console.log(xmlTag)

  }

  createXmlTagNode(json, appTagName, tagFilePath) {
    let appTagNode = resultBuilder.getTag(json, 'Application', 'name', appTagName)
    if (appTagNode === null) return
    if (typeof appTagNode['XML'] === 'undefined') {
      appTagNode['XML'] = []
      let prop = {
        '$': {
          'Name': appTagName,
          'File': tagFilePath
        },
        '_': ''
      }
      appTagNode['XML'].push(prop)
    }

  }

}
export let xmlManager = new XmlManger()
