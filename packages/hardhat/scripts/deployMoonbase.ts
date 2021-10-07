import { ethers } from "hardhat";

async function main() {
  const nftContractFactory = await ethers.getContractFactory("MyEpicNFT");
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);

  // Call the function.
  let tx = await nftContract.makeAnEpicNFT();
  // Wait for it to be mined.
  await tx.wait();
  console.log("Minted NFT #1");

  // Mint another NFT for fun.
  tx = await nftContract.makeAnEpicNFT();
  // Wait for it to be mined.
  await tx.wait();
  console.log("Minted NFT #2");
}

async function runMain() {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

runMain();
