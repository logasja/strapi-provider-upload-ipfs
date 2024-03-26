"use strict";
const path = require("path");
const kuboRpcClient = require("kubo-rpc-client");
let client;
const index = {
  init({ gatewayUrl, clientOptions }) {
    client = kuboRpcClient.create(clientOptions);
    const upload = async (file) => {
      const ipfsStatus = await client.add({
        path: file.name,
        content: file.stream ?? file.buffer
      });
      console.log("IPFS Status", ipfsStatus);
      file.url = path.join(String(gatewayUrl), String(ipfsStatus.cid));
    };
    return {
      async uploadStream(file) {
        await upload(file);
      },
      async upload(file) {
        await upload(file);
      },
      async delete(file) {
        const command = async (file2) => {
          if (file2.path === void 0) {
            throw Error("No file given.");
          }
          return await client.pin.rm(file2.path);
        };
        await command(file);
      }
    };
  }
};
module.exports = index;
//# sourceMappingURL=index.js.map
