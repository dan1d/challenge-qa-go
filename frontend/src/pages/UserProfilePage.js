import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, Avatar, message, Card, Spin, Progress } from 'antd';
import { UserOutlined, UploadOutlined, LockOutlined } from '@ant-design/icons';
import zxcvbn from 'zxcvbn';
import api from '../api';

const UserProfilePage = () => {
  const [avatar, setAvatar] = useState(null);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await api.user.getProfile();
        setUser(userData);
        setAvatar(userData.avatarUrl);
        form.setFieldsValue({
          displayName: userData.displayName,
        });
      } catch (error) {
        console.log(error);
        message.error('Failed to load user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [form]);

  const onFinish = async (values) => {
    if (values.password && values.password !== values.confirmPassword) {
      message.error('Passwords do not match!');
      return;
    }

    try {
      const updateData = { displayName: values.displayName, avatarUrl: avatar || user.avatarUrl };
      if (values.password) {
        updateData.password = values.password;
      }

      const response = await api.user.updateProfile(updateData);
      message.success('Profile updated successfully!');
      setUser(response); // Update the local user state with the latest data
    } catch (error) {
      console.log(error);
      message.error('Failed to update profile');
    }
  };

  const handleAvatarChange = ({ file }) => {
    if (file.status === 'done') {
      const avatarUrl = URL.createObjectURL(file.originFileObj);
      setAvatar(avatarUrl);
      message.success(`${file.name} file uploaded successfully`);
    } else if (file.status === 'error') {
      message.error(`${file.name} file upload failed.`);
    }
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    const strength = zxcvbn(value).score;
    setPasswordStrength(strength);
    setPasswordVisible(value.length > 0);
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
        return 'red';
      case 1:
        return 'orange';
      case 2:
        return 'yellow';
      case 3:
        return 'blue';
      case 4:
        return 'green';
      default:
        return 'red';
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Card title="User Profile" bordered={false} style={{ maxWidth: 400, margin: 'auto' }}>
      <Form
        form={form}
        name="user_profile"
        onFinish={onFinish}
        initialValues={{
          displayName: user.displayName,
        }}
      >
        <Form.Item name="avatar" label="Avatar">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              size={64}
              icon={avatar ? <img src={avatar} alt="avatar" /> : <UserOutlined />}
              style={{ marginRight: 16 }}
            />
            <Upload
              name="avatar"
              showUploadList={false}
              beforeUpload={() => false}
              onChange={handleAvatarChange}
            >
              <Button icon={<UploadOutlined />}>Change Avatar</Button>
            </Upload>
          </div>
        </Form.Item>

        <Form.Item
          name="displayName"
          label="Display Name"
          rules={[{ required: true, message: 'Please input your display name!' }]}
        >
          <Input placeholder="Enter your display name" />
        </Form.Item>

        <Form.Item
          name="password"
          label="New Password"
          rules={[{ required: false, message: 'Please input your new password!' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Enter new password"
            onChange={handlePasswordChange}
          />
        </Form.Item>

        {passwordVisible && (
          <>
            <Progress
              percent={(passwordStrength + 1) * 20}
              showInfo={false}
              strokeColor={getPasswordStrengthColor()}
              style={{ marginBottom: '10px' }}
            />
            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={['password']}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Confirm new password" />
            </Form.Item>
          </>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Update Profile
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default UserProfilePage;
