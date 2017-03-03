
function test() {
  let xml2js = require('xml2js')
  let obj = { name: "Super", Surname: "Man", age: 23 }
  let builder = new xml2js.Builder()
  let xml = builder.buildObject(obj)

  let xmlstr =
    `<Parser version="1.0" Name="" Namespace="" Device="" icon="">
  <Application AppearsInGroups= "Messengers" Caption= "" name= "">
    <XML Name="Leanplum" File="%container%\\shared_prefs\\__leanplum__.xml">
      <Field Name="User Id" InlineJSON="userId">/map/__leanplum_unsynced_0</Field>
      <Field Name="Device Id" InlineJSON="deviceId">/map/__leanplum_unsynced_0</Field>
      <Field Name="Leanplum Token">/map/__leanplum_token</Field>
      <Field Name="Unsync Token" InlineJSON="token">/map/__leanplum_unsynced_0</Field>
      <Field Name="Install Time Initialized" ValueType="boolean" Values="true;Yes;No">/map/installTimeInitialized</Field>
      <Field Name="Sdk Version" InlineJSON="sdkVersion">/map/__leanplum_unsynced_0</Field>
      <Field Name="Action" InlineJSON="action">/map/__leanplum_unsynced_0</Field>
      <Field Name="Time" InlineJSON="time">/map/__leanplum_unsynced_0</Field>
    </XML>
    <SQLQuery Name="Session" File="%container%\\databases\\appboy.db" Query="select session_id,start_time,end_time from ab_sessions">
        <Field Name="Session Id">session_id</Field>
        <Field Name="Start Time" ValueType="UnixTime">start_time</Field>
        <Field Name="End Time" ValueType="UnixTime">end_time</Field>
    </SQLQuery>
    <XML Name="Web View Chromium Preferences" File="%container%\\shared_prefs\\WebViewChromiumPrefs.xml">
      <Field Name="Last Version Code Used">/map/lastVersionCodeUsed</Field>
    </XML>
  </Application>
</Parser >`
}

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
