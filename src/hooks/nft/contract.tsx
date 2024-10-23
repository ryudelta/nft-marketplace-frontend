import { ethers } from "ethers";
import CFT from "../../../contract/nft1155/artifacts/contracts/CFT.sol/ChefToken.json";

const getSigner = async (): Promise<ethers.Signer | null> => {
    if (typeof window !== 'undefined' && window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        return await provider.getSigner();
    }

    return null;
}

const nftContracts = {
    mint: async(address: string, data: MetaDatas, url: string): Promise<Result> => {
        const artifacts = artifact()
        const signer = await getSigner()
        
        if (!signer) {
            throw new Error("No signer available. Please connect your wallet.");
        }

        const {abi} = artifacts

        try {
            const owner = await signer.getAddress()
            const contract = new ethers.Contract(address, abi, signer);
            const tx = await contract.mint(
                owner,
                data.supply,
                url,
                "0x",
                {
                    gasPrice: ethers.parseUnits('50', 'gwei'),
                },
            )
            
            await tx.wait();
            if (tx.hash) {
                return {
                    status: true,
                    message: tx.hash
                }
            }else{
                return {
                    status: true,
                    message: JSON.stringify(tx)
                }
            }
        } catch (error: any) {
            return {
                status: true,
                message: error
            }
        }
    },
    data: async(address: string): Promise<ResultMany> => {
        const artifacts = artifact()
        const signer = await getSigner()
        
        if (!signer) {
            throw new Error("No signer available. Please connect your wallet.");
        }

        const { abi } = artifacts

        try {
            const contract = new ethers.Contract(address, abi, signer);
            const [tokenIds, uris] = await contract.getAllTokenURIs()

            if (tokenIds.length == 0) {
                return {
                    status: true,
                    message: {
                        tokenId: [],
                        url: []
                    }
                }
            }

            return {
                status: true,
                message: {
                    tokenId: tokenIds,
                    url: uris
                }
            }
        } catch (error: any) {
            return {
                status: false,
                message: error
            }
        }
    }
}

const artifact = (): any => {
    return CFT
}

export { nftContracts }