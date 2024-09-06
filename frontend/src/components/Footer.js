import React from 'react';
import { Layout, Space, Typography } from 'antd';
import { GithubOutlined, LinkedinOutlined, MailOutlined, GlobalOutlined } from '@ant-design/icons';
import './Footer.css';

const { Footer } = Layout;
const { Link, Text } = Typography;

const AppFooter = () => {
  return (
    <Footer className="app-footer">
      <Text className='created-by'>Created by dan1d</Text>
      <div className="footer-links">
        <Space size="large">
          <Link href="https://github.com/dan1d" target="_blank" rel="noopener noreferrer">
            <GithubOutlined style={{ fontSize: '20px' }} /> GitHub
          </Link>
          <Link href="https://www.linkedin.com/in/dan1d/" target="_blank" rel="noopener noreferrer">
            <LinkedinOutlined style={{ fontSize: '20px' }} /> LinkedIn
          </Link>
          <Link href="mailto:danielfromarg@gmail.com">
            <MailOutlined style={{ fontSize: '20px' }} /> Email
          </Link>
          <Link href="https://dan1d.dev" target="_blank" rel="noopener noreferrer">
            <GlobalOutlined style={{ fontSize: '20px' }} /> Portfolio
          </Link>
        </Space>
      </div>
    </Footer>
  );
};

export default AppFooter;
