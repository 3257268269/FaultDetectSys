import ReactDOM from 'react-dom';
import React, { useEffect, useState } from "react";
import { Tree, Layout, Steps, Menu, Button, Tabs, Table, Tag, Space, Row, Col, Statistic, Card } from 'antd';
import { RightOutlined, PlusOutlined, DownloadOutlined } from '@ant-design/icons';
import { CSVReader } from 'react-papaparse'
import ReactEcharts from 'echarts-for-react'

import 'antd/dist/antd.css';
import './style/mainpage.css';
import './style/common.css';

const { Header, Content, Sider, Footer } = Layout;
const buttonRef = React.createRef()
const { Step } = Steps;
const { TabPane } = Tabs;

const { DirectoryTree } = Tree;

const FaultDetectSys = () => {

  /*
    rootData : [
      {
        fileName : "source.csv"
        status : 0 , //当前状态 0.数据加载完成 1.缺失值填充 2.降采样 3.序列分解 4.分类 5.故障检测
        seqLength : 233,
        lossLength : 567,
        data : [
          [ 原始数据 ]
          [ 缺失值填充后的数据 ]
          ...
          [ 检测结果 ]
        ]
      }
    ]
  */
  const [rootData, setRootData] = useState([]);       //所有数据
  const [curDataIndex, setCurDataIndex] = useState(-1);  //当前数据索引

  useEffect(() => {
    setCurDataIndex(rootData.length - 1);
    console.log(curDataIndex != -1 ? rootData[ curDataIndex ].data[0].map(v => parseFloat(v.data[1])) : []);
    console.log(rootData)
  })

  const handleOpenDialog = (e) => {
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }

  const checkFileItem = (selectedKeys, e) => {
    console.log(e.node.key)
  }

  const handleOnFileLoad = (data) => {
    let len = data.length;
    let lossLen = 0;
    for(let i = 0; i < data.length; i++){
      if(data[i].data[1] == '')lossLen++;
    }
    let obj = {
      "fileName" : rootData.length + 1,
      "status" : 0,
      "seqLength" : len,
      "lossLength" : lossLen,
      "data" : [ data ]
    };
    setRootData([...rootData, obj]);
  }

  const handleOnError = (err, file, inputElem, reason) => {
    alert(err);
  }

  const treeData = [ {
    title: "source1.csv",
    key: 1,
  },
  {
    title: "source2.csv",
    key: 2,
  },
  {
    title: "source3.csv",
    key: 3,
  }]

  //图表数据
  const sourceDataOption = {
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
        type: 'category',
        data: [...Array(curDataIndex != -1 ? rootData[ curDataIndex ].data[0].length : 0)].map((v,k)=>k + 1)
    },
    yAxis: {
        type: 'value'
    },
    series: [
      {
        data:  curDataIndex != -1 ? rootData[ curDataIndex ].data[0].map(v => parseFloat(v.data[1])) : [],
        type: 'line',
        lineStyle: {
          //color: 'green',
          width: 2
        },
        symbol: 'none',
      },
    ]
  };

  return (
    <Layout>
    <Header className="header">
      <div className="logo" />
    </Header>
    
    <div className="main-page"> 
        <div className="side-content box-shadow"> 
          <CSVReader
            ref={buttonRef}
            onFileLoad={handleOnFileLoad}
            onError={handleOnError}
            noClick
            noDrag
          >
            {({ file }) => (
                <Button
                  type='button'
                  onClick={handleOpenDialog}
                  type="primary" icon={<PlusOutlined />} style={{width:"100%"}} size={"small"} 
                >
                添加数据
                </Button>
            )}
          </CSVReader>
          <br /><hr />
          <Tree onSelect={ checkFileItem } style={{marginTop:"10px"}} treeData={treeData} defaultExpandAll />
        </div>
        <div className="step-content box-shadow"> 
          <Steps current={ curDataIndex != -1 ? rootData[ curDataIndex ].status : -1 }>
            <Step title="添加待检数据" description="description." />
            <Step title="缺失值填充" description="description." />
            <Step title="降采样" description="description." />
            <Step title="序列分解" description="description." />
            <Step title="分类" description="description." />
            <Step title="故障检测" description="description." />
          </Steps>
        </div>
        <div className="main-content box-shadow"> 
        <Row>
          <Col span={4}>
            <Statistic title="序列长度" value={ curDataIndex != -1 ? rootData[curDataIndex].seqLength : 0 } />
          </Col>
          <Col span={4}>
            <Statistic title="序列缺失" value={ curDataIndex != -1 ? rootData[curDataIndex].lossLength : 0 } />
          </Col>
          <Col span={4}>
            <Statistic title="采样频率" value={"20ms"} />
          </Col>
          <Button type="primary" style={{ width:"180px"}} >下一步：缺失值填充</Button>
        </Row>

        <div className="result-panel">
          <div className="result-panel-inner">
            <Tabs type="card">
              <TabPane tab="原始数据" key="1">
                <div className="chart-container">
                  <ReactEcharts
                    option={ sourceDataOption }
                    style={{height: '300px', width: '100%'}}
                  />
                </div>
              </TabPane>
              <TabPane tab="缺失值填充" key="2">
                <div className="table-container">
                          ghjk
                </div>
              </TabPane>
              <TabPane tab="降采样" key="3">

              </TabPane>
              <TabPane tab="序列分解" key="4">

              </TabPane>
              <TabPane tab="分类" key="5">

              </TabPane>
              <TabPane tab="故障检测" key="6">

              </TabPane>
            </Tabs>
          </div>
        </div>
        </div>
      </div>

    <Footer style={{ textAlign: 'center' }}>Ant Design ©2020 Created by Zhangyapeng </Footer>
  </Layout>
  );
};
export default FaultDetectSys;
ReactDOM.render(<FaultDetectSys />, document.getElementById("root"));





