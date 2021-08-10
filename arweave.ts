import Arweave from "arweave";
// import { PermPicMeta } from "./type/fileMeta";
import { permPicUser } from "./type/base";
import Transaction from "arweave/node/lib/transaction";
import { TransactionUploader } from "arweave/node/lib/transaction-uploader";
import { PermPicVersion } from "./setting";
import { JWKInterface } from "arweave/node/lib/wallet";

export const arweave = Arweave.init({
  host: "arweave.net", // Arweave Gateway
  //host: 'arweave.dev', // Arweave Dev Gateway
  port: 443,
  protocol: "https",
  timeout: 600000,
});

export async function preparePermPicTransaction(
  user: permPicUser,
  fileData: any,
  metaData: any
): Promise<Transaction | null> {
  try {
    const transaction = await arweave.createTransaction(
      {
        data: fileData,
      },
      JSON.parse(user.walletPrivateKey)
    );

    transaction.addTag("PermPicVersion", PermPicVersion);

    for (const key in metaData) {
      if (Object.prototype.hasOwnProperty.call(metaData, key)) {
        transaction.addTag(key, metaData[key]);
      }
    }

    await arweave.transactions.sign(
      transaction,
      JSON.parse(user.walletPrivateKey)
    );

    return transaction;
  } catch (error) {
    console.log(`error: preparePermPicTransaction ${error}`);
    return null;
  }
}

export async function PermPicGetUploader(
  transaction: Transaction
): Promise<TransactionUploader> {
  let uploader = await arweave.transactions.getUploader(transaction);
  return uploader;
}

// Gets a public key for a given JWK
export async function getAddressForWallet(
  walletPrivateKey: JWKInterface
): Promise<string> {
  return arweave.wallets.jwkToAddress(walletPrivateKey);
}
