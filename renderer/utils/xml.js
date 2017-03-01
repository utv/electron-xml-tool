let xml2js = require('xml2js')

var obj = { name: "Super", Surname: "Man", age: 23 }

var builder = new xml2js.Builder()
var xml = builder.buildObject(obj)
// console.log(xml)

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

function readField(ele) {
  if (ele['XML'] !== undefined) {
    // console.log(ele['XML'])
    // ele['XML'][]
  }

  if (ele['SQLQuery'] !== undefined) {
    console.log(ele['SQLQuery'])
  }

  // console.log(ele['$'])
}

function traverseXML(node) {
  if (Array.isArray(node)) {
    console.log("is array \n")
    for (let each in node) {
      readField(node[each])
    }
  }
}

xml2js.parseString(xmlstr, function (err, result) {
  traverseXML(result['Parser']['Application'])
  // JSON.parse(result)
  // let output = ''
  // for (var property in result) {
  //   // output += property + ': ' + result[property] + '; '
  //   console.log(result[property])
  // }
  // console.log(result['Parser']['Application'][0]['XML'][0]['Field'])
})
