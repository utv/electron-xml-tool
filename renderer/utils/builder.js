// let fs = require('fs')

function createRootNode(file = {}) {
  let xmlbuilder = require('xmlbuilder')
  var root = xmlbuilder.create('Parser', { encoding: 'UTF-8' })
  root.att('version', '1.0')
  root.att('Name', '')
  root.att('Namespace', '')
  root.att('Device', '')
  root.att('icon', '')

  let app = root.ele('Application',
    {
      'AppearsInGroups': 'Messengers',
      'Caption': '',
      'name': ''
    })

  root.end({ pretty: true })
  console.log(root.toString())
}

createRootNode()
// console.log(root);
