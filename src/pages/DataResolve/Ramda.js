import React from 'react'
import { Card, Collapse, Row, Col, Modal, Button, Divider } from 'antd'
import * as R from 'ramda'
import _ from 'lodash'

const { Panel } = Collapse;

class Ramda extends React.Component {

  state = {
    bool: false,
  }

  componentDidMount() {
    console.log("R:", R)
    const a = {};
    a.v = a;
    const b = {};
    b.v = b;
    console.log('a:', a, 'b:', b)
    const res = R.equals(a)(b)
  }

  callback(key) {
    console.log(key);
  }

  // 比较运算判断
  compare(val) {
    this.setState({
      bool: true,
      content: val,
    })
  }

  // 数学运算判断
  mathCompare(val, k) {
    console.log(val, k)
    this.setState({
      [`num_${k}`]: val,
      [`mathContent_${k}`]: val,
    })
  }

  render() {
    const { bool, content } = this.state
    console.log(_.keys(this.state))
    const checkArr = _.keys(this.state)
    return (
      <div>
        <Modal
          visible={bool}
          footer={null}
          title="结果"
          onCancel={() => this.setState({ bool: false })}
        >
          <h1>{`${content}`}</h1>
        </Modal>
        <Card
          title={<span>Ramda<a href="http://www.ruanyifeng.com/blog/2017/03/ramda.html">参考廖雪峰博客</a></span>}
        >
          <Collapse defaultActiveKey={['1']} onChange={this.callback}>
            <Panel header="比较运算" key="1">
              <Row gutter={[16]}>
                <Col span={6}>
                  <Card
                    title={<span title='gt：判断第一个参数是否大于第二个参数'>gt：判断第一个参数是否大于第二个参数</span>}
                  >
                    <p><span>R.gt(2)(1)</span> <Divider type='vertical'></Divider><Button ghost type='primary' onClick={() => this.compare(R.gt(2)(1))} >查看结果</Button></p>
                    <p><span>R.gt('a')('z')</span> <Divider type='vertical'></Divider><Button ghost type='primary' onClick={() => this.compare(R.gt('a')('z'))} >查看结果</Button></p>
                    <p><span>R.gt(1)(1)</span> <Divider type='vertical'></Divider><Button ghost type='primary' onClick={() => this.compare(R.gt(1)(1))} >查看结果</Button></p>
                  </Card>
                </Col>
                <Col span={6}>
                  <Card
                    title={<span title='gte：判断第一个参数是否大于等于第二个参数'>gte：判断第一个参数是否大于等于第二个参数</span>}
                  >
                    <p><span>R.gte(2)(2)</span> <Divider type='vertical'></Divider><Button ghost type='primary' onClick={() => this.compare(R.gte(2)(2))} >查看结果</Button></p>
                    <p><span>R.gte('a')('z')</span> <Divider type='vertical'></Divider><Button ghost type='primary' onClick={() => this.compare(R.gt('a')('z'))} >查看结果</Button></p>
                  </Card>
                </Col>
                <Col span={6}>
                  <Card
                    title={<span title='lt：判断第一个参数是否小于第二个参数'>lt：判断第一个参数是否小于第二个参数</span>}
                  >
                    <p><span>R.lt(2)(1)</span> <Divider type='vertical'></Divider><Button ghost type='primary' onClick={() => this.compare(R.lt(2)(1))} >查看结果</Button></p>
                    <p><span>R.lt('a')('z')</span> <Divider type='vertical'></Divider><Button ghost type='primary' onClick={() => this.compare(R.lt('a')('z'))} >查看结果</Button></p>
                    <p><span>R.lt(1)(1)</span> <Divider type='vertical'></Divider><Button ghost type='primary' onClick={() => this.compare(R.lt(1)(1))} >查看结果</Button></p>
                  </Card>
                </Col>
                <Col span={6}>
                  <Card
                    title={<span title='lte：判断第一个参数是否小于等于第二个参数'>lte：判断第一个参数是否小于等于第二个参数</span>}
                  >
                    <p><span>R.lte(2)(2)</span> <Divider type='vertical'></Divider><Button ghost type='primary' onClick={() => this.compare(R.lte(2)(2))} >查看结果</Button></p>
                    <p><span>R.equals(1)('1')</span> <Divider type='vertical'></Divider><Button ghost type='primary' onClick={() => this.compare(R.lt('a')('z'))} >查看结果</Button></p>
                  </Card>
                </Col>
              </Row>
              <Row gutter={[16]}>

                <Col span={6}>
                  <Card
                    title={<span title='equals：比较两个值是否相等（支持对象的比较）'>equals：比较两个值是否相等（支持对象的比较）</span>}
                  >
                    <p><span>R.equals(1)(1)</span> <Divider type='vertical'></Divider><Button ghost type='primary' onClick={() => this.compare(R.equals(1)(1))} >查看结果</Button></p>
                    <p><span>R.equals(1)('1')</span> <Divider type='vertical'></Divider><Button ghost type='primary' onClick={() => this.compare(R.equals(1)('1'))} >查看结果</Button></p>
                    <p><span>R.equals([1, 2, 3])([1, 2, 3])</span> <Divider type='vertical'></Divider><Button ghost type='primary' onClick={() => this.compare(R.equals([1, 2, 3])([1, 2, 3]))} >查看结果</Button></p>
                  </Card>
                </Col>
              </Row>
            </Panel>
            <Panel header="数学运算" key='2'>
              <p>
                <span>返回两个值的和：R.add(2,3)</span>
                <Divider type="vertical"></Divider>
                {_.findIndex(checkArr, k => k === 'num_1') > -1 ?
                  <h1>{this.state.mathContent_1}</h1>
                  : <Button onClick={() => this.mathCompare(R.add(2, 3), 1)}>查看结果</Button>
                }
              </p>
              <p>
                <span>返回第一个参数减第二个参数的差:R.subtract(10)(8)</span>
                <Divider type="vertical"></Divider>
                {_.includes(checkArr, 'num_2') ?
                  <h1>{this.state.mathContent_2}</h1>
                  : <Button onClick={() => this.mathCompare(R.subtract(10)(8),2)}>查看结果</Button>
                }
              </p>
            </Panel>
          </Collapse>
        </Card>
      </div>
    );
  }
}
export default Ramda