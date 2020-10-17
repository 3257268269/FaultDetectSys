import ReactDOM from 'react-dom';
import React, { useEffect, useState } from "react";
import { Tree, Layout, Steps, Menu, Button, Tabs, Table, Tag, Space, Row, Col, Statistic, Card } from 'antd';
import { FileOutlined, PlusOutlined } from '@ant-design/icons';
import { CSVReader } from 'react-papaparse'
import ReactEcharts from 'echarts-for-react'

import SourceDataPanel from './components/sourceDataPanel/index.js'
import PaddingPanel from './components/paddingPanel/index.js'
import SamplingPanel from './components/samplingPanel/index.js'
import SeqResolvePanel from './components/seqResolvePanel/index.js'
import ClassifyPanel from './components/classifyPanel/index.js'
import DetectPanel from './components/detectPanel/index.js'

import 'antd/dist/antd.css';
import './style/mainpage.css';
import './style/common.css';

const { Header, Content, Sider, Footer } = Layout;
const buttonRef = React.createRef()
const { Step } = Steps;
const { TabPane } = Tabs;
const { DirectoryTree } = Tree;

const stepsRef = [
  {
    name : "原始数据",
    component : SourceDataPanel
  },
  {
    name : "缺失值填充",
    component : PaddingPanel
  },
  {
    name : "降采样",
    component : SamplingPanel
  },
  {
    name : "序列分解",
    component : SeqResolvePanel
  },
  {
    name : "分类",
    component : ClassifyPanel
  },
  {
    name : "故障检测",
    component : DetectPanel
  },
];

const FaultDetectSys = () => {

  /*
    rootData : [
      {
        fileName : "source.csv"
        status : 0 , //当前状态 0.数据加载完成 1.缺失值填充 2.降采样 3.序列分解 4.分类 5.故障检测
        seqLength : 233,
        lossLength : 567,
        tabActivekey : 1
        stepData : [
          [...],
          [...]
        ]
      }
    ]
  */
  const [rootData, setRootData] = useState([]);                           //所有数据
  const [curDataIndex, setCurDataIndex] = useState(-1);                   //当前数据索引
  const [nextButtonDisabled, setNextButtonDisabled] = useState(false);    //下一步按钮是否禁用

  useEffect(() => {})

  const handleOpenDialog = (e) => {
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }

  const handleOnFileLoad = (data, f) => {//csv文件导入成功
    let len = data.length;
    let lossLen = 0;
    for(let i = 0; i < data.length; i++){
      if(data[i].data[1] == '')lossLen++;
    }
    let obj = {
      "fileName" : f.name,
      "status" : 0,
      "seqLength" : len,
      "lossLength" : lossLen,
      "tabActivekey" : '0',
      "stepData" : [data]
    };
    setRootData([...rootData, obj]);
    setCurDataIndex(rootData.length);
  }

  const handleOnError = (err, file, inputElem, reason) => {
    alert(err);
  }

  const nextStep = () => {
    setNextButtonDisabled(true);//禁用按钮
    let curStatus = rootData[curDataIndex].status;
    let requestData = rootData[curDataIndex].stepData[curStatus];
    let responseData = requestData;//todo 与后端交互
    let temp = [...rootData]
    temp[curDataIndex].status += 1;
    temp[curDataIndex].tabActivekey = temp[curDataIndex].status.toString();
    temp[curDataIndex].stepData.push(responseData);
    setRootData(temp);
    setNextButtonDisabled(false);
  }

  const dataSelect = (o) => {
    setCurDataIndex(o.key);
  }

  const tabClick = (k) => {
    let temp = [...rootData]
    temp[curDataIndex].tabActivekey = k; 
    setRootData(temp);
  }

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
            <div>
            {
                curDataIndex == -1 ? (
                  <div>
                    <h1>No Data</h1>
                  </div>
                ) 
                :
                ( 
                  <Menu
                    selectedKeys={[curDataIndex.toString()]}
                    mode="inline"
                    theme="light"
                    onClick = { dataSelect }
                  >
                    {
                      rootData.map((item, index) => {
                            return (
                              <Menu.Item key={index} icon={<FileOutlined />}>
                                  { item.fileName }
                              </Menu.Item>
                            )
                        }
                      )        
                    }
                  </Menu>
                )
              }
            </div>
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
            <div style={{width:"100%", height:"100%"}}> 
              {
                curDataIndex == -1 ? (
                  <div>
                    <h1>No Data</h1>
                  </div>
                ) : ( <>
                  <Row>
                    <Col span={4}>
                      <Statistic title="序列长度" value={ rootData[curDataIndex].seqLength } />
                    </Col>
                    <Col span={4}>
                      <Statistic title="序列缺失" value={ rootData[curDataIndex].lossLength } />
                    </Col>
                    <Col span={4}>
                      <Statistic title="采样频率" value={"20ms"} />
                    </Col>
                    {
                      rootData[curDataIndex].status != 5 ? 
                      (<Button danger type="primary"  onClick={ nextStep } style={{ width:"180px"}} disabled={ nextButtonDisabled }>下一步：{stepsRef[rootData[curDataIndex].status + 1].name}</Button>)  : (<></>)
                    }
                  </Row>
                  <div className="result-panel">
                    <div className="result-panel-inner">
                      <Tabs onTabClick={ tabClick } activeKey={ rootData[curDataIndex].tabActivekey } type="card">
                        {
                          rootData[curDataIndex].stepData.map((item, index) => {
                              let stp = stepsRef[index];
                              return (
                                <TabPane tab={stepsRef[index].name} key={index}>
                                  <stp.component data={item} />
                                </TabPane>
                              )
                            }
                          )        
                        }
                      </Tabs>
                    </div>
                  </div></>
                )
              }
          </div>
          </div>
        </div>

      <Footer style={{ textAlign: 'center' }}>Ant Design ©2020 Created by Zhangyapeng </Footer>
    </Layout>
  );
};
export default FaultDetectSys;
ReactDOM.render(<FaultDetectSys />, document.getElementById("root"));