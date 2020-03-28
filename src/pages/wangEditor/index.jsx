import Editor from 'wangeditor'
import React, { Fragment, PureComponent } from 'react'
import { connect } from 'dva'
import {
  Button,
  Card,
  Input,
  Col,
  Row,
  Modal,
} from 'antd';
// import CustomAceEditor from './components/AceEditor'
import { myDebounce } from '@/utils/utils'
import { debounce } from 'lodash'
import axios from 'axios'
import styles from './index.less'

const mapStateToProps = ({ wangEditor }) => ({
  reactAceContent: wangEditor.reactAceContent
})
@connect(mapStateToProps)

class WangEditor extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      editor: '',
      iframeContent: '',
      currentSrc: '',
      imgsArr: [],
    }
    this.handleEnlargeImg = this.handleEnlargeImg.bind(this)
  }

  componentDidMount() {
    const editor = document.getElementById('editor')
    const e = new Editor(editor)
    // 自定义菜单配置/默认配置e
    e.customConfig.menus = [
      'head',  // 标题
      'bold',  // 粗体
      'fontSize',  // 字号
      'fontName',  // 字体
      'italic',  // 斜体
      'underline',  // 下划线
      'strikeThrough',  // 删除线
      'foreColor',  // 文字颜色
      'backColor',  // 背景颜色
      'link',  // 插入链接
      'list',  // 列表
      'justify',  // 对齐方式
      'quote',  // 引用
      'emoticon',  // 表情
      'image',  // 插入图片
      'table',  // 表格
      'video',  // 插入视频
      'code',  // 插入代码
      'undo',  // 撤销
      'redo',  // 重复
      'hr', // 分割线
    ]

    // 配置多语言
    e.customConfig.lang = {
      '设置标题': 'title',
      '正文': 'p',
      '链接文字': 'link text',
      '链接': 'link',
      '上传图片': 'upload image',
      '上传': 'upload',
      '创建': 'init'
      // 还可自定添加更多
    }

    // 自定义字体
    e.customConfig.fontNames = [
      '宋体',
      '微软雅黑',
      'Arial',
      'Tahoma',
      'Verdana'
    ]

    // 通过 url 参数配置 debug 模式。url 中带有 wangeditor_debug_mode=1 才会开启 debug 模式
    e.customConfig.debug = window.location.href.indexOf('wangeditor_debug_mode=1') > 0

    e.customConfig.onchange = function (html) {
      // html 即变化之后的内容
      // console.log(html)
    }

    // 自定义 onchange 触发的延迟时间，默认为 200 ms
    e.customConfig.onchangeTimeout = 1000 // 单位 ms

    // 关闭粘贴样式的过滤
    e.customConfig.pasteFilterStyle = false
    // 忽略粘贴内容中的图片
    e.customConfig.pasteIgnoreImg = false
    // 自定义处理粘贴的文本内容
    e.customConfig.pasteTextHandle = function (content) {
      // content 即粘贴过来的内容（html 或 纯文本），可进行自定义处理然后返回
      return `${content}<br />`
    }

    e.customConfig.linkImgCallback = function (url) {
      // console.log(url) // url 即插入图片的地址
    }

    e.customConfig.linkCheck = function (text, link) {
      console.log(text) // 插入的文字
      console.log(link) // 插入的链接
      return true // 返回 true 表示校验成功
      // return '验证失败' // 返回字符串，即校验失败的提示信息
    }

    // 将图片大小限制为 3M
    e.customConfig.uploadImgMaxSize = 3 * 1024 * 1024

    // 限制一次最多上传 5 张图片
    e.customConfig.uploadImgMaxLength = 5

    // 可使用监听函数在上传图片的不同阶段做相应处理

    e.customConfig.uploadImgHooks = {
      before(xhr, editor, files) {
        // 图片上传之前触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件

        // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
        // return {
        //     prevent: true,
        //     msg: '放弃上传'
        // }
      },
      success(xhr, editor, result) {
        // 图片上传并返回结果，图片插入成功之后触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
      },
      fail(xhr, editor, result) {
        // 图片上传并返回结果，但图片插入错误时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
      },
      error(xhr, editor) {
        // 图片上传出错时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
      },
      timeout(xhr, editor) {
        // 图片上传超时时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
      },

      // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
      // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
      customInsert(insertImg, result, editor) {
        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
        // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

        // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
        const { url } = result
        insertImg(url)

        // result 必须是一个 JSON 格式字符串！！！否则报错
      }
    }


    // 下面两个配置，使用其中一个即可显示“上传图片”的tab。但是两者不要同时使用！！！
    e.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
    // editor.customConfig.uploadImgServer = '/upload'  // 上传图片到服务器

    // 隐藏“网络图片”tab
    e.customConfig.showLinkImg = false

    this.setState({
      editor: e,
    })
    e.create()
    // 初始化编辑器的内容
    e.txt.html('<p>要初始化的内容</p>');
  }

  componentDidUpdate() {
    const dom = document.getElementById('editor').getElementsByTagName('img')
    console.log(dom)
    if (dom.length > 0) {
      Array.from(dom).map((d, index) => {
        d.style.width = "200px"
        d.setAttribute('id', `img_${index}`)
        d.addEventListener('click', this.handleEnlargeImg, false)
      })
    }
  }

  handleEnlargeImg(e) {
    const modalDom = document.getElementsByClassName('ant-modal-body')

    // modalDom.style.background="transparent"
    console.log(e)
    e.target.style.width = "100%"
    this.setState({
      currentSrc: e.target.src,
      showUploadBox: true,
    }, () => setTimeout(() => {
      console.log(modalDom)
    }, 0))
  }



  handleSubmit() {
    const { editor } = this.state
    const html = editor.txt.html()
    const pureTxt = editor.txt.text()
    // const formatTxt = editor.txt.formatText()
    console.log('editor:', editor)
    console.log('编辑器区域完整html代码:', html)
    this.setState({
      iframeContent: html
    })
    console.log('获取编辑器纯文本内容:', pureTxt)
    // console.log('格式化后的纯文本内容',formatTxt)
  }

  handleAppend() {
    const { editor } = this.state
    editor.txt.append('<p>新追加的内容</p>')
  }

  handleClear() {
    const { editor } = this.state
    editor.txt.html('<p><br></p>')
  }

  handleGetJSON() {
    const { editor } = this.state
    const json = editor.txt.getJSON()  // 获取 JSON 格式的内容
    const jsonStr = JSON.stringify(json)
    const jsonParse = JSON.parse(jsonStr)
    console.log(json)
    console.log(jsonStr)
    console.log('jsonParse', jsonParse)
    this.setState({
      iframeContent: json
    })
  }

  handleGetDOM() {
    const { editor } = this.state
    console.log(editor)
    const dom = editor.$textElem[0]
    console.log(dom)
    this.setState({
      iframeContent: dom
    })
  }

  sendRequest = () => {
    console.log('发请求')
    axios.get('http://localhost:3000'
     )
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log('err', err)
      })

    // 添加请求拦截器
    axios.interceptors.request.use(function (config) {
      // 在发送请求之前做些什么
      console.log('请求即将发送')
      console.log('config', config)
      return config;
    }, function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    });

    // 添加响应拦截器
    axios.interceptors.response.use(function (response) {
      // 对响应数据做点什么
      console.log('响应拦截',response)
      return response;
    }, function (error) {
      // 对响应错误做点什么
      return Promise.reject(error);
    });
  }


  render() {
    const { iframeContent } = this.state
    return (
      <Fragment>
        <Modal
          // title="上传图片"
          visible={this.state.showUploadBox}
          width='800px'
          wrapClassName='customModal'
          footer={null}
          closeIcon={false}
          onCancel={() => this.setState({
            showUploadBox: false,
          })}
        >
          <img width="100%" src={this.state.currentSrc} />

        </Modal>
        <Card><a href='https://www.kancloud.cn/wangfupeng/wangeditor3/332599' target='__blank'>wangeditor</a></Card>
        <Card>
          <Row>
            <div style={{ marginBottom: '18px' }}>
              <Button
                type='primary'
                onClick={() => this.handleSubmit()}>获取编辑器中的内容</Button>
              <Button
                style={{ marginLeft: '20px' }}
                type='primary'
                onClick={() => this.handleAppend()}>追加内容</Button>
              <Button
                style={{ marginLeft: '20px' }}
                type='primary'
                onClick={() => this.handleClear()}>清空内容</Button>
              <Button
                style={{ marginLeft: '20px' }}
                type='primary'
                onClick={() => this.handleGetJSON()}>获取JSON</Button>
              <Button
                style={{ marginLeft: '20px' }}
                type='primary'
                onClick={() => this.handleGetDOM()}>获取编辑区域DOM节点</Button>
              <Input onChange={ debounce(this.sendRequest, 1000) } />
            </div>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <div id="editor" />
            </Col>
            <Col span={12}>
              <Input.TextArea
                value={iframeContent}
              >

              </Input.TextArea>
            </Col>
          </Row>


        </Card>
        <Card>
          {/* <CustomAceEditor
            reactAceContent={reactAceContent}
            dispatch={dispatch}
          /> */}
          {/* <iframe
            scrolling="yes" frameBorder="0" marginHeight="0"
            src={`data:text/html;charset:UTF-8,${iframeContent}`}
          ></iframe> */}
        </Card>

      </Fragment>
    )
  }
}
export default WangEditor