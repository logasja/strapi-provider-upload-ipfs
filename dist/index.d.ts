/// <reference types="node" />
/// <reference types="node" />
/**
 * Module dependencies
 */
import type { ReadStream } from 'node:fs';
import { type Options } from 'kubo-rpc-client';
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
declare const _default: {
    init({ gatewayUrl, clientOptions }: InitOptions): {
        uploadStream(file: File): Promise<void>;
        upload(file: File): Promise<void>;
        delete(file: File): Promise<void>;
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map