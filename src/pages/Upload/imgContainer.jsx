import React, { Component } from 'react'
import classnames from 'classnames'
import styles from './index.less'

class Container extends Component {

  constructor(props) {
    super(props)
    this.state = {
      // multiImgUrl: props.multiImgUrl
      clickAim: '',
    }
  }

  onSelect(index) {
    const str = index
    this.setState({
      clickAim: index
    })
  }

  render() {
    const { clickAim } = this.state
    const container = i => classnames(styles.container, 
      { [styles.selected]: i === clickAim })
    console.log(clickAim)
    return (
      <div >
        {this.props.multiImgUrl.map((v, index) => (
          <div className={container(index)} onClick={() => this.onSelect(index)}>
            <img alt={index} src={v} />
          </div>
        )
        )}
      </div>
    );
  }

}

export default Container