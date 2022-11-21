import * as fs from "fs";
import { join, dirname } from "path";
import { create } from 'ipfs-client';

import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

import * as dotenv from 'dotenv';
dotenv.config();

fs.readFile(join(__dirname, "..", "public", "banner.png"), async (err, data) => {
  if (err) {
    console.log("🆘 ERROR:", err);
    return;
  }

  if (
    !process.env.IPFS_GRPC &&
    !process.env.IPFS_HTTP 
  ) {
    console.log("🆘 ERROR:", "Create .env file");
    return;
  }

  const client = create({
    grpc: process.env.IPFS_GRPC,
    http: process.env.IPFS_HTTP
  });

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
