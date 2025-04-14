import { useLocation } from "react-router-dom" //获取路由路径
import { useSelector } from "react-redux";




function MyBreadCrumb(){
    const Location = useLocation();
    const {menuList} = useSelector((state:any)=>state.authSlice)
    console.log(Location.pathname)
    return(
        <div>面包屑组件</div>
        
    )
}

export default MyBreadCrumb