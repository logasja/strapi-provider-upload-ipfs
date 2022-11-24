"use strict";

/**
 * Module dependencies
 */

/* eslint-disable no-unused-vars */
// Public node modules.
const { join } = require('path');


var client;

module.exports = {
  init(config) {
    import('ipfs-client').then(({ create }) => {
      client = create({
        grpc: String(config.grpc), // 'http://ipfs:5003',
        http: String(config.http) // 'http://ipfs:5001'
      });
      // console.log("Created Client", client);
    });
    return {
      uploadStream(file) {
        // console.log("Uploading", file);
        return new Promise(async (resolve, reject) => {
          try {
            const ipfs_status = await client.add({
              path: file.name,
              content: file.stream,
            });
            console.log("IPFS Status", ipfs_status);
            file.url = join(String(config.gateway), String(ipfs_status.cid));
            resolve();
          } catch (e) {
            reject(e);
          }
        });
      },
      upload(file) {
        // console.log("Uploading", file);
        return new Promise(async (resolve, reject) => {
          try {
            const ipfs_status = await client.add({
              path: file.name,
              content: file.buffer,
            });
            console.log("IPFS Status", ipfs_status);
            file.url = join(String(config.gateway), String(ipfs_status.cid));
            resolve();
          } catch (e) {
            reject(e);
          }
        });
      },
      delete(file) {
        console.log("Deleting", file);
        return new Promise(async (resolve, reject) => {
          try {
            await client.pin.rm(file.path);
            resolve();
          } catch (e) {
            reject(e);
          }
        });
      },
    };
  },
};
