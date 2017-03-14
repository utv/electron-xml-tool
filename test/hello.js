
import path from 'path'
import { resultBuilder } from '../renderer/utils/result'

export function runTest() {
  let dest = path.resolve(__dirname, 'mock.xml')
  resultBuilder.loadResult2Json(dest, (json) => {
    let fileType = 'XML'
    let filePath = path.resolve(__dirname, 'accountSecurityStorage.xml')
    let tagFilePath = resultBuilder.createTagFilePath(__dirname, filePath)
    console.log(`dest = ${dest}`)
    console.log(`filePath = ${filePath}`)
    console.log(`tagFilePath = ${tagFilePath}`)
    // console.log(resultBuilder.isFieldExist(json, 'XML', tagFilePath, 'requestedRestore'))
    // console.log(resultBuilder.isFieldExist(json, 'XML', tagFilePath, 'test'))
    resultBuilder.addField(json, dest, fileType, tagFilePath, 'test', '/map/test')

    // let appTagNode = resultBuilder.getTag(json, 'Application', 'name', path.basename(__dirname))
    // let fields = resultBuilder.getValue(appTagNode, 'Field')
    // if (fields.length > 1) {
    //   for (let field in fields) {
    //     console.log(resultBuilder.getValue(field, '_'))
    //   }
    // } else {
    //   console.log(resultBuilder.getValue(fields, '_'))
    // }


  })
}

