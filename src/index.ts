'use strict';

/**
 * Module dependencies
 */

// Public node modules.
import type { ReadStream } from 'node:fs';
import { join } from 'path';
import { type IPFSHTTPClient, type Options, type CID } from 'kubo-rpc-client';

export interface File {
  name: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: Record<string, unknown>;
  hash: string;
  ext?: string;
  mime: string;
  size: number;
  sizeInBytes: number;
  url: string;
  previewUrl?: string;
  path?: string;
  provider?: string;
  provider_metadata?: Record<string, unknown>;
  stream?: ReadStream;
  buffer?: Buffer;
}

export interface InitOptions {
  clientOptions?: Options;
  gatewayUrl?: string;
}

var client: IPFSHTTPClient;

export default {
  init({ gatewayUrl, clientOptions }: InitOptions) {
    import('kubo-rpc-client').then(({create}) => {
      client = create(clientOptions);

      console.debug(client);
    });

    const upload = async (file: File): Promise<void> => {
      const ipfsStatus = await client.add({
        path: file.name,
        content: file.stream ?? file.buffer,
      });
      console.log('IPFS Status', ipfsStatus);
      file.url = join(String(gatewayUrl), String(ipfsStatus.cid));
      console.log("Added:", file.url);
    };


    return {
      async uploadStream(file: File) {
        try {
          await upload(file);            
        } catch (error) {
          console.error(error);
          console.error(clientOptions);
        }
      },
      async upload(file: File) {
        try {
          await upload(file);            
        } catch (error) {
          console.error(error);
          console.error(clientOptions);
        }
      },
      async delete(file: File) {
        const command = async (file: File): Promise<CID> => {
          if (file.path === undefined) {
            throw Error('No file given.');
          }
          return await client.pin.rm(file.path);
        };
        await command(file);
      },
    };
  },
};
