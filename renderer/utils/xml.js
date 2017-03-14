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

}
export let xmlManager = new XmlManger()
