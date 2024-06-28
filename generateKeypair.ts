import { Keypair } from "@solana/web3.js";

let keypair = Keypair.generate()
console.log(keypair.secretKey)
console.log(keypair.publicKey)