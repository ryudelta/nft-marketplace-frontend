import React from 'react';
import { Container } from 'react-bootstrap';

const HomePage: React.FC = () => {
    return (
      <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <h1>Home with all data market</h1>
        <p>This is the Home section.</p>
      </Container>
    );
}


export default HomePage;