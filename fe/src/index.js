import ReactDOM from 'react-dom';
import React, { useEffect, useState } from "react";
import { Tree, Layout, Steps, Menu, Button, Tabs, Table, Tag, Space, Row, Col, Empty,  Statistic, Card } from 'antd';
import { FileOutlined, PlusOutlined } from '@ant-design/icons';
import { CSVReader } from 'react-papaparse'
import ReactEcharts from 'echarts-for-react'
import axios from 'axios';

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

const requestUrl = [ "padding", "sampling", "seqResolve", "classify", "detect" ];

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
          {
            "requestData": [],
            "responseData": [],
          },
          ...
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
    data = data.map(v => v.data);
    for(let i = 0; i < data.length; i++){
      if(data[i][1] == '')lossLen++;
    }
    let obj = {
      "fileName" : f.name,
      "status" : 0,
      "seqLength" : len,
      "lossLength" : lossLen,
      "tabActivekey" : '0',
      "stepData" : [{
        "requestData": data,
        "responseData": data,
      }]
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
    let requestData =  rootData[curDataIndex].stepData[curStatus > 2 ? 2 : curStatus].responseData;

    requestData = requestData.map(v => [parseInt(v[0]), parseFloat(v[1])]);

    axios.post(`/api/${requestUrl[curStatus]}`, {data:requestData})
    .then(function (response) {
      let responseData = JSON.parse(response.data.data);
      let temp = [...rootData]
      temp[curDataIndex].status += 1;
      temp[curDataIndex].tabActivekey = temp[curDataIndex].status.toString();
      temp[curDataIndex].stepData.push({
        "requestData": requestData,
        "responseData": responseData,
      });
      setRootData(temp);
      setNextButtonDisabled(false);
    })  
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
      <Header className="header"  style={{padding:"0 15px"}}>
        <div className="logo" style={{color:"white",fontSize:"28px"}}>
          航天器遥测数据分类与故障检测系统v3.6
        </div>
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
                    <Empty />
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
                    <Empty />
                  </div>
                ) : ( <>
                 <Tag color="magenta">序列长度：{rootData[curDataIndex].seqLength}</Tag>
                 <Tag color="magenta">序列缺失：{rootData[curDataIndex].lossLength}</Tag>
                 <Tag color="magenta">采样频率：20ms</Tag>
                  {
                      rootData[curDataIndex].status != 5 ? 
                      (<Button danger size="small" type="primary"  onClick={ nextStep } style={{float:"right", width:"180px"}} disabled={ nextButtonDisabled }>下一步：{stepsRef[rootData[curDataIndex].status + 1].name}</Button>)  : (<></>)
                  }
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