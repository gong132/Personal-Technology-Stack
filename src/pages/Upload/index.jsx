import React, { Component } from 'react'
import { Modal, Upload, Card, Tabs, Icon, message, Radio } from 'antd'
import styles from './index.less'
import CustomUploadImage from './uploadImage'
import Container from './imgContainer'

const { TabPane } = Tabs
const arr = []

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

class UploadImg extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      fileList: [],
      multiImgUrl: [],
    };
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        arr.push(imageUrl)
        this.setState({
          imageUrl,
          loading: false,
          multiImgUrl: arr,
        })
      }
      );
    }
  };

  handleChangeM = ({ fileList }) => this.setState({ fileList });

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl, fileList, multiImgUrl } = this.state;
    console.log(multiImgUrl)
    return (
      <div>
        <Card>
          <Tabs defaultActiveKey='1'>
            <TabPane key='1' tab='上传单个'>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
              >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
              </Upload>
            </TabPane>
            <TabPane key='2' tab='上传多个'>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
              <Container multiImgUrl={multiImgUrl}  />
            </TabPane>
            <TabPane key='3' tab='单个上传组件'>
              <CustomUploadImage />
            </TabPane>
          </Tabs>
        </Card>
      </div>
    );
  }
}
export default UploadImg