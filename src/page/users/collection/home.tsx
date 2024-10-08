import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const CollectionPage: React.FC = () => {
  const navigate = useNavigate();

  const goToCreatePage = () => {
    navigate('/collection/create');
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <h1>Collection page</h1>
      <p>This is the NFT section.</p>
      <Button variant='primary' onClick={goToCreatePage}>
        Go to Collection Create Page
      </Button>
    </Container>
  );
}

export default CollectionPage;