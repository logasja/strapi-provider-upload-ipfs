const fs = require('fs');
const { join } = require('path');

require("dotenv").config();

fs.readFile(join(__dirname, "..", "public", "banner.png"), async (err, data) => {
  const ipfs = await import('kubo-rpc-client');
  if (err) {
    console.log("🆘 ERROR:", err);
    return;
  }

  if (
    !process.env.IPFS_GRPC &&
    !process.env.IPFS_API_HTTP 
  ) {
    console.log("🆘 ERROR:", "Create .env file");
    return;
  }

  const client = ipfs.create({
    grpc: process.env.IPFS_GRPC,
    http: process.env.IPFS_API_HTTP
  });

  console.log(client);

  try {
    const ipfs_status = await client.add(
      {
        content: data,
      }
    );
    console.log("✅ IPFS_ADD:", ipfs_status);
    await client.pin.rm(
        ipfs_status.path
    );
  } catch (err) {
    console.log("🆘 IPFS_ADD:", err);
  }
});
