
import React, { Fragment, Component } from 'react'
import { connect } from 'dva'
import _ from 'lodash'
import moment from 'moment'
import { formItemLayout } from '@/utils/utils'
import {
  Card,
  Modal,
  Form,
  Input,
  Button,
  Table,
  Divider,
  DatePicker,
  Collapse,
} from 'antd'

const mapStateToProps = ({ dateResolve, loading }) => ({
  animationList: dateResolve.animationList,
  loadingQueryList: loading.effects['dateResolve/queryList']
})
@connect(mapStateToProps)

class ResolveDate extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      title: '',
      showTimeArea: false,
      showMomentTime: '',
      showMomentRelative: false,
      MomentRelativeTime: '',
      showCalendarTime: false,
      calendarTime: ''
    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'dateResolve/queryList',
    })
  }

  edit(record, title) {
    this.setState({
      title,
      showModal: true,
      record,
    })
  }

  hideModal() {
    this.setState({
      showModal: false
    })
  }

  handleGetFormValue() {
    this.props.form.validateFields((err, value) => {
      if (!err) {
        value.time = moment().format('YYYY-MM-DD HH:MM:SS')
        value.index = this.state.record.index
        console.log(value)
        this.props.dispatch({
          type: 'dateResolve/editList',
          payload: { ...value }
        })
        this.setState({
          showModal: false
        })
      }
    })
  }

  handleGetTime(date, dateString) {
    console.log(date, dateString)
    this.setState({
      showTimeArea: true,
      showMomentTime: date,
    })
  }

  handleGetRelativeTime(date, dateString) {
    console.log(date, dateString)
    dateString = _.split(dateString, "-").join('')
    this.setState({
      showMomentRelative: true,
      MomentRelativeTime: dateString,
    })
  }

  handleGetCalendarTime(date, dateString) {
    console.log(date, dateString)
    dateString = _.split(dateString, "-").join('')
    this.setState({
      showCalendarTime: true,
      calendarTime: dateString,
    })
  }

  render() {
    const {
      animationList,
      loadingQueryList,
      form,
    } = this.props
    const {
      showModal,
      title,
      record,
      showTimeArea,
      showMomentRelative,
      MomentRelativeTime,
      showMomentTime,
      showCalendarTime,
      calendarTime,
    } = this.state
    console.log(MomentRelativeTime)
    const columns = [
      {
        title: '名字',
        dataIndex: 'name',
      },
      {
        title: '上映时间',
        dataIndex: 'time',
      },
      {
        title: '集数',
        dataIndex: 'num',
      },
      {
        title: '追番',
        dataIndex: 'name',
      },
      {
        title: '播放量',
        dataIndex: 'time',
      },
      {
        title: '所属地区',
        dataIndex: 'num',
      },
      {
        title: "操作",
        render: record => (
          <div>
            <Button size='small' icon='edit' type='primary'
              onClick={() => this.edit(record, '编辑')}
            >编辑</Button>
            <Divider type='vertical'></Divider>
            {/* <Button size='small' icon='plus' type='primary'
              onClick={() => this.edit(record, '新增')}
            >新增</Button> */}
          </div>
        )
      }
    ]
    return (
      <Fragment>
        <Modal
          visible={showModal}
          title={title}
          onCancel={() => this.hideModal()}
          onOk={() => this.handleGetFormValue()}
        >
          <Form {...formItemLayout}>
            <Form.Item label='名称'>
              {form.getFieldDecorator('name', { initialValue: record && record.name })(
                <Input></Input>
              )}
            </Form.Item>
            <Form.Item label='时间'>
              {form.getFieldDecorator('time', { initialValue: moment(record && record.time, 'YYYY-MM-DD') })(
                <DatePicker
                  format="YYYY-MM-DD"
                  style={{ width: '100%' }}
                ></DatePicker>
              )}
            </Form.Item>
            <Form.Item label='集数'>
              {form.getFieldDecorator('num', { initialValue: record && record.num })(
                <Input></Input>
              )}
            </Form.Item>
          </Form>
        </Modal>
        <Card>
          <div style={{ marginBottom: '18px' }}>
            <Button icon='plus' type='primary'

            >新增</Button>
          </div>
          <div style={{height:'400px'}}>
            <Table
              columns={columns}
              dataSource={animationList}
              loading={loadingQueryList}
            />
          </div>

        </Card>
        <Collapse>
          <Collapse.Panel header='日期格式化'>
            <DatePicker
              onChange={(date, dateString) => this.handleGetTime(date, dateString)}
            ></DatePicker>
            {showTimeArea ? <div>
              <p>
                <span style={{ fontWeight: 'bold' }}>格式化方式：moment().format('MMMM Do YYYY, h:mm:ss a')</span>
                <br /><span style={{ fontWeight: 'bold' }}>结果：</span>
                {moment(showMomentTime).format('MMMM Do YYYY, h:mm:ss a')}
              </p>
              <p>
                <span style={{ fontWeight: 'bold' }}>格式化方式：moment().format('dddd')</span>
                <br /><span style={{ fontWeight: 'bold' }}>结果：</span>
                {moment(showMomentTime).format('dddd')}
              </p>
              <p>
                <span style={{ fontWeight: 'bold' }}>格式化方式：moment().format('MMM Do YY')</span>
                <br /><span style={{ fontWeight: 'bold' }}>结果：</span>
                {moment(showMomentTime).format('MMM Do YY')}
              </p>
              <p>
                <span style={{ fontWeight: 'bold' }}>格式化方式：moment().format()</span>
                <br /><span style={{ fontWeight: 'bold' }}>结果：</span>
                {moment(showMomentTime).format()}
              </p>
              <p>
                <span style={{ fontWeight: 'bold' }}>格式化方式：moment().format('YYYY-MM-DD')</span>
                <br /><span style={{ fontWeight: 'bold' }}>结果：</span>
                {moment(showMomentTime).format('YYYY-MM-DD')}
              </p>
              <p>
                <span style={{ fontWeight: 'bold' }}>格式化方式：moment().format('L')</span>
                <br /><span style={{ fontWeight: 'bold' }}>结果：</span>
                {moment(showMomentTime).format('L')}
              </p>
            </div> : null}
          </Collapse.Panel>
          <Collapse.Panel
            header="相对时间"
          >
            <DatePicker
              format="YYYY-MM-DD HH:MM:SS"
              onChange={(date, dateString) => this.handleGetRelativeTime(date, dateString)}
            />
            {showMomentRelative ? <div>
              <p>
                <span style={{ fontWeight: 'bold' }}>{`处理方式：moment(${MomentRelativeTime},'YYYYMMDD').fromNow()`}</span>
                <br /><span style={{ fontWeight: 'bold' }}>结果：</span>
                {moment(MomentRelativeTime, 'YYYYMMDD').fromNow()}
              </p>
              <p>
                <span style={{ fontWeight: 'bold' }}>处理方式：moment().startOf(day).fromNow()</span>
                <br /><span style={{ fontWeight: 'bold' }}>结果：</span>
                {moment().startOf('day').fromNow()}
              </p>
              <p>
                <span style={{ fontWeight: 'bold' }}>处理方式：moment().endOf(day).fromNow()</span>
                <br /><span style={{ fontWeight: 'bold' }}>结果：</span>
                {moment().endOf('day').fromNow()}
              </p>
              <p>
                <span style={{ fontWeight: 'bold' }}>处理方式：moment().startOf(hour).fromNow()</span>
                <br /><span style={{ fontWeight: 'bold' }}>结果：</span>
                {moment().startOf('hour').fromNow()}
              </p>
            </div> : null}
          </Collapse.Panel>
          <Collapse.Panel
            header="日历时间"
          >
            <DatePicker
              format="YYYY-MM-DD HH:MM:SS"
              onChange={(date, dateString) => this.handleGetCalendarTime(date, dateString)}
            />
            {showCalendarTime ? <div>
              <p>
                <span style={{ fontWeight: 'bold' }}>处理方式：moment().subtract(10,days).calendar()</span>
                <br /><span style={{ fontWeight: 'bold' }}>结果：</span>
                {moment().subtract(10, 'days').calendar()}
              </p>
              <p>
                <span style={{ fontWeight: 'bold' }}>处理方式：moment().subtract(7,days).calendar()</span>
                <br /><span style={{ fontWeight: 'bold' }}>结果：</span>
                {moment().subtract(7, 'days').calendar()}
              </p>
              <p>
                <span style={{ fontWeight: 'bold' }}>处理方式：moment().subtract(6,days).calendar()</span>
                <br /><span style={{ fontWeight: 'bold' }}>结果：</span>
                {moment().subtract(6, 'days').calendar()}
              </p>
              <p>
                <span style={{ fontWeight: 'bold' }}>处理方式：moment().subtract(3,days).calendar()</span>
                <br /><span style={{ fontWeight: 'bold' }}>结果：</span>
                {moment().subtract(3, 'days').calendar()}
              </p>
              <p>
                <span style={{ fontWeight: 'bold' }}>处理方式：moment().subtract(1,days).calendar()</span>
                <br /><span style={{ fontWeight: 'bold' }}>结果：</span>
                {moment().subtract(1, 'days').calendar()}
              </p>
              <p>
                <span style={{ fontWeight: 'bold' }}>处理方式：moment().calendar()</span>
                <br /><span style={{ fontWeight: 'bold' }}>结果：</span>
                {moment().calendar()}
              </p>
              <p>
                <span style={{ fontWeight: 'bold' }}>处理方式：moment().add(10,days).calendar()</span>
                <br /><span style={{ fontWeight: 'bold' }}>结果：</span>
                {moment().add(10, 'days').calendar()}
              </p>
              <p>
                <span style={{ fontWeight: 'bold' }}>处理方式：moment().add(7,days).calendar()</span>
                <br /><span style={{ fontWeight: 'bold' }}>结果：</span>
                {moment().add(7, 'days').calendar()}
              </p>
              <p>
                <span style={{ fontWeight: 'bold' }}>处理方式：moment().add(6,days).calendar()</span>
                <br /><span style={{ fontWeight: 'bold' }}>结果：</span>
                {moment().add(6, 'days').calendar()}
              </p>
              <p>
                <span style={{ fontWeight: 'bold' }}>处理方式：moment().add(3,days).calendar()</span>
                <br /><span style={{ fontWeight: 'bold' }}>结果：</span>
                {moment().add(3, 'days').calendar()}
              </p>
              <p>
                <span style={{ fontWeight: 'bold' }}>处理方式：moment().add(1,days).calendar()</span>
                <br /><span style={{ fontWeight: 'bold' }}>结果：</span>
                {moment().add(1, 'days').calendar()}
              </p>
            </div> : null}
          </Collapse.Panel>
        </Collapse>
      </Fragment>
    );
  }
}
export default Form.create()(ResolveDate)