import React from 'react';
import { UserOutlined,DownOutlined, PoweroffOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { clearToken } from '../../store/login/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target="_blank">
          个人中心
        </a>
      ),
      icon:<UserOutlined />
    },
    {
      key: '2',
      label: (
        <a target="_blank">
          退出登录
        </a>
      ),
      icon: <PoweroffOutlined />,
    }
  ];

function MyHeader(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onClick:MenuProps['onClick']=({key})=>{
        if(key=="1"){
            //跳转到个人中心
            navigate('/personal')
        }else{
            //退出登录
            dispatch(clearToken());
            sessionStorage.removeItem("username")
            
        }
        
    }
    return(
        <div>
            <Dropdown menu={{ items,onClick }}>
            <a onClick={(e) => e.preventDefault()}>
            <Space>
                欢迎您,{sessionStorage.getItem("username")}
                <DownOutlined />
            </Space>
        </a>
    </Dropdown>
        </div>
    )
}

export default MyHeader