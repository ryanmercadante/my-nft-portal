//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

// We need to import the helper functions from the contract that we copy/pasted.
import {Base64} from "./libraries/Base64.sol";

// We inherit the contract we imported. This means we'll have access
// to the inherited contract's methods.
contract MyEpicNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // This is the SVG code. All we need to change is the word that's displayed.
    // Everything else stays the same. So, we make a baseSvg variable here that
    // all our NFTs can use.
    string baseSvg =
        "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill: white; font-family: serif; font-size: 24px; }</style><rect width='100%' height='100%' fill='black' /><text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>";

    // Create three arrays, each with their own theme of random words.
    string[] firstWords = [
        "Red",
        "Green",
        "Blue",
        "Purple",
        "Orange",
        "Yellow",
        "Cyan",
        "Rainbow",
        "Gold",
        "Silver",
        "Brown",
        "Pink",
        "Coral",
        "Violet",
        "Peach"
    ];
    string[] secondWords = [
        "Running",
        "Jumping",
        "Screaming",
        "Falling",
        "Flying",
        "Vomitting",
        "Feeling",
        "Bursting",
        "Looking",
        "Vaporizing",
        "Blasting",
        "Taunting",
        "Poking",
        "Drinking",
        "Smacking"
    ];
    string[] thirdWords = [
        "Violin",
        "Clarinet",
        "Cello",
        "Trumpet",
        "Drums",
        "Saxophone",
        "Piccolo",
        "Guitar",
        "Oboe",
        "Trumbone",
        "Tuba",
        "Piano",
        "Harp",
        "Xylophone",
        "Flute"
    ];

    event NewEpicNFTMinted(address sender, uint256 tokenId);

    // We need to pass the name of our NFTs token and it's symbol.
    constructor() ERC721("SquareNFT", "SQUARE") {
        console.log("This is my NFT contract. Woah!");
    }

    // Function to randomly pick a word from an array.
    function pickRandomWord(
        uint256 tokenId,
        string[] memory wordArray,
        string memory word
    ) public pure returns (string memory) {
        // Seed the random generator.
        uint256 rand = random(
            string(abi.encodePacked(word, Strings.toString(tokenId)))
        );
        rand = rand % wordArray.length;
        return wordArray[rand];
    }

    function random(string memory input) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(input)));
    }

    // A function our user will hit to get their NFT.
    function makeAnEpicNFT() public {
        // Get the current tokenId, this starts at 0.
        uint256 newItemId = _tokenIds.current();

        // Randomly grab one word from each of the three arrays.
        string memory first = pickRandomWord(
            newItemId,
            firstWords,
            "FIRST_WORD"
        );
        string memory second = pickRandomWord(
            newItemId,
            secondWords,
            "SECOND_WORD"
        );
        string memory third = pickRandomWord(
            newItemId,
            thirdWords,
            "THIRD_WORD"
        );
        string memory combinedWord = string(
            abi.encodePacked(first, second, third)
        );

        // Concatenate them all together and then close the <text> and <svg> tags.
        string memory finalSvg = string(
            abi.encodePacked(baseSvg, combinedWord, "</text></svg>")
        );

        // Get all the JSON metadata in place and base64 encode it.
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        combinedWord,
                        '", "description": "A highly acclaimed collection of squares.", "image": "data:image/svg+xml;base64,',
                        Base64.encode(bytes(finalSvg)),
                        '"}'
                    )
                )
            )
        );

        // Prepend data:application/json;base64, to our data.
        string memory finalTokenUri = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        console.log("\n--------------------");
        console.log(finalTokenUri);
        console.log("--------------------\n");

        // Mint the NFT to the sender using msg.sender.
        _safeMint(msg.sender, newItemId);

        // Set the NFTs data.
        _setTokenURI(newItemId, finalTokenUri);

        // Increment the counter for when the next NFT is minted.
        _tokenIds.increment();
        console.log(
            "An NFT w/ ID %s has been minted to %s",
            newItemId,
            msg.sender
        );

        emit NewEpicNFTMinted(msg.sender, newItemId);
    }
}
