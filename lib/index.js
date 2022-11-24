"use strict";

/**
 * Module dependencies
 */

/* eslint-disable no-unused-vars */
// Public node modules.

var client;

module.exports = {
  init(config) {
    console.log("Initializing client", config);
    import('ipfs-client').then(({ create }) => {
      client = create({
        grpc: config.grpc,
        http: config.api_http
      });
      console.log("Created Client", client);
      return client.id();
    }).then((id) => {
      console.log("Connected to ", id);
    });
    return {
      uploadStream(file) {
        console.log("Uploading", file);
        return new Promise(async (resolve, reject) => {
          try {
            const ipfs_status = await client.add({
              path: file.name,
              content: file.stream,
            });
            console.log("IPFS Status", ipfs_status);
            file.url = ipfs_status.path;
            resolve();
          } catch (e) {
            reject(e);
          }
        });
      },
      upload(file) {
        console.log("Uploading", file);
        return new Promise(async (resolve, reject) => {
          try {
            const ipfs_status = await client.add({
              path: file.name,
              content: file,
            });
            console.log("IPFS Status", ipfs_status);
            file.url = ipfs_status.path;
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
