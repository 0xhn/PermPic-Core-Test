import Arweave from "arweave";

export const arweave = Arweave.init({
  host: "arweave.net", // Arweave Gateway
  //host: 'arweave.dev', // Arweave Dev Gateway
  port: 443,
  protocol: "https",
  timeout: 600000,
});

export async function preparePermPicTransaction(JsonData: any, walletKey: string) {
  let transaction: any;
  transaction = await arweave.createTransaction(
    {
      data: JsonData.data,
    },
  );

  transaction.addTag("Content-Type", "text/html");
  transaction.addTag("key2", "value2");

  await arweave.transactions.sign(transaction, key);
}
