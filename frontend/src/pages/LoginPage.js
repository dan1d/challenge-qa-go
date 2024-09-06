import React from 'react';
import { Form, Input, Button, message, Card, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await api.auth.login(values.email, values.password);
      message.success('Login successful!');
      navigate('/chatroom'); // Redirect to chatroom after successful login
    } catch (error) {
      const errorMessage = error.response?.data?.errors || error.message || 'Login failed';
      message.error(errorMessage);
    }
  };

  return (
    <Card title="Login" bordered={false} style={{ maxWidth: 400, margin: 'auto' }}>
      <Form
        name="login_form"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button" block>
            Log in
          </Button>
        </Form.Item>
      </Form>

      <Card type="inner" title="Review User Accounts">
        <Text>
          For review purposes, you can use the following credentials to log in:
        </Text>
        <ul>
          <li>Email: <strong>reviewer@example.com</strong> | Password: <strong>review123</strong></li>
          <li>Email: <strong>test1@example.com</strong> | Password: <strong>password123</strong></li>
          <li>Email: <strong>test2@example.com</strong> | Password: <strong>password123</strong></li>
          <li>Email: <strong>admin@example.com</strong> | Password: <strong>admin123</strong></li>
        </ul>
        <Text type="secondary">
          Please use these accounts for testing and reviewing the application.
        </Text>
      </Card>
    </Card>
  );
};

export default LoginPage;
