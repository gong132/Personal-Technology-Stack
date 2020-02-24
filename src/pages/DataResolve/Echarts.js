import { Card, Tabs, Button, Dropdown, Icon, Menu } from 'antd'
import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'

const { TabPane } = Tabs;

// 折线图

// const option = {
//   xAxis: {
//       type: 'category',
//       data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
//   },
//   yAxis: {
//       type: 'value'
//   },
//   series: [{
//       data: [820, 932, 901, 934, 1290, 1330, 1320],
//       type: 'line'
//   }]
// };


const lineOption = {
  title: {
    text: '折线图堆叠'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    show: true,
    feature: {
      saveAsImage: {},
      // dataZoom:{},// 数据区域缩放。目前只支持直角坐标系的缩放。
      dataZoom: {
        yAxisIndex: 'none'
      },
      dataView: { readOnly: false },
      magicType: {
        type: ['line', 'bar'],
      },// 动态类型切换
      restore: {},
    }
  },
  xAxis: {
    type: 'category',
    name: '时间',
    boundaryGap: false,
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  },
  yAxis: {
    type: 'value',
    name: '数量',
    axisLabel: {
      formatter: '{value} 次'
    }
  },
  series: [
    {
      name: '最高气温',
      type: 'line',
      data: [11, 11, 15, 13, 12, 13, 10],
      markPoint: {
          data: [
              {type: 'max', name: '最大值'},
              {type: 'min', name: '最小值'}
          ]
      },
      markLine: {
          data: [
              {type: 'average', name: '平均值'}
          ]
      }
  },
  {
      name: '最低气温',
      type: 'line',
      data: [1, -2, 2, 5, 3, 2, 0],
      markPoint: {
          data: [
              {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
          ]
      },
      markLine: {
          data: [
              {type: 'average', name: '平均值'},
              [{
                  symbol: 'none',
                  x: '90%',
                  yAxis: 'max'
              }, {
                  symbol: 'circle',
                  label: {
                      position: 'start',
                      formatter: '最大值'
                  },
                  type: 'max',
                  name: '最高点'
              }]
          ]
      }
    }
  ]
};

// 饼图
const pieOption = {
  title: {
    text: '某站点用户访问来源',
    subtext: '纯属虚构',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    // right:'20',
    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        { value: 335, name: '直接访问' },
        { value: 310, name: '邮件营销' },
        { value: 234, name: '联盟广告' },
        { value: 135, name: '视频广告' },
        { value: 1548, name: '搜索引擎' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}

// 柱状图
const simpleBarOption = {
  color: ['#3398DB'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
      type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  series: [
    {
      name: '直接访问',
      type: 'bar',
      barWidth: '60%',
      data: [10, 52, 200, 334, 390, 330, 220]
    }
  ]
}

const barCompare = {
  legend: {},
  tooltip: {},
  dataset: {
    source: [
      ['product', '2015', '2016', '2017'],
      ['Matcha Latte', 43.3, 85.8, 93.7],
      ['Milk Tea', 83.1, 73.4, 55.1],
      ['Cheese Cocoa', 86.4, 65.2, 82.5],
      ['Walnut Brownie', 72.4, 53.9, 39.1]
    ]
  },
  xAxis: { type: 'category' },
  yAxis: {},
  // Declare several bar series, each will be mapped
  // to a column of dataset.source by default.
  series: [
    { type: 'bar' },
    { type: 'bar' },
    { type: 'bar' }
  ]
}

// 堆叠柱状图
const pileBar = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
      type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  legend: {
    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎', '百度', '谷歌', '必应', '其他']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '直接访问',
      type: 'bar',
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: '邮件营销',
      type: 'bar',
      stack: '广告',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: '联盟广告',
      type: 'bar',
      stack: '广告',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: '视频广告',
      type: 'bar',
      stack: '广告',
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: '搜索引擎',
      type: 'bar',
      data: [862, 1018, 964, 1026, 1679, 1600, 1570],
      markLine: {
        lineStyle: {
          type: 'dashed'
        },
        data: [
          [{ type: 'min' }, { type: 'max' }]
        ]
      }
    },
    {
      name: '百度',
      type: 'bar',
      barWidth: 5,
      stack: '搜索引擎',
      data: [620, 732, 701, 734, 1090, 1130, 1120]
    },
    {
      name: '谷歌',
      type: 'bar',
      stack: '搜索引擎',
      data: [120, 132, 101, 134, 290, 230, 220]
    },
    {
      name: '必应',
      type: 'bar',
      stack: '搜索引擎',
      data: [60, 72, 71, 74, 190, 130, 110]
    },
    {
      name: '其他',
      type: 'bar',
      stack: '搜索引擎',
      data: [62, 82, 91, 84, 109, 110, 120]
    }
  ]
}

const barMenu = {
  '1': '简单柱状图',
  '2': '对比柱状图',
  '3': '堆叠柱状图',
}


class EchartsExm extends Component {

  state = {
    barSelected: simpleBarOption,
    barTitle: '简单柱状图'
  }

  callback(key) {
    console.log(key);
  }

  handleMenuClick(e) {
    console.log(e)
    this.setState({
      barTitle: barMenu[e.key],
      barSelected: {}
    })
    // switch (e.key) {
    //   case '1':
    //     this.setState({
    //       barSelected: simpleBarOption,
    //     })
    //     break;
    //   case '2':
    //     this.setState({
    //       barSelected: barCompare,
    //     })
    //     break;
    //   case '3':
    //     this.setState({
    //       barSelected: pileBar,
    //     })
    //     break;
    //   default:
    //     break;
    // }
  }

  render() {
    const { barSelected, barTitle } = this.state
    console.log(barSelected)
    const menu = (
      <Menu onClick={e => this.handleMenuClick(e)}>
        <Menu.Item key="1">
          简单柱状图
        </Menu.Item>
        <Menu.Item key="2">
          对比柱状图
        </Menu.Item>
        <Menu.Item key="3">
          堆叠柱状图
        </Menu.Item>
      </Menu>
    );
    return (
      <div>
        <Card
          title={<a href='https://www.echartsjs.com/examples/zh/index.html' target="__blank">Echarts</a>}
        >
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab="折线图" key="1">
              <ReactEcharts option={lineOption} />
            </TabPane>
            <TabPane tab="饼图" key="2">
              <ReactEcharts option={pieOption} />
            </TabPane>
            <TabPane tab="柱状图" key="3">
              <span>
                <Dropdown overlay={menu}>
                  <Button>
                    {barTitle}<Icon type="down" />
                  </Button>
                </Dropdown>
                <ReactEcharts option={barSelected} />
                {/* {barSelected === '1' ?
                  <ReactEcharts option={simpleBarOption} /> : barSelected === '2' ?
                    <ReactEcharts option={barCompare} /> : barSelected==='3'?
                    <ReactEcharts option={pileBar} />:''
                } */}
              </span>
            </TabPane>
          </Tabs>,
          </Card>
      </div>
    );
  }
}
export default EchartsExm