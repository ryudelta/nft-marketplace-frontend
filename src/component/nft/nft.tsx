import { useParams } from "react-router-dom";
import { nftContracts } from "../../hooks/nft/contract";
import { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";

interface NftProps {
    collectionAddress: string | undefined
}

const NftTab: React.FC<NftProps> = ({ collectionAddress }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const path = window.location.pathname.split('/')
  const address = path[path.length - 1];

  const handleNftFetching = async(): Promise<any> => {
    const nft = await nftContracts.data(address)
    console.log(nft);
    setLoading(false)
    return nft
  }
  
  useEffect(() => {
    if (loading){
      handleNftFetching()
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
    <div className="p-3">
      <h5>Welcome to the NFT Home</h5>
      <p>Here you can explore various NFTs available for trading.</p>
      <p>Collection Address: {address}</p>
    </div>
  );
};

export default NftTab