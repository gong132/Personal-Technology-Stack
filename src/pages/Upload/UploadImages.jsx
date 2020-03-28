import React, { Component } from 'react'
import {Upload} from 'antd'

class MyUpload extends  Upload {
  // 覆写upload组件
  render () {
    const antdUpload = super.render()
    const {items} = antdUpload.props.children[0].props;
    const newUploaded = items[items.length - 1]
    // antd upload will just append the new uploaded img to the last
    // so just put it back to the top
    // new uploaded img do not have dateCreated property
    if (newUploaded && !newUploaded.dateCreated) {
      newUploaded.dateCreated = 1;
      items.unshift(newUploaded)
      items.pop()
    }

    return (
      <span>
        {antdUpload.props.children[1]}
        {antdUpload.props.children[0]}
      </span>
    )
  }
}