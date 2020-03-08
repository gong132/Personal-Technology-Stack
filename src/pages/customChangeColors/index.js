import { Input, Form, Select, Popover } from 'antd'
import React, { Component } from 'react'
import { createSquare, returnColors } from './Colors'
import ColorsPick from './coloraPick'
// eslint-disable-next-line react/prefer-stateless-function
class ColorsChange extends Component {
  constructor(props) {
    super(props)
  }

  getColors = e => {
    console.log(e.target.style.backgroundColor)
    const color = e.target.style.backgroundColor

  }

  colorsContent(params) {
    return(
      <div style={{ display:'flex', width:'200px', justifyContent:'space-around', flexWrap:'wrap'}}
        onClick= {e => this.getColors(e)}
      >
        {createSquare('red')}
        {createSquare('blue')}
        {createSquare('yellow')}
        {createSquare('black')}
        {createSquare('pink')}
        {createSquare('purple')}
        {createSquare('red')}
        {createSquare('blue')}
        {createSquare('yellow')}
        {createSquare('black')}
        {createSquare('pink')}
        {createSquare('purple')}
      </div>
    )
  }

  render() {
    console.log(returnColors)
    return (
      <div>
        <Form>
          <Form.Item label='姓名' labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
            <span key='1'>
              <Input placeholder='请输入姓名' />
              <Popover visible content={this.colorsContent()} trigger='click'>
                <span title='点击'>选择颜色</span>
              </Popover>
            </span>
          </Form.Item>
        </Form>
        <ColorsPick />
      </div>
    );
  }
}

export default Form.create()(ColorsChange)