import React, { useEffect, useState } from 'react';
import {
  DashboardOutlined,
  FolderAddOutlined,
  FolderOpenOutlined,
  FundViewOutlined,
  LogoutOutlined,
  RetweetOutlined,
  UserOutlined,
  FormOutlined,
  SnippetsOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Dropdown, Button, Space, Spin, message, Divider } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../assets/image/logo.png';
import ProfileImage from '../assets/image/user_50px.png';
import { getRoleMenu, getUser, isLogin, logout } from '../../config/helper';
import FlagKH from '../assets/flags/kh.png';
import FlagUS from '../assets/flags/us.png';
import DateTime from './DateTime';

const { Header, Content, Sider, Footer } = Layout;
const { SubMenu } = Menu;

const MainLayout = () => {
  const user = getUser();
  const permission_menu = getRoleMenu();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [language, setLanguage] = useState('KH');
  const [loading, setLoading] = useState(false);
  const [itemsMenu, setItemsMenu] = useState([]);

  useEffect(() => {
    if (!isLogin()) {
      navigate('/');
    }

    const generateMenuItems = (lang) => {
      return [
        {
          key: 'home',
          icon: <DashboardOutlined />,
          label: lang === 'KH' ? 'ផ្ទាំងគ្រប់គ្រង' : 'Dashboard',
        },
        {
          key: 'leader',
          icon: <FundViewOutlined />,
          label: lang === 'KH' ? 'រចនាសម្ព័ន្ធ' : 'Leaders',
        },
        {
          key: 'vision',
          icon: <FundViewOutlined />,
          label: lang === 'KH' ? 'ទស្សនាវិស័យ' : 'Vision',
        },
        {
          key: 'value',
          icon: <FundViewOutlined />,
          label: lang === 'KH' ? 'គុណតម្លៃ' : 'Value',
        },
        // {
        //   key: 'service-package',
        //   icon: <FundViewOutlined />,
        //   label: lang === 'KH' ? 'កញ្ចប់សេវា' : 'Service Package',
        // },
        {
          key: 'mission',
          icon: <FormOutlined />,
          label: lang === 'KH' ? 'បេសសកម្ម' : 'Mission',
        },
        {
          key: 'history',
          icon: <FormOutlined />,
          label: lang === 'KH' ? 'ប្រវត្តិមន្ទីរពេទ្យ' : 'History',
        },
        {
          key: 'inbox-message',
          icon: <FormOutlined />,
          label: lang === 'KH' ? 'ប្រអប់សំបុត្រ' : 'Inbox Message',
        },
        {
          key: 'partner',
          icon: <FormOutlined />,
          label: lang === 'KH' ? 'ដៃគូសហការ' : 'Partners',
        },
        {
          key: 'sub8',
          icon: <RetweetOutlined />,
          label: lang === 'KH' ? 'សេវាព្យាបាល' : 'News Hospital',
          children: [
            
            {
              key: 'department',
              icon: <FormOutlined />,
              label: lang === 'KH' ? 'ជំងឺក្រៅ &សម្រាកពេទ្យ' : 'Type of Services2',
            },
            // {
            //   key: 'department',
            //   icon: <FormOutlined />,
            //   label: lang === 'KH' ? 'សេវាព្យាបាលសម្រាកពេទ្យ' : 'Type of Services1',
            // },
            {
              key: 'service-package',
              icon: <FundViewOutlined />,
              label: lang === 'KH' ? 'កញ្ចប់សេវា' : 'Service Package',
            },        
          ],
        },
        {
          key: 'sub9',
          icon: <RetweetOutlined />,
          label: lang === 'KH' ? 'ការផ្សព្វផ្សាយ' : 'Management Ads',
          children: [
            {
              key: 'training',
              icon: <SnippetsOutlined />,
              label: lang === 'KH' ? 'វគ្គបណ្តុះបណ្តាល' : 'Training',
            },
            {
              key: 'post-list-page',
              icon: <FolderOpenOutlined />,
              label: lang === 'KH' ? 'បញ្ជីអត្ថបទ' : 'Post list',
            },
            {
              key: 'image-slide-show',
              icon: <SnippetsOutlined />,
              label: lang === 'KH' ? 'ជា​រូបភាព Show' : 'Slide show',
            },
            {
              key: 'book-page',
              icon: <SnippetsOutlined />,
              label: lang === 'KH' ? 'អនុក្រឹត្យ ' : 'Document books',
            },
            {
              key: 'marquee',
              icon: <SnippetsOutlined />,
              label: lang === 'KH' ? 'អក្សររត់' : 'Show marquee',
            },
          ],
        },
        // {
        //   key: 'post-create-page',
        //   icon: <FormOutlined />,
        //   label: lang === 'KH' ? 'បង្កើតអត្ថបទ' : 'Post create',
        // },
        {
          key: 'sub7',
          icon: <RetweetOutlined />,
          label: lang === 'KH' ? 'ការិយាល័យ' : 'Departments',
          children: [
            {
              key: 'administration-page',
              icon: <FormOutlined />,
              label: lang === 'KH' ? 'រដ្ឋបាល និងបុគ្គលិក' : 'Administration',
            },
            {
              key: 'account-page',
              icon: <FormOutlined />,
              label: lang === 'KH' ? 'ហិរញ្ញវត្ថុ' : 'Account',
            },
            {
              key: 'technical-page',
              icon: <FormOutlined />,
              label: lang === 'KH' ? 'បច្ចេកទេស' : 'Technical',
            },
          ],
        },
        {
          key: 'sub3',
          icon: <RetweetOutlined />,
          label: lang === 'KH' ? 'បង្កើតគណនី' : 'System',
          children: [
            {
              key: 'user-page',
              icon: <FormOutlined />,
              label: lang === 'KH' ? 'គណនីប្រើប្រាស់' : 'User',
            },
            {
              key: 'role-page',
              icon: <UserOutlined />,
              label: lang === 'KH' ? 'កំណត់តួនាទី' : 'Role',
            },
          ],
        },
        {
          key: 'view-website',
          icon: <FundViewOutlined />,
          label: lang === 'KH' ? 'មើលវេសាយ' : 'View website',
        },
      ];
    };

    const itemsMenuAll = generateMenuItems(language);

    const updatedMenu = itemsMenuAll.filter(item => {
      if (item.children) {
        item.children = item.children.filter(child => 
          permission_menu.some(permission => permission.route === child.key)
        );
        return item.children.length > 0;
      }
      return permission_menu.some(permission => permission.route === item.key);
    });

    setItemsMenu(updatedMenu);
  }, [navigate, language, permission_menu]);

  const onClickMenu = (event) => {
    if (event.key === 'logout') {
      logout();
      navigate('/');
      return;
    }
    navigate(event.key);
  };

  const handleLanguageChange = (lang) => {
    setLoading(true);
    setTimeout(() => {
      setLanguage(lang);
      setLoading(false);
      message.success(`Language changed to ${lang === 'KH' ? 'Khmer' : 'English'}`);
    }, 1000); // Simulate a 1 second loading time
  };

  const handleBackup = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/backup-database');
      message.success(response.data);
    } catch (error) {
      message.error('Backup failed');
    } finally {
      setLoading(false);
    }
  };

  const languageMenu = (
    <Menu>
      <Menu.Item key="kh" onClick={() => handleLanguageChange('KH')}>
        <Space>
          <img src={FlagKH} alt="KH" style={{ width: 20, marginRight: 5 }} />
          ខ្មែរ
        </Space>
      </Menu.Item>
      <Menu.Item key="en" onClick={() => handleLanguageChange('EN')}>
        <Space>
          <img src={FlagUS} alt="EN" style={{ width: 20, marginRight: 5 }} />
          EN
        </Space>
      </Menu.Item>
    </Menu>
  );

  if (!user) {
    return null;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['home']} mode="inline" onClick={onClickMenu}>
          {itemsMenu.map((item) =>
            item.children ? (
              <SubMenu key={item.key} icon={item.icon} title={item.label}>
                {item.children.map((child) => (
                  <Menu.Item key={child.key} icon={child.icon}>
                    {child.label}
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item key={item.key} icon={item.icon}>
                {item.label}
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: '#fff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 25px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={Logo} alt="Logo" style={{ width: 200, objectFit: 'contain', marginRight: 10 }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <DateTime />
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: 20 }}>
              <Space>
                <Divider />
              </Space>
              <Spin spinning={loading}>
                <Dropdown overlay={languageMenu} trigger={['click']} style={{ marginLeft: 15 }}>
                  <Button
                    style={{
                      border: 'none',
                      boxShadow: 'none',
                      padding: '0',
                    }}
                  >
                    <img
                      src={language === 'KH' ? FlagKH : FlagUS}
                      alt={language}
                      style={{ width: 20, marginRight: 5 }}
                    />
                    {language === 'KH' ? 'ខ្មែរ' : 'EN'}
                  </Button>
                </Dropdown>
              </Spin>
              <Button
                type="primary"
                size="small"
                style={{
                  marginLeft: 15,
                  backgroundColor: '#1890ff',
                  borderColor: '#1890ff',
                  color: 'white',
                  borderRadius: '10px',
                }}
                onClick={handleBackup}
              >
                {language === 'KH' ? 'រក្សាទុកទិន្នន័យ' : 'Backup'}
              </Button>
              <div style={{display:"flex",alignItems:"center"}}>
              <img src={ProfileImage} style={{width:40,objectFit:'contain',borderRadius:20,marginLeft:10}} />
              <div>
                <div className='txt_normal' style={{height:20}}>សួស្តី {user?.firstName}!</div>        
                <div className='txt_normal' style={{fontSize:12,textAlign:'right'}}>{user?.RoleName}</div>
              </div>
            </div>
              <Button
                type="primary"
                size="small"
                icon={<LogoutOutlined />}
                style={{
                  marginLeft: 15,
                  backgroundColor: '#ff4d4f',
                  borderColor: '#ff4d4f',
                  color: 'white',
                  borderRadius: '10px',
                }}
                onClick={() => {
                  logout();
                  navigate('/');
                }}
              >
                {language === 'KH' ? 'ចាកចេញ' : 'Logout'}
              </Button>
            </div>
          </div>
        </Header>
        <Content style={{ margin: '16px', background: '#fff', padding: 24 }}>
          {loading ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                overflow: "scroll",
              }}
            >
              <Spin size="large" tip="Loading..." />
            </div>
          ) : (
            <Outlet />
          )}
        </Content>
        <Footer style={{ background: '#fff', padding: 10 }}>
          <marquee behavior="scroll" direction="left" scrollamount="5">
          សូមធ្វើការ​Backup ទិន្នន័យ ជាប្រចាំសប្តាហ៍ ជៀសវាងមានហានិភ័យ កើតឡើង
          </marquee>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
