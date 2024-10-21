import { useParams } from "react-router-dom";

interface NftProps {
    collectionAddress: string
}

const NftTab: React.FC<NftProps> = ({ collectionAddress }) => {
    const path = window.location.pathname.split('/')
    const address = path[path.length - 1];
    
    return (
      <div className="p-3">
        <h5>Welcome to the NFT Home</h5>
        <p>Here you can explore various NFTs available for trading.</p>
        <p>Collection Address: {address}</p>
      </div>
    );
};

export default NftTab