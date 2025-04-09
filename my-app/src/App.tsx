import { RouterProvider } from "react-router-dom";
import { useEffect, useState,Suspense } from "react";
import { generateRoutes } from "./utils/generateRoutes";
import { useSelector } from "react-redux";
import {routes} from "./router"
import { createBrowserRouter } from "react-router-dom";

function App() {

const {menuList} = useSelector((state:any)=>state.authSlice)
const [routerss,setRouter] = useState<any>(null)
  useEffect(()=>{
    const routers = generateRoutes(menuList) //动态创建路由表
    const myRoutes = [...routes]
    myRoutes[0].children = routers
    if(myRoutes[0].children[0]){
      myRoutes[0].children[0].index = true
    }
    const router = createBrowserRouter(myRoutes)
    setRouter(router)
  },[menuList])

  if(routerss){
    return (
      <div className="App">
        <Suspense fallback={<p>加载中...</p>}>
          <RouterProvider router={routerss}>
        </RouterProvider></Suspense>
      </div>
    );
  }else{
    return <div>....</div>
  }


}

export default App;
