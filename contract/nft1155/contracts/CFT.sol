// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract ChefToken is ERC1155, Ownable, ERC1155Pausable, ERC1155Burnable, ERC1155Supply {
    string public name;
    string public symbol;

    mapping(uint256 => string) private _tokenURIs;

    struct Collection {
        string name;
        string symbol;
        string newUri;
        address initialOwner;
    }

    constructor(Collection memory params) ERC1155(params.newUri) Ownable(params.initialOwner) {
        _setURI(params.newUri);
        name = params.name;
        symbol = params.symbol;
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address account, uint256 id, uint256 amount, string memory tokenURI, bytes memory data)
        public
        onlyOwner
    {
        require(amount > 0, "Amount must be greater than zero");
        _mint(account, id, amount, data);
        _setTokenURI(id, tokenURI);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, string[] memory tokenURIs, bytes memory data)
        public
        onlyOwner
    {
        require(ids.length == amounts.length && ids.length == tokenURIs.length, "Mismatched arrays");
        _mintBatch(to, ids, amounts, data);
        
        // Set the URIs for each minted token
        for (uint256 i = 0; i < ids.length; i++) {
            _setTokenURI(ids[i], tokenURIs[i]);
        }
    }

    function _setTokenURI(uint256 tokenId, string memory tokenURI) internal {
        require(bytes(tokenURI).length > 0, "Token URI must not be empty");
        _tokenURIs[tokenId] = tokenURI;
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        return _tokenURIs[tokenId];
    }

    function approveMarketplace(address marketplaceAddress, bool approved) public {
        setApprovalForAll(marketplaceAddress, approved);
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        payable(owner()).transfer(balance);
    }

    function _update(address from, address to, uint256[] memory ids, uint256[] memory values)
        internal
        override(ERC1155, ERC1155Pausable, ERC1155Supply)
    {
        super._update(from, to, ids, values);
    }
}
