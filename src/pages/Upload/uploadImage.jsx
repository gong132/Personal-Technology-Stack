import React, { Component } from 'react'
import { Upload, Icon, message, Modal } from 'antd'

class CustomUploadImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileList: [],
      previewVisible:false,
      previewImage:'',
    }
  }

  // 上传图片
  handleImgChange = info => {
    let {fileList} = info
    fileList = fileList.slice(-1)
    this.setState({
      fileList,
    })
    if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }else if (info.file.status === 'done') {
      const res = info.file.response;
      console.log('res:',res)

    }
  }

  // 删除
  handleDelete = () => {

  }

  //
  download = file => {
    console.log(file.thumbUrl)
    const a = document.createElement('a')
    a.src = file.thumbUrl
    a.click()
  }

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }

  handleCancel = () => {
    this.setState ({
      previewVisible:false
    })
  }

  render () {
    const { previewImage, previewVisible, fileList } = this.state
    const uploadBtn = (
      <div>
        <Icon type='plus' />
        <div>Upload</div>
      </div>
    )
    const imgProps = {
      name:'imgFile',
      action:'',
      listType:'picture-card',
      fileList,
      beforeUpload: file => {
        const isPic = file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/bmp';
          if(!isPic) {
            message.error('只能上传图片文件！')
          }
          return isPic
      },
      onChange:this.handleImgChange,
      onRemove:this.handleDelete,
      onPreview:this.handlePreview,
      onDownload:this.download,
    }

    return (
      <div>
        <Upload
         {...imgProps}>
           {fileList.length >=1 ? null : uploadBtn}
         </Upload>
         <Modal
          visible={previewVisible}
          onCancel={this.handleCancel}
          footer={null}
         >
           <img src={previewImage} alt="example" style={{width:'100%'}} />
         </Modal>
      </div>
    )
  }
}

export default CustomUploadImage