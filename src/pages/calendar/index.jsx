import { Calendar, Card } from 'antd';
import React, { Fragment, Component } from 'react'

class CustomCalendar extends Component {

  onPanelChange(value, mode) {
    console.log(value, mode);
  }

  componentDidMount() {

  }

  render() {
    return (
      <Fragment>
        <Card>
          <div style={{ width: 300, border: '1px solid #d9d9d9', borderRadius: 4 }}>
            <Calendar fullscreen={false} onPanelChange={this.onPanelChange} />
          </div>
        </Card>
      </Fragment>
    )
  }
}
export default CustomCalendar