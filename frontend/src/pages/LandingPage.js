import React from 'react';
import { Button, Typography, Layout, Row, Col, Card } from 'antd';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const LandingPage = () => {
  return (
    <Content className="landing-page">
      <Row align="middle" style={{ minHeight: '50vh' }}>
        <Col span={24}>
          <div className="landing-container">
            <Title level={1} className="landing-title">Welcome to the Chatroom Project</Title>
            <div className="landing-actions">
              <Link to="/login">
                <Button type="primary" size="large">Login Now</Button>
              </Link>
            </div>
            <Card className="project-info-card" bordered={false}>
              <Title level={4}>Project Overview</Title>
              <Paragraph>
                This project is a full-stack chatroom application built with a Rails backend and React frontend, designed for both group and private messaging. It features user authentication, secure JWT-based sessions, and an intuitive, responsive UI built using Ant Design.
              </Paragraph>

              <Title level={5}>Key Features</Title>
              <Paragraph>
                - Public and private chat rooms with real-time message updates (coming soon).<br/>
                - User authentication with JWT-based login and session handling.<br/>
                - Profile management with the ability to update user info and avatar.<br/>
                - Responsive and clean design leveraging Ant Design components.<br/>
              </Paragraph>

              <Title level={5}>Project Configuration & Deployment</Title>
              <Paragraph>
                The application is containerized using Docker, with separate configurations for development and production environments. It utilizes Traefik as a reverse proxy and load balancer, managing traffic across the frontend and backend services.
              </Paragraph>
              <Paragraph>
                The backend (Rails) is configured with PostgreSQL, and the frontend (React) handles user interaction. The project is deployed with Docker Compose, allowing for easy scaling and configuration.
              </Paragraph>

              <Title level={5}>Links & Documentation</Title>
              <Paragraph>
                - <a href="http://api.qa-challenge.dan1d.dev/swagger" target="_blank" rel="noopener noreferrer">Backend API Documentation (Swagger)</a><br/>
                - <a href="http://qa-challenge.dan1d.dev" target="_blank" rel="noopener noreferrer">Traefik Dashboard</a><br/>
                - Placeholder for <a href="#">AQA Testing Framework</a> (to be implemented)
              </Paragraph>

              <Title level={5}>Docker & Traefik Configuration</Title>
              <Paragraph>
                The project includes separate Docker Compose files for development and production environments. Traefik is configured as the reverse proxy for handling routing between services, and it automatically manages Let's Encrypt SSL certificates for secure communication.
              </Paragraph>
              <Paragraph>
                Backend and frontend services are containerized, with the backend using Rails to serve the API and manage authentication, while the frontend uses React for the user interface. Each service is connected via Traefik, allowing seamless routing and load balancing.
              </Paragraph>

              <Title level={5}>Future Enhancements</Title>
              <Paragraph>
                The project roadmap includes adding real-time messaging features using WebSockets, implementing full AQA (Automated Quality Assurance) with Cypress or Selenium, and further refining the user interface.
              </Paragraph>
            </Card>
          </div>
        </Col>
      </Row>
    </Content>
  );
};

export default LandingPage;
