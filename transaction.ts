import { PublicKey, Transaction, LAMPORTS_PER_SOL, SystemProgram, sendAndConfirmRawTransaction, Connection, sendAndConfirmTransaction } from "@solana/web3.js";
import "dotenv/config"
import { getKeypairFromEnvironment, airdropIfRequired } from "@solana-developers/helpers";

const transaction = new Transaction();
// const recipient = "CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN";
const amount = 1;
const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");
const sender = senderKeypair.publicKey;
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

console.log( `✅ Loaded our own keypair, the destination public key, and connected to Solana`)

const recipient = process.argv[2] || null;

if (!recipient) {
  console.log(`Please provide a public key to send to`);
  process.exit(1);
}
const toPubkey = new PublicKey(recipient);

console.log(sender)
const sendSolInstruction = SystemProgram.transfer({
        fromPubkey: sender,
        toPubkey,
        lamports: amount,
    })

transaction.add(sendSolInstruction)

/* await airdropIfRequired(
    connection,
    sender,
    1 * LAMPORTS_PER_SOL,
    0.5 * LAMPORTS_PER_SOL,
);
*/
const signature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [senderKeypair]
)

console.log(
    `💸 Finished! Sent ${amount} to the address ${toPubkey}. `
  );
  console.log(`Transaction signature is ${signature}!`);