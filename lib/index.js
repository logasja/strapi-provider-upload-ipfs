"use strict";

/**
 * Module dependencies
 */

/* eslint-disable no-unused-vars */
// Public node modules.
import { create } from 'ipfs-client'

var client;

module.exports = {
  init(config) {
    client = create({
      grpc: config.grpc,
      http: config.http
    });
    return {
      uploadStream(file) {
        console.log("Uploading", file);
        return new Promise(async (resolve, reject) => {
          try {
            const ipfs_status = await client.add({
              path: file.name,
              content: file,
            });
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
            console.log(ipfs_status);
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
