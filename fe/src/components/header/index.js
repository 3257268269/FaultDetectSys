import { Layout, Menu, Dropdown, Button } from 'antd';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link } from 'react-router-dom';

import 'antd/dist/antd.css';
import '../../style/header.css';

const { Header } = Layout;


const TopBar = props => {

  useEffect(() => {
    console.log("刷新");
  }, []);


  const cur_path = window.location.pathname;

  return (
    <div className="header">
      <div className="logo">
          <img
            src="https://cn.vuejs.org/images/logo.png"
            width="100%"
            height="100%"
          />
      </div>
    </div>
  );
};

export default TopBar;
