'use strict'
import fs from 'fs'
import xml2js from 'xml2js'
import { xmlManager } from './xml'

class FileManager {
  constructor() {

  }

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
export let fileManager = new FileManager()