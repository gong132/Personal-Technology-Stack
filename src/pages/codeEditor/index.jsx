import React, { Fragment } from 'react'
import { connect } from 'dva'
import {
  Radio,
  Select,
  Card,
  Button,
  Input,
  Typography,
  Divider,
  Collapse,
} from 'antd'
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
const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse
const mapStateToProps = ({ codeEditor }) => ({
  customeTheme: codeEditor.customeTheme,
  customeMode: codeEditor.customeMode,
  customeLang: codeEditor.customeLang,
  reactAceContent: codeEditor.reactAceContent,
})

@connect(mapStateToProps)

class CodeEditor extends React.Component {
  constructor(props) {
    super(props)
    this.onChangeMode = this.onChangeMode.bind(this)
    this.handleOnChangeContent = this.handleOnChangeContent.bind(this)
    this.getCode = this.getCode.bind(this)
    this.state = {
      getCodeFromAce: ''
    }
  }

  componentDidMount() {
    const test = window.location.href;
    console.log(test)
  }

  onChangeMode(e) {
    this.props.dispatch({
      type: "codeEditor/setState",
      payload: { customeMode: e.target.value }
    })
  }

  changeCustomTheme(val) {
    this.props.dispatch({
      type: "codeEditor/setState",
      payload: { customeTheme: val }
    })
  }

  handleOnChangeContent(val) {
    this.props.dispatch({
      type: "codeEditor/setState",
      payload: { reactAceContent: val }
    })
  }

  getCode() {
    this.setState({
      getCodeFromAce: this.props.reactAceContent
    })
  }

  render() {
    const {
      customeTheme,
      customeMode,
      reactAceContent,
    } = this.props

    const { getCodeFromAce } = this.state
    return (
      <Fragment>
        <Card>
          <Collapse>
            <Panel header='当前页面基本信息介绍' >
              <Typography>
                <Title> 所用插件 </Title>
                <Paragraph>
                  <Text type="warning">
                    react-ace
                  </Text>
                </Paragraph>
                <Title> 所用antd组件 </Title>
                <Paragraph>
                  <Text type="warning">
                  Typography
                  </Text>
                  <br />
                  <Text type="danger">Input</Text>
                  <br />
                  <Text disabled>Radio</Text>
                  <br />
                  <Text mark>Button</Text>
                  <br />
                  <Text code>Select</Text>
                  <br />
                  <Text underline>Collapse</Text>
                  <br />
                  <Text delete>Divider</Text>
                  <br />
                  <Text strong>Card</Text>
                </Paragraph>
              </Typography>
            </Panel>
          </Collapse>
        </Card>
        <Divider></Divider>
        <Card>
          <div style={{ marginBottom: '18px' }}>
            <Button type='primary' onClick={this.getCode} >获取代码</Button>
          </div>
          <div style={{ marginBottom: '18px' }}>
            <Input.TextArea
              value={getCodeFromAce}
            >
            </Input.TextArea>
          </div>
          <div style={{ marginBottom: '18px' }}>
            <Radio.Group onChange={this.onChangeMode} value={customeMode}>
              <Radio checked={false} value='javascript'>javascript</Radio>
              <Radio checked={false} value='python'>python</Radio>
            </Radio.Group>
            <Select defaultValue='monokai'
              onChange={value => this.changeCustomTheme(value)}
            >
              <Option value="monokai">monokai</Option>
              <Option value="github">github</Option>
              <Option value="terminal">terminal</Option>
            </Select>
          </div>

          <AceEditor
            mode={customeMode}
            readOnly={false}
            theme={customeTheme}
            name="app_code_editor"
            onChange={this.handleOnChangeContent}
            fontSize='16px'
            showPrintMargin
            showGutter
            highlightActiveLine  // 突出活动线
            enableSnippets  // 启用代码段
            value={reactAceContent}
            style={{ width: '100%', minHeight: 400 }}
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
        </Card>

      </Fragment>
    )
  }
}

export default CodeEditor