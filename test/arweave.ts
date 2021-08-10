import { it } from "mocha";
import * as arweave from '../arweave';
import walletPrivateKey from "../../arweave-key-W3ESKFiiyjJiUhfkeLShjHt7kKKwGfgeGGuRm25Ui_0.json";

it("#async with done", (done) => {
  (async function () {
    try { 
      const metaData = {
        "content-Type": "text/html",
      };
      let r = await arweave.preparePermPicTransaction(
        {
          walletPrivateKey: walletPrivateKey.toString(),
          address: await arweave.getAddressForWallet(walletPrivateKey),
        },
        "123",
        metaData
      );
      console.log(r);
      done();
    } catch (err) {
      done(err);
    }
  })();
});
