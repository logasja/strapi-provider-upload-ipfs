'use strict';

/**
 * Module dependencies
 */

// Public node modules.
import type { ReadStream } from 'node:fs';
import { join } from 'path';
import { type IPFSHTTPClient, create, type Options, type CID } from 'kubo-rpc-client';

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

let client: IPFSHTTPClient;

export interface InitOptions {
  clientOptions?: Options;
  gatewayUrl?: string;
}

export default {
  init({ gatewayUrl, clientOptions }: InitOptions) {
    client = create(clientOptions);

    console.debug(client);

    const upload = async (file: File): Promise<void> => {
      const ipfsStatus = await client.add({
        path: file.name,
        content: file.stream ?? file.buffer,
      });
      console.log('IPFS Status', ipfsStatus);
      file.url = join(String(gatewayUrl), String(ipfsStatus.cid));
    };

    return {
      async uploadStream(file: File) {
        await upload(file);
      },
      async upload(file: File) {
        await upload(file);
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
