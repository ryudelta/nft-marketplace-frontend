import { ethers } from 'ethers';
import { WalletConnection } from './interface';
import { useCallback, useEffect, useState } from 'react';

const message = `Sign this message to verify your identity: ${new Date().toISOString()}`;

const useWallet = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [signedMessage, setSignedMessage] = useState<string>('');
  const [signature, setSignature] = useState<string | null>(null);

  const connectWallet = useCallback(async (): Promise<WalletConnection> => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const address = await signer.getAddress();
        
        const signature = await signer.signMessage(message);

        setWalletAddress(address);
        setSignedMessage(message);
        setSignature(signature);

        localStorage.setItem('walletAddress', address);
        return { address, message, signature };
      } catch (error) {
        console.error('Error connecting to wallet:', error);
        return { address: null, message: '', signature: null };
      }
    } else {
      // MetaMask not detected
      window.open('https://metamask.io/download.html', '_blank');
      return { address: null, message: '', signature: null };
    }
  }, [])

  const disconnectWallet = useCallback(() => {
    setWalletAddress(null);
    setSignedMessage('');
    setSignature(null);
    localStorage.removeItem('walletAddress');
  }, []);

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          const address = accounts[0].address;
          setWalletAddress(address);
        }else{
          disconnectWallet();
        }
      }
    };

    checkWalletConnection();
  }, []);

  return { walletAddress, signedMessage, signature, connectWallet };
}
export default useWallet;