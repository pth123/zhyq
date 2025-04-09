import { Menu } from 'antd';
import { getMenu } from '../../api/user';
import { useEffect, useState } from 'react';
import Item from 'antd/es/list/Item';
import icons from "./iconList"
import logo from "../../assets/logo.png"
import "./index.scss"
import { setMenu } from '../../store/login/authSlice';
import { useDispatch, UseDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface MenuItem{
    key:string,
    label:string,
    icon?:React.ReactNode,
    children?:MenuItem[]
}

interface MenuItemFromData{
  key:string,
  label:string,
  icon:string,
  children?:MenuItemFromData[]
}


function NavLeft(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [menuData,setMenuData]=useState<MenuItem[]>([])

    useEffect(()=>{
      configMenu()
    },[])

    async function configMenu(){
      const {data} = await getMenu()
      dispatch(setMenu(data))
      const mappedMenuItems:MenuItem[] = mapMenuItems(data)
      setMenuData(mappedMenuItems)
    }

    //将返回的菜单数据转换成需要的格式
    function mapMenuItems(items:MenuItemFromData[]):any{
      return items.map((item:MenuItemFromData)=>({
          key:item.key,
          label:item.label,
          icon:icons[item.icon],
          children:item.children ? mapMenuItems(item.children) : null //递归操作
      }))
  }

  function handleClick({key}:{key:string}){
    navigate(key)
    }

    return (
        <div className='navLeft'>
          <div className='logo'>
              <img src={logo} alt="" width={18}/>
              <h1>卓英社智慧园区</h1>
          </div>
          
          <Menu
            defaultSelectedKeys={['/dashboard']}
            mode="inline"
            theme="dark"
            items={menuData}
            onClick={handleClick}
          />
        </div>
      );
}

export default NavLeft