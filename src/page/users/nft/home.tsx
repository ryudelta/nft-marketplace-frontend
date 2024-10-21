import React from 'react';
import { Button, Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import './nft.css'; // Custom CSS for the page


const NftPage: React.FC = ({
}) => {
  const goToNftCreatePage = () => {
    // Navigate to NFT creation page (implement routing logic here)
    console.log('Navigating to NFT create page...');
  };

  const imageUrl =
    'https://i.seadn.io/s/raw/files/251eac123cfb3e38ea86c6c2943b8884.jpg?auto=format';

  return (
    <>
        <div className="collection-header background-img background-blur">
            <style>{`
            .collection-header::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-image: url(${imageUrl});
                background-size: cover;
                background-position: center;
                filter: blur(10px);
                z-index: 1;
            }

            .collection-header::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 2;
            }
            `}</style>

            <Container fluid className="p-4 content-data">
                <Row className="align-items-center">
                    <Col xs={12} md={6} className="d-flex align-items-center">
                        <div className='img'>
                            <img
                                src={imageUrl}
                                alt="NFT"
                                style={{
                                    width: '125px',
                                    height: '125px',
                                    borderRadius: '15%',
                                    marginRight: '15px',
                                }} />
                        </div>
                        <div className='img-title'>
                            <h3 className="mb-0">Alone</h3>
                        </div>
                    </Col>

                    <Col
                        xs={12}
                        md={6}
                        className="text-end d-flex justify-content-md-end justify-content-between mt-3 mt-md-0"
                    >
                        <div className="me-4 text-center">
                            <p className="mb-0">Total volume</p>
                            <strong></strong>
                        </div>
                        <div className="me-4 text-center">
                            <p className="mb-0">Floor price</p>
                            <strong></strong>
                        </div>
                        <div className="me-4 text-center">
                            <p className="mb-0">Best offer</p>
                            <strong></strong>
                        </div>
                        <div className="me-4 text-center">
                            <p className="mb-0">Listed</p>
                            <strong></strong>
                        </div>
                        <div className="text-center">
                            <p className="mb-0">Owners (Unique)</p>
                            <strong></strong>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
        <Tabs
            defaultActiveKey="items"
                id="justify-tab-example"
                className="mb-3"
                justify
            >
            <Tab eventKey="items" title="Items">
                Items
            </Tab>
            <Tab eventKey="offers" title="Offers">
                Offers
            </Tab>
            <Tab eventKey="activities" title="Actvity">
                Activity
            </Tab>
        </Tabs>
    </>
  );
};

export default NftPage;
