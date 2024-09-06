import React from 'react';
import { Layout, Menu, Spin } from 'antd';
import { MessageOutlined, UserOutlined } from '@ant-design/icons';
import './Sidebar.css';

const { Sider } = Layout;

const Sidebar = ({ rooms, onRoomSelect, loading }) => {
  if (loading) {
    return (
      <Sider width={200} className="site-layout-background">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Spin size="large" />
        </div>
      </Sider>
    );
  }

  // Separate public and private rooms
  const publicRooms = rooms.filter(room => !room.isPrivate);
  const privateRooms = rooms.filter(room => room.isPrivate);

  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['public_rooms', 'private_rooms']}
        style={{ height: '100%', borderRight: 0 }}
      >
        {/* Public Chat Rooms */}
        <Menu.SubMenu key="public_rooms" icon={<MessageOutlined />} title="Chat Rooms">
          {publicRooms.map((room) => (
            <Menu.Item key={`room-${room.id}`} onClick={() => onRoomSelect(room.id)}>
              #{room.name}
            </Menu.Item>
          ))}
        </Menu.SubMenu>

        {/* Direct Messages */}
        <Menu.SubMenu key="private_rooms" icon={<UserOutlined />} title="Direct Messages">
          {privateRooms.map((room) => (
            <Menu.Item key={`private-${room.id}`} onClick={() => onRoomSelect(room.id)}>
              {room.name}
            </Menu.Item>
          ))}
        </Menu.SubMenu>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
