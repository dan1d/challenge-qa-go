import React from 'react';
import { Layout, Menu } from 'antd';
import { LogoutOutlined, LoginOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { isAuthenticated, logout } from '../api/auth';

const { Header } = Layout;

const AppHeader = () => {
  const navigate = useNavigate();
  const userLoggedIn = isAuthenticated();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Header className="header">
      <div className="logo">
        <div className="chat-logo">💬</div>
        <span className="logo-text">ChatApp</span>
      </div>
      <Menu theme="dark" mode="horizontal" selectable={false}>
        {!userLoggedIn ? (
          <Menu.Item key="login">
            <Link to="/login">
              <LoginOutlined /> Login
            </Link>
          </Menu.Item>
        ) : (
          <>
            <Menu.Item key="logout" onClick={handleLogout}>
              <LogoutOutlined /> Logout
            </Menu.Item>
            <Menu.Item key="trigger-test">
              <Link to="/trigger-tests">
                 Trigger Tests
              </Link>
            </Menu.Item>
          </>
        )}
      </Menu>
    </Header>
  );
};

export default AppHeader;
