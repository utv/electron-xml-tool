
import path from 'path'
import { resultBuilder } from '../renderer/utils/result'
import { FileContentTable } from '../renderer/components/file-content'
import { xmlManager } from '../renderer/utils/xml'

export function runTest() {
  let resultFile = path.resolve(__dirname, 'mock.xml')
  resultBuilder.loadResult2Json(resultFile, (json) => {
    let fileType = 'XML'
    let filePath = path.resolve(__dirname, 'accountSecurityStorage.xml')
    let tagFilePath = resultBuilder.createTagFilePath(__dirname, filePath)
    console.log(`resultFile = ${resultFile}`)
    console.log(`filePath = ${filePath}`)
    console.log(`tagFilePath = ${tagFilePath}`)

    resultBuilder.addField(json, resultFile, fileType, tagFilePath, 'test', '/map/test')

    let appTag = resultBuilder.getTagByAttr(json, fileType, 'File', tagFilePath)
    let fields = resultBuilder.getValue(appTag, 'Field')

    let fieldNames = []
    if (typeof fields !== 'undefined' && fields.length > 0) {
      for (let field in fields) {
        fieldNames.push(resultBuilder.getValue(fields[field], '_'))
      }
    }
    console.log(fieldNames)

  })
}

export function testUI() {
  let resultFile = path.resolve(__dirname, 'mock.xml')
  let fileType = 'XML'
  let filePath = path.resolve(__dirname, 'accountSecurityStorage.xml')
  // let filePath = path.resolve(__dirname, 'mock.xml')
  let tagFilePath = resultBuilder.createTagFilePath(__dirname, filePath)

  let content = new FileContentTable()
  resultBuilder.loadResult2Json(resultFile, (json) => {
    resultBuilder.addField(json, resultFile, fileType, tagFilePath, 'Device Id', 'device_id')
  })
  xmlManager.readXML(filePath, (entries) => {
    content.highlightRows(resultFile, fileType, tagFilePath, entries)
  })
}