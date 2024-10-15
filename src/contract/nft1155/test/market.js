const { expect } = require("chai");
const axios = require('axios');
const { ethers } = require("hardhat");

describe("Marketplace", function () {
    let chefToken;
    let marketplace, owner, seller, buyer;
    const initialUri = "https://example.com/initial.json";

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

  before(async () => {
    [owner, seller, buyer] = await ethers.getSigners();

    console.log(owner.getAddress());
    console.log(seller.getAddress());
    console.log(buyer.getAddress());
    
    const Collection = {
        name: "Chef Collection",
        symbol: "CHEF",
        newUri: initialUri,
        initialOwner: owner.address,
    };

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

    const ChefToken = await ethers.getContractFactory("ChefToken");
    chefToken = await ChefToken.deploy(Collection);
    await chefToken.deployed();

    await chefToken.connect(owner).mint(seller.address, 1, 10, tokenURI, "0x");
    const axios = require('axios');
    const Marketplace = await ethers.getContractFactory("Marketplace");
    marketplace = await Marketplace.deploy();
    await marketplace.deployed();

    console.log(chefToken.address);
    console.log(marketplace.address);
    
  });

  describe("listItem", function () {
    it("should list an item for sale", async function () {
      await chefToken.connect(seller).setApprovalForAll(marketplace.address, true);
      await expect(marketplace.connect(seller).listItem(chefToken.address, 1, ethers.utils.parseEther("1")))
        .to.emit(marketplace, "ItemListed")
        .withArgs(seller.address, chefToken.address, 1, ethers.utils.parseEther("1"));
      
      const sale = await marketplace.sales(1);
      expect(sale.isListed).to.equal(true);
      expect(sale.seller).to.equal(seller.address);
      expect(sale.price).to.equal(ethers.utils.parseEther("1"));
    });

    it("should fail if token is already listed", async function () {
      await expect(marketplace.connect(seller).listItem(chefToken.address, 1, ethers.utils.parseEther("1")))
        .to.be.revertedWith("Item already listed");
    });
  });

  describe("buyItem", function () {
    it("should allow a buyer to buy a listed item", async function () {
      const initialSellerBalance = await ethers.provider.getBalance(seller.address);

      await expect(
        marketplace.connect(buyer).buyItem(1, { value: ethers.utils.parseEther("1") })
      ).to.emit(marketplace, "ItemSold")
        .withArgs(buyer.address, chefToken.address, 1, ethers.utils.parseEther("1"));

      const sale = await marketplace.sales(1);
      expect(sale.isListed).to.equal(false);

      const newSellerBalance = await ethers.provider.getBalance(seller.address);
      expect(newSellerBalance).to.equal(initialSellerBalance.add(ethers.utils.parseEther("1")));
    });

    it("should fail if item is not for sale", async function () {
      await expect(marketplace.connect(buyer).buyItem(1, { value: ethers.utils.parseEther("1") }))
        .to.be.revertedWith("Item not for sale");
    });

    it("should fail if incorrect price is sent", async function () {
      await marketplace.connect(seller).listItem(chefToken.address, 1, ethers.utils.parseEther("2"));
      await expect(marketplace.connect(buyer).buyItem(1, { value: ethers.utils.parseEther("1") }))
        .to.be.revertedWith("Incorrect price");
    });
  });

  describe("cancelListing", function () {
    it("should allow the seller to cancel a listing", async function () {
      await expect(marketplace.connect(seller).cancelListing(1))
        .to.emit(marketplace, "ListingCanceled")
        .withArgs(seller.address, chefToken.address, 1);

      const sale = await marketplace.sales(1);
      expect(sale.isListed).to.equal(false);
    });

    it("should fail if non-seller tries to cancel the listing", async function () {
      await marketplace.connect(seller).listItem(chefToken.address, 1, ethers.utils.parseEther("2"));
      await expect(marketplace.connect(buyer).cancelListing(1))
        .to.be.revertedWith("You are not the seller");
    });
  });
});
