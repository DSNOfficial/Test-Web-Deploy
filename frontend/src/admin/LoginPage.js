import { useState } from "react";
import { request } from "../config/request";
import Logo from "../component/assets/image/logo.png";
import Bg1 from "../component/assets/image/bg.PNG";
import {
  Button,
  Form,
  Input,
  Typography,
  Divider,
  Spin,
  Alert,
} from 'antd';
import {
  UserOutlined,
  KeyOutlined,
} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import {
  setAccessToken,
  setRefreshToken,
  setRoleMenu,
  setUser,
} from "../config/helper";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onLogin = async () => {
    setError("");
    if (!username || !password) {
      setError("សូមបំពេញឈ្មោះគណនី និង លេខសម្ងាត់");
      return;
    }

    setLoading(true);
    const data = {
      Username: username,
      Password: password,
    };

    try {
      const res = await request("user/login", "post", data);
      if (res?.error) {
        setError(res.message);
      } else if (res) {
        setUser(res.user);
        setRoleMenu(res.permission_menu);
        setAccessToken(res.access_token);
        setRefreshToken(res.refesh_token);
        navigate("/home");
      } else {
        setError("មានបញ្ហាក្នុងការភ្ជាប់ប្រព័ន្ធ។");
      }
    } catch {
      setError("បរាជ័យក្នុងការភ្ជាប់!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={{ ...styles.background, backgroundImage: `url(${Bg1})` }} />

      {/* Full screen blur overlay when loading */}
      {loading && <div style={styles.blurOverlay} />}

      <div style={styles.formWrapper}>
        <Form name="loginForm" autoComplete="off">
          <div style={{ textAlign: "center" }}>
            <img
              src={Logo}
              alt="Logo"
              style={{
                width: 270,
                objectFit: 'contain',
                borderRadius: 40,
                marginBottom: 10,
              }}
            />
          </div>

          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              style={{ marginBottom: 16, fontFamily: "KhmerOSSiemReap" }}
            />
          )}

          <Form.Item
            name="username"
            rules={[{ required: true, message: 'សូមបំពេញឈ្មោះគណនី!' }]}
          >
            <Input
              onChange={(e) => setUsername(e.target.value)}
              placeholder="ឈ្មោះគណនី"
              prefix={<UserOutlined />}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'សូមបំពេញលេខសម្ងាត់!' }]}
          >
            <Input.Password
              onChange={(e) => setPassword(e.target.value)}
              prefix={<KeyOutlined />}
              placeholder="លេខសម្ងាត់"
            />
          </Form.Item>

          <Form.Item>
            <Button
              onClick={onLogin}
              type="primary"
              htmlType="submit"
              style={{ width: '100%', fontFamily: "KhmerOSSiemReap" }}
              disabled={loading}
            >
              ចូលប្រើប្រាស់
            </Button>
          </Form.Item>

          <Divider>---</Divider>
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <Typography.Text style={{ fontFamily: "KhmerOSSiemReap" }}>
              ©២០២៤ រក្សាសិទ្ធិដោយ មន្ទីរពេទ្យជាតិ តេជោសន្តិភាព
            </Typography.Text>
          </div>
        </Form>
      </div>

      {/* Optional loading spinner in center */}
      {loading && (
        <div style={styles.loadingSpinner}>
          <Spin size="large" tip="កំពុងចូល..." />
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    zIndex: 0,
  },
  blurOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 3,
    backdropFilter: "blur(6px)",
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  formWrapper: {
    position: "relative",
    zIndex: 2,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: 24,
    borderRadius: 12,
    width: 400,
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
  },
  loadingSpinner: {
    position: "absolute",
    top: "50%",
    left: "50%",
    zIndex: 4,
    transform: "translate(-50%, -50%)",
  },
};

export default LoginPage;
