import { useState } from "react";
import { request } from "../config/request"
import Logo from "../component/assets/image/logo.png";
import Bg1 from "../component/assets/image/bg.PNG";
import { Button, Checkbox, Select, Form, Input, Typography, Title, Divider, Space,Alert } from 'antd';
import {
  UserOutlined,
  DeleteFilled,
  RightCircleOutlined,
  LoginOutlined, KeyOutlined,
} from '@ant-design/icons';
// import '../App.css';
import { useNavigate } from "react-router-dom";
import { setAccessToken, setRefreshToken,setRoleMenu,setUser } from "../config/helper";


const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // State for loading indicator

  const onChangeUsername = (event) => {
    setUsername(event.target.value)
  }
  const onChangePassword = (event) => {
    setPassword(event.target.value)
  }
  // const navigate = useNavigate();
  const onFinish = (values) => {
    console.log('Success:',);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const formContainerStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '20px',
    borderRadius: '10px',
    marginTop: '-90px', // Adjust this value to change the distance from the top
  };
  const myStyle = {
    height: "100vh",
    margin: 0,
    padding: 0,
    backgroundImage: `url(${Bg1})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffffff', // Example text color
    fontSize: '50px',


  };
  
const formContainerStyle1 = {
  fontFamily: 'KhmerOSSiemReap',  
};


  const onLogin = async () => {
    if (username == "" || password == "") {
      alert("Please fill in  username or password")
      return false;
    }
    setLoading(true);
    var data = {
      "Username": username, ///01292352
      "Password": password, //123
    }
    const res = await request("user/login", "post", data);
    if (res) {
      if (res.error) {
        alert(res.message)
      } else { // login user success
        
        setUser(res.user);
        setRoleMenu(res.permission_menu);
        setAccessToken(res.access_token);
        setRefreshToken(res.refesh_token);
        navigate("/home");
      }

    }

  }
  
  return (
    <div style={myStyle}>
      <div style={formContainerStyle}>
        <Form
          name="basic"
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Space direction="horizontal"></Space>
          <div style={{ textAlign: "center" }}>
            <img src={Logo} style={{ width: 270, margin: "auto", objectFit: 'contain', borderRadius: 40, marginRight: 10 }} />
          </div>
          <Form.Item
            label=""
            name="username"
            rules={[
              {
                required: true,
                message: 'សូមបំពេញឈ្មោះគណនី!',
              },
            ]}
          >
            <Input onChange={onChangeUsername} placeholder="ឈ្មោះគណនី" prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item
            label=""
            name="password"
            rules={[
              {
                required: true,
                message: 'សូមបំពេញលេខសម្ងាត់!',
              },
            ]}
          >
            <Input.Password onChange={onChangePassword} prefix={<KeyOutlined />} placeholder="លេខសម្ងាត់" />
          </Form.Item>

          <Form.Item>
            <Button 
            onClick={onLogin} 
            type="primary" 
            htmlType="submit" 
            style={{ width: '100%',   fontFamily: "KhmerOSSiemReap"  }}  
            >
              ចូលប្រើប្រាស់
            </Button>
          </Form.Item>

          <Divider>---</Divider>
          <div style={{ textAlign: 'center', marginTop: '10px',}}>
            <Typography.Text style={{ fontFamily: "KhmerOSSiemReap" }}>©២០២៤ រក្សាសិទ្ធិដោយ មន្ទីរពេទ្យជាតិ តេជោសន្តិភាព</Typography.Text>
          </div>

        </Form>
      </div>
    </div>

  )
}

export default LoginPage;
