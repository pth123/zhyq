import "./index.scss"
import logo from "../../assets/logo.png"
import bg from "../../assets/bg.jpg"
import lgbg from "../../assets/lgbg.jpg"
import { Button, Form, Input } from 'antd';
import { UserOutlined,LockOutlined } from '@ant-design/icons';
import { login } from "../../api/user";
import { setToken } from "../../store/login/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login(){
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function handleLogin() {
        form.validateFields().then(async (res) => {
            const {data:{token,username}} = await login(res)
            dispatch(setToken(token))
            sessionStorage.setItem("username",username)
            navigate("/")
        }).catch((err) => {
            console.log(err);
        });
    }


    // style={{ backgroundImage: `url(${bg})` }}>
    return <div className="login" style={{backgroundImage:`url(${bg})` }}> 
                <div className="lgbg" style={{backgroundImage:`url(${lgbg})` }}> 
                    <div className="part">
                        <div className="title">
                            <div className="logo">
                                <img src={logo} width={100}/>
                            </div>
                            <h1>卓英社智慧园区平台</h1>
                        </div>
                        <Form  form={form} 
                        >
                            <Form.Item
                            name="username"
                            rules={[
                                { required: true, message: '用户名不能为空' },
                                { pattern:/^[a-zA-Z0-9_-]{4,16}$/, message: '用户名包含字母、数字和下划线，并且长度在4到16个字符之间' }
                            ]}
                            >
                            <Input placeholder="请输入用户名" prefix={<UserOutlined />}/>
                            </Form.Item>

                            <Form.Item
                            name="password"
                            rules={[{ required: true, message: '密码不能为空' }]}
                            >
                            <Input.Password placeholder="请输入密码" prefix={<LockOutlined />}/>
                            </Form.Item>

                            <Form.Item>
                            <Button 
                                type="primary" 
                                style={{width:"100%"}}
                                onClick={handleLogin}
                            >
                                登录
                            </Button>
                            </Form.Item>
                        </Form>

                        
                    </div>
                </div>
        </div>
}



export default Login