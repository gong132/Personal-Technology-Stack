/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import { Tabs, Card } from 'antd'
import { AlphaPicker, BlockPicker, ChromePicker, CirclePicker, CompactPicker, GithubPicker, HuePicker, MaterialPicker, PhotoshopPicker, SketchPicker, SliderPicker, SwatchesPicker, TwitterPicker } from 'react-color'

const { TabPane } = Tabs
class ColorsPick extends Component {
  state = {
    currentColor: '',
    currentColor2: '',
    currentColor3: ''
  }

  onChange = obj => {
    console.log(obj)
    this.setState({
      currentColor: obj.hex
    })
  }

  onChange2 = obj => {
    console.log(obj)
    this.setState({
      currentColor2: obj.hex
    })
  }

  onChange3 = obj => {
    console.log(obj)
    this.setState({
      currentColor3: obj.hex
    })
  }

  render() {
    return (
      <Card>
        <Tabs defaultActiveKey='1'>
          <TabPane key='1' tab='SketchPicker'>
            <div>
              <div style={{ border: `1px ${this.state.currentColor} solid`, backgroundColor: this.state.currentColor, width: '20px', height: '20px' }} />
              <SketchPicker onChange={this.onChange} color={this.state.currentColor} />
            </div>
          </TabPane>
          <TabPane key='2' tab='AlphaPicker'>
            <div>
              <div style={{ border: `1px ${this.state.currentColor2} solid`, backgroundColor: this.state.currentColor2, width: '20px', height: '20px' }} />
              <AlphaPicker onChange={this.onChange2} color={this.state.currentColor2} />
            </div>
          </TabPane>
          <TabPane key='3' tab='BlockPicker'>
            <BlockPicker />
          </TabPane>
          <TabPane key='4' tab='ChromePicker'>
            <ChromePicker />
          </TabPane>
          <TabPane key='5' tab='CirclePicker'>
            <div>
              <div style={{ border: `1px ${this.state.currentColor3} solid`, backgroundColor: this.state.currentColor3, width: '20px', height: '20px' }} />
              <CirclePicker onChange={this.onChange3} color={this.state.currentColor3} />
            </div>
          </TabPane>
          <TabPane key='6' tab='CompactPicker'>
            <CompactPicker />
          </TabPane>
          <TabPane key='10' tab='GithubPicker'>
            <GithubPicker />
          </TabPane>
          <TabPane key='7' tab='HuePicker'>
            <HuePicker />
          </TabPane>
          <TabPane key='8' tab='MaterialPicker'>
            <MaterialPicker />
          </TabPane>
          <TabPane key='9' tab='PhotoshopPicker'>
            <PhotoshopPicker />
          </TabPane>
          <TabPane key='11' tab='SliderPicker'>
            <SliderPicker />
          </TabPane>
          <TabPane key='12' tab='SwatchesPicker'>
            <SwatchesPicker />
          </TabPane>
          <TabPane key='13' tab='TwitterPicker'>
            <TwitterPicker />
          </TabPane>
        </Tabs>
      </Card>
    )
  }
}

export default ColorsPick