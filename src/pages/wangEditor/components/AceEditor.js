import React, { useState, useEffect, Fragment } from 'react'
import { Radio, Select } from 'antd'
// import brace from 'brace'
import AceEditor from 'react-ace'
// language_tools语言工具，（这个好像是检测语法，有点忘了，想不起来从哪里找到的）
import 'brace/ext/language_tools';
// searchbox过滤框，快捷键ctrl+F
import 'brace/ext/searchbox';
// 一下import的是编辑器支持的语法，我的项目都用到了，所以全部导入
import 'brace/mode/javascript';//
import 'brace/mode/html';//
import 'brace/mode/java';//
import 'brace/mode/python';//
import 'brace/mode/lua';//
import 'brace/mode/xml';//
import 'brace/mode/ruby';//
import 'brace/mode/sass';
import 'brace/mode/markdown';//
import 'brace/mode/mysql';
import 'brace/mode/json';//
import 'brace/mode/css';//
import 'brace/mode/typescript';
// 以下import的是风格，还有好多种，可以根据自己需求导入
// github、tomorrow、kuioir、twilight、xcode、textmeta、terminal、solarized-light、solarized-dark
import 'brace/theme/monokai';
import 'brace/theme/github';
import 'brace/theme/terminal'
//

const { Option } = Select

const customAceEditor = props => {

  const { reactAceContent, dispatch } = props

  const [customMode, changeCustomMode] = useState('javascript')
  const [lang, changeLang] = useState('javascript')
  const [customeTheme, changeCustomTheme] = useState('monokai')

  const onChangeMode = e => {
    changeCustomMode(e.target.value)
    changeLang(e.target.value)
  };

  const handleOnChangeContent = val => {
    console.log(val)
    dispatch({
      type:'wangEditor/setState',
      payload:{reactAceContent:val}
    })
  }
  return (
    <Fragment>
      <Radio.Group onChange={onChangeMode} value={lang}>
        <Radio value='javascript'>javascript</Radio>
        <Radio value='python'>python</Radio>
      </Radio.Group>
      <Select defaultValue='monokai'
        onChange={value => changeCustomTheme(value)}
      >
        <Option value="monokai">monokai</Option>
        <Option value="github">github</Option>
        <Option value="terminal">terminal</Option>
      </Select>
      <AceEditor
        mode={customMode}
        readOnly={false}
        theme={customeTheme}
        name="app_code_editor"
        onChange={handleOnChangeContent}
        fontSize='16px'
        showPrintMargin
        showGutter
        highlightActiveLine  // 突出活动线
        enableSnippets  // 启用代码段
        value={reactAceContent}
        style={{ width: '100%', height:'50vh', minHeight: 600 }}
        commands={[{    // 命令是键绑定数组。
          name: 'saveFile', // 键绑定的名称。
          bindKey: { win: 'Ctrl-S', mac: 'Command-S' }, // 用于命令的组合键。
          exec: () => {
            // if (!this.state.changed) {
            //   message.warning('文件未改动')
            // } else {
            //   // 保存文件操作
            // }
          }   // 重新绑定命令的名称
        }]}
        setOptions={{
          enableBasicAutocompletion: false,   // 启用基本自动完成功能
          enableLiveAutocompletion: true,   // 启用实时自动完成功能 （比如：智能代码提示）
          enableSnippets: false,  // 启用代码段
          showLineNumbers: true,
          tabSize: 4
        }}
      />
    </Fragment>
  )

}

export default customAceEditor