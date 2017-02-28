let fs = require('fs')
let path = require('path')

export function createRootNode(file = '') {
  let dest = path.join(file, path.basename(file) + '.xml')
  console.log(dest)

  if (fs.existsSync(dest)) return

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
  fs.writeFileSync(dest, root.toString())
  console.log(root.toString())
}

// createRootNode()
// console.log(root);
