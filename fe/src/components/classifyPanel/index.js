import React, { useEffect, useState } from "react";
import { Button,Result } from 'antd';
import ReactEcharts from 'echarts-for-react'

import 'antd/dist/antd.css';
import '../../style/classifyPanel.css';

const ClassifyPanel = (prop) => {

  const { data } = prop;
  const { responseData } = data;

  let chart_data = [];
  for(var key in responseData) {
    chart_data.push({
      'name':key,
      'value':responseData[key]
    });
  }
  console.log(chart_data);
  
  const option = {
    title: {
        text: '',
        subtext: '',
        left: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
    },
    series: [
        {
            name: '姓名',
            type: 'pie',
            radius: '55%',
            center: ['40%', '50%'],
            data: chart_data,
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

  return (
    <div className="classify-panel"> 
      <div className="chart-div">
         <ReactEcharts
          option={ option }
          style={{height: '300px', width: '100%'}}
        />
      </div>
      <div className="classify-result-div">
        <Result
          status="success"
          title="分类结果： rolling"
          subTitle=""
        />
      </div>
    </div>
  );
};
export default ClassifyPanel;






