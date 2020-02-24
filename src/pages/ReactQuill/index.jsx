import React, { Fragment } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { Card, Modal } from 'antd'

import { ImageDrop } from 'quill-image-drop-module';

Quill.register('modules/imageDrop', ImageDrop);

class Reactquill extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      text: '',
      currentSrc: '',
      showUploadBox: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleEnlargeImg = this.handleEnlargeImg.bind(this)
  }

  componentDidMount() {
    function a (arr) {
      arr[0]=arr[2]
      console.log('arr:',arr)
    }
    function b (c,d,e=3) {
      console.log(c,d,e)
      e=10
      console.log(e)
      a(arguments)
      return c+d+e
    }
    const res = b(1,1,1)

    console.log('res:',res)
  }

  componentDidUpdate() {
    const dom = document.getElementById('customEditor').getElementsByTagName('img')
    console.log(dom)
    if (dom.length > 0) {
      Array.from(dom).map((d, index) => {
        d.style.width = "20%"
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


  handleChange(content, delta, source, editor) {
    this.setState({ text: content })
    console.log(content, delta, source, editor)
  }

  modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],        // toggled buttons
        ['blockquote', 'code-block'],
        // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }, { 'align': [] }],
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['link', 'image', 'video'],
        ['clean'],
      ],
      // handlers: {
      //   'image': this.showUploadBox.bind(this)
      // },
    },
    imageDrop: true,
  };

  // formats = [
  //   'header',
  //   'bold', 'italic', 'underline', 'strike', 'blockquote',
  //   'list', 'bullet', 'indent',
  //   'link', 'image'
  // ]

  showUploadBox(file) {
    this.setState({
      showUploadBox: true,
    })
  }

  render() {
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
        <Card
          title="react-quill"
          style={{ height: "500px" }}
        >
          <ReactQuill
            id="customEditor"
            theme="snow"  // 编辑器主题
            style={{ height: "300px" }}
            value={this.state.text}
            onChange={this.handleChange}
            modules={this.modules}
          // formats={this.formats}
          />
        </Card>
      </Fragment>
    )
  }

}

export default Reactquill
