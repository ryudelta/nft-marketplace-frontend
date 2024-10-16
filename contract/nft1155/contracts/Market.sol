// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

contract Marketplace {
    struct Sale {
        address seller;
        uint256 tokenId;
        uint256 price;
        address nftContract;
        uint256 expirationTime;
        bool isListed;
    }

    struct Bid {
        address bidder;
        uint256 amount;
        uint256 expirationTime;
        bool active;
    }

    mapping(uint256 => Sale) public sales;
    mapping(uint256 => Bid) public bids;

    event ItemListed(address indexed seller, address indexed nftContract, uint256 tokenId, uint256 price, uint256 expirationTime);
    event ItemSold(address indexed buyer, address indexed nftContract, uint256 tokenId, uint256 price);
    event ListingCanceled(address indexed seller, address indexed nftContract, uint256 tokenId);
    event BidPlaced(address indexed bidder, uint256 tokenId, uint256 amount, uint256 expirationTime);
    event BidAccepted(address indexed seller, address indexed bidder, uint256 tokenId, uint256 amount);
    event BidCanceled(address indexed bidder, uint256 tokenId);

    function listItem(address nftContract, uint256 tokenId, uint256 price, uint256 duration) external {
        require(IERC1155(nftContract).balanceOf(msg.sender, tokenId) > 0, "You don't own this token");
        require(!sales[tokenId].isListed, "Item already listed");

        uint256 expirationTime = block.timestamp + duration;
        sales[tokenId] = Sale(msg.sender, tokenId, price, nftContract, expirationTime, true);

        emit ItemListed(msg.sender, nftContract, tokenId, price, expirationTime);
    }

    function buyItem(uint256 tokenId) external payable {
        Sale storage sale = sales[tokenId];
        _updateListingStatus(tokenId);

        require(sale.isListed, "Item not for sale");
        require(msg.value == sale.price, "Incorrect price");

        IERC1155(sale.nftContract).safeTransferFrom(sale.seller, msg.sender, tokenId, 1, "");
        sale.isListed = false;
        payable(sale.seller).transfer(msg.value);

        emit ItemSold(msg.sender, sale.nftContract, tokenId, sale.price);
    }

    function cancelListing(uint256 tokenId) external {
        Sale storage sale = sales[tokenId];
        _updateListingStatus(tokenId);

        require(sale.isListed, "Item is not listed");
        require(sale.seller == msg.sender, "You are not the seller");

        sale.isListed = false;
        emit ListingCanceled(msg.sender, sale.nftContract, tokenId);
    }

    function placeBid(uint256 tokenId, uint256 duration) external payable {
        Sale storage sale = sales[tokenId];
        _updateListingStatus(tokenId);
        require(sale.isListed, "Item is not for sale");
        
        Bid storage currentBid = bids[tokenId];
        _updateBidStatus(tokenId);
        require(msg.value > 0, "Bid amount must be greater than 0");
        require(msg.value > currentBid.amount, "Bid amount must be higher than the current bid");

        if (currentBid.active) {
            payable(currentBid.bidder).transfer(currentBid.amount);
        }

        uint256 expirationTime = block.timestamp + duration;
        bids[tokenId] = Bid(msg.sender, msg.value, expirationTime, true);

        emit BidPlaced(msg.sender, tokenId, msg.value, expirationTime);
    }

    function acceptBid(uint256 tokenId) external {
        Sale storage sale = sales[tokenId];
        _updateListingStatus(tokenId);
        Bid storage currentBid = bids[tokenId];
        _updateBidStatus(tokenId);

        require(sale.isListed, "Item is not for sale");
        require(sale.seller == msg.sender, "You are not the seller");
        require(currentBid.active, "No active bid to accept");

        IERC1155(sale.nftContract).safeTransferFrom(msg.sender, currentBid.bidder, tokenId, 1, "");

        payable(msg.sender).transfer(currentBid.amount);

        sale.isListed = false;
        currentBid.active = false;

        emit BidAccepted(msg.sender, currentBid.bidder, tokenId, currentBid.amount);
        emit ItemSold(msg.sender, sale.nftContract, tokenId, currentBid.amount);
    }

    function cancelBid(uint256 tokenId) external {
        Bid storage currentBid = bids[tokenId];
        _updateBidStatus(tokenId);

        require(currentBid.active, "No active bid to cancel");
        require(currentBid.bidder == msg.sender, "You are not the bidder");

        payable(msg.sender).transfer(currentBid.amount);
        currentBid.active = false;

        emit BidCanceled(msg.sender, tokenId);
    }

    function _updateListingStatus(uint256 tokenId) internal {
        Sale storage sale = sales[tokenId];
        if (sale.isListed && block.timestamp > sale.expirationTime) {
            sale.isListed = false;
        }
    }

    function _updateBidStatus(uint256 tokenId) internal {
        Bid storage currentBid = bids[tokenId];
        if (currentBid.active && block.timestamp > currentBid.expirationTime) {
            currentBid.active = false;
        }
    }
}
