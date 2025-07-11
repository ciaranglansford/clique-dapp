import { ethers } from 'ethers';

/**
 * Deploys a contract using Ethers.js v6.
 * @param signer Ethers.js Signer (must be connected to wallet)
 * @param abi Contract ABI
 * @param bytecode Contract bytecode
 * @param constructorArgs Arguments for the contract constructor
 * @returns The deployed contract address
 */
export async function deployContract(
  signer: ethers.Signer,
  abi: ethers.InterfaceAbi,
  bytecode: string,
  ...constructorArgs: any[]
): Promise<string> {
  const factory = new ethers.ContractFactory(abi, bytecode, signer);
  const contract = await factory.deploy(...constructorArgs);
  await contract.waitForDeployment();
  return contract.target as string;
} 