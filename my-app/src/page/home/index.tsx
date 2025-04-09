import React, { useState } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import NavLeft from "../../components/navLeft";
import MyHeader from '../../components/Header';
import MyBreadCrumb from '../../components/BreadCrumb';
import { Outlet } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;


function Home(){

    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <NavLeft />
          </Sider>
          <Layout>
            <Header style={{ paddingRight: "30px", background: colorBgContainer,textAlign:'right'}} >
                <MyHeader />
            </Header>
            <Content style={{ margin: '0 16px' }}>
              <MyBreadCrumb/>
                <Outlet />
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      );
    };

export default Home