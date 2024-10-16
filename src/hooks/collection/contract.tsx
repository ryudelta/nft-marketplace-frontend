import path from "path";
import { CFTCollection, Collections } from "./interface";
import CFT from "../../../contract/nft1155/artifacts/contracts/CFT.sol/ChefToken.json";
import { ethers } from "ethers";

const getSigner = async (): Promise<ethers.Signer | null> => {
    if (typeof window !== 'undefined' && window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        return await provider.getSigner();
    }

    return null;
}

const contracts = {
    deploy: async(data: CFTCollection): Promise<string> => {
        const artifacts = artifact()
        const signer = await getSigner()
        if (!signer) {
            throw new Error("No signer available. Please connect your wallet.");
        }

        const {abi, bytecode} = artifacts
        try {
            const factory = new ethers.ContractFactory(abi, bytecode, signer)

            const contract = await factory.deploy(data);

            await contract.deploymentTransaction();

            const address = await contract.getAddress()

            return address;
        } catch (error: any) {
            return error
        }
    }
}

const artifact = (): any => {
    return CFT
}

export { contracts }