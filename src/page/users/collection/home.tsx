import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Collections } from '../../../hooks/collection/interface';
import { collectionFile } from '../../../hooks/collection/file';


const CollectionPage: React.FC = () => {
  const navigate = useNavigate();

  const [collections, setCollection] = useState<Collections[]>([])
  const [loading, setLoading] = useState<boolean>(true);

  const handleFetchCollecionData = async(): Promise<Collections[] | []> => {
    try {
      const collection = await collectionFile.fetch()
      setCollection(collection)
    } catch (error: any) {
      setCollection([])
      throw(error.message)
    }
    return []
  }

  const goToCreatePage = () => {
    navigate('/collection/create');
  };

  const goToNFTPage = (collectionAddress: string) => {
    navigate(`/collection/nft/${collectionAddress}`);
  };

  useEffect(() => {
    const fetchCollection = async () => {
      await handleFetchCollecionData()
      setLoading(false);
    }

    if (loading){
      fetchCollection()
    }
  })

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="mb-4">Collection Page</h1>
      <Row className="g-4">
        {!loading && collections.map((collection) => (
          <Col md={4} key={collection.address}>
            <Card>
              <Card.Img variant="top" src="https://gateway.pinata.cloud/ipfs/QmTVg1kzR8owKJYEPLGnsut6K24gkArZEfpoYuYS6Lguva" alt={collection.ContractName} />
              <Card.Body>
                <Card.Title>{collection.ContractSymbol} - {collection.ContractName}</Card.Title>
                <Button variant="primary" onClick={() => goToNFTPage(collection.address)}>View Details</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="mt-4">
        <Button variant="success" onClick={goToCreatePage}>
          Go to Collection Create Page
        </Button>
      </div>
    </Container>
  );
}

export default CollectionPage;