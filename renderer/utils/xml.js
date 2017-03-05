'use strict'
import fs from 'fs'
import xml2js from 'xml2js'
// import path from 'path'

function getProps(obj = {}) {
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

let xmlModule = {
  getXmlEntries: function (obj = {}) {
    // obj['map']['string'][i]['$']
    let entries = []
    for (let varType in obj['map']) {
      if (Array.isArray)
        console.log(obj['map'][varType].length)

      for (let arr in obj['map'][varType]) {
        let prop = getProps(obj['map'][varType][arr])
        entries.push(prop)
      }
    }
    return entries
  }
}

export default xmlModule

class XmlManger {
  constructor() {

  }

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

}
export let xmlManager = new XmlManger()

