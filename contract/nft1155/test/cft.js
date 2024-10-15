const { expect } = require("chai");
const axios = require('axios');
require('dotenv').config();

describe("Minting Tokens", function () {
    let chefToken;
    let owner;
    const initialUri = "https://example.com/initial.json";

    beforeEach(async function () {
        [owner] = await ethers.getSigners();
        
        const Collection = {
            name: "Chef Collection",
            symbol: "CHEF",
            newUri: initialUri,
            initialOwner: owner.address,
        };

        const ChefToken = await ethers.getContractFactory("ChefToken");
        chefToken = await ChefToken.deploy(Collection);
        await chefToken.deployed();
    });

    async function uploadMetadataToPinata(metadata) {
        const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';
        const pinataApiKey = process.env.PINATA_API_KEY;
        const pinataSecretApiKey = process.env.PINATA_SECRET_API_KEY;

        try {
            const response = await axios.post(url, metadata, {
                headers: {
                    'Content-Type': 'application/json',
                    'pinata_api_key': '44d96723f9d3f83158e6',
                    'pinata_secret_api_key': '51a3f7459f120070d10997d0be1051a09a353ffaed6872ee11626535850768cb',
                },
                maxBodyLength: 'Infinity'
            });

            console.log("Metadata uploaded to IPFS:", response.data);
            return response.data.IpfsHash;
        } catch (error) {
            console.error("Error uploading metadata to Pinata:", error.response ? error.response.data : error.message);
            throw error;
        }
    }

    it("should mint a new token and set the correct URI", async function () {
        const tokenId = 1;
        const amount = 3;

        // Upload metadata to Pinata
        const ipfsHash = await uploadMetadataToPinata({
            name: "Chef Token #1",
            description: "This is a token for Chef Collection.",
            image: "https://aqua-acute-rat-480.mypinata.cloud/ipfs/QmbHLW186TW74Pxnux7Cjo2nXCsLWnGC8Pu4boKbBsb37y",
            properties: [
                { trait_type: "Rarity", value: "Rare" },
                { trait_type: "Level", value: "5" }
            ],
            tags: [
                { trait_type: "Rarity", value: "Rare" },
                { trait_type: "Level", value: "5" }
            ],
            attributes: [
                { trait_type: "Rarity", value: "Rare" },
                { trait_type: "Level", value: "5" }
            ]
        });

        const tokenURI = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;

        // Mint the token
        await chefToken.mint(owner.address, tokenId, amount, tokenURI, "0x");

        // Check the token balance
        const balance = await chefToken.balanceOf(owner.address, tokenId);
        console.log(balance);
        expect(balance).to.equal(amount);

        // Check the token URI
        const uri = await chefToken.uri(tokenId);
        expect(uri).to.equal(tokenURI);
    });
});
