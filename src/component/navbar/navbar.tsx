import React, { useState } from 'react';
import { Navbar, Nav, Container, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { WalletConnection } from '../../hooks/wallet/interface';
import useWallet from '../../hooks/wallet/wallet';

const MyNavbar: React.FC = () => {
  const walletConfig = useWallet();

  const { walletAddress } = useWallet();

  const [expanded, setExpanded] = useState(false);
  const [wallet, setWallet] = useState<WalletConnection>({address: null, message: '', signature: ''});
  const [showAlert, setShowAlert] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleConnectWallet = async () => {
    const wallet = await (await walletConfig).connectWallet();
    if (wallet) {
      setWallet(wallet);
    } else {
      setShowAlert(true);
    }
  };

  return (
    <>
    <Navbar expanded={expanded} bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          MyApp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about" onClick={() => setExpanded(false)}>
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/services" onClick={() => setExpanded(false)}>
              Services
            </Nav.Link>
            <Nav.Link as={Link} to="/profile" onClick={() => setExpanded(false)}>
              Profile
            </Nav.Link>
          </Nav>
          {walletAddress != null ? (
            <Button variant="secondary" disabled>
              {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
            </Button>
          ) : (
            <Button variant="primary" onClick={handleConnectWallet}>
              Connect Wallet
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {showAlert && ( 
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 999 }}>
          <Alert.Heading>MetaMask Not Installed!</Alert.Heading>
          <p>
            Please install MetaMask to connect your wallet. <a href="https://metamask.io/download.html" target="_blank" rel="noopener noreferrer">Click here to install!</a>
          </p>
        </Alert>
      )}
    </>
  );
};

export default MyNavbar;
