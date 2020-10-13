import React from "react";
import ReactEcharts from 'echarts-for-react'

import 'antd/dist/antd.css';
import '../../style/sourceDataPanel.css';

const SourceDataPanel = ( prop ) => {

  const { data } = prop;

  const option = {
    title: {
      text: '原始数据',
      subtext: '简要描述',
      left: 'center',
      align: 'right'
    },
    tooltip: {
      trigger: 'axis'
    },
    dataZoom: [
      {
        show: true,
      },
      {
        type: 'inside',
      }
    ],
    xAxis: {
        type: 'category',
        data: Array.from([...Array(data.length)].keys())
    },
    yAxis: {
        type: 'value'
    },
    series: [
      {
        data:  data.map(v => parseFloat(v.data[1])),
        type: 'line',
        lineStyle: {
          width: 2
        },
        symbol: 'none',
        // markArea: {
        //   silent: true,
        //   itemStyle: {
        //     color: 'rgba(0,0,0,0.3)'
        //   },
        //   data: [
        //       [
        //         {
        //           xAxis: '200'
        //         }, 
        //         {
        //           xAxis: '3000'
        //         }
        //       ],
        //       [
        //         {
        //           // label: {
        //           //   show: true,
        //           //   position: ['50%', '50%'],
        //           //   color: 'black',
        //           //   fontStyle: 'bald',
        //           //   fontSize: 20,
        //           //   rotate: 0,
        //           //   formatter: "序列缺失"
        //           // },
        //           xAxis: '100'
        //         }, 
        //         {
        //           xAxis: '700'
        //         }
        //       ]
        //   ]
        // },
      },
    ]
  };

  return (
    <div className="sourceData-panel"> 
        <ReactEcharts
          option={ option }
          style={{height: '300px', width: '100%'}}
        />
    </div>
  );
};
export default SourceDataPanel;






