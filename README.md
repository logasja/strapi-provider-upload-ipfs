# Strapi Provider Upload IPFS

<img alt="strapi-provider-upload-ipfs-storage" src="https://raw.githubusercontent.com/alexbakers/strapi-provider-upload-ipfs-storage/main/public/screenshot.png" />

IPFS provider for Strapi uploads.

## Installation

```bash
# using yarn
yarn add strapi-provider-upload-ipfs

# using npm
npm install strapi-provider-upload-ipfs --save
```

### Providers Configuration

`./config/plugins.js`

```js
module.exports = ({ env }) => ({
  // ...
  upload: {
    config: {
      provider: "strapi-provider-upload-ipfs-storage",
      providerOptions: {
        grpc: env("IPFS_GRPC"),
        http: env("IPFS_HTTP"),
      },
    },
  },
  // ...
});
```

`.env`

```bash
IPFS_GRPC=""
IPFS_HTTP=""
```

### Security Middleware Configuration

Due to the default settings in the Strapi Security Middleware you will need to modify the `contentSecurityPolicy` settings to properly see thumbnail previews in the Media Library. You should replace `strapi::security` string with the object bellow instead as explained in the [middleware configuration](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/required/middlewares.html#loading-order) documentation.

`./config/middlewares.js`

```js
module.exports = [
  // ...
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "dl.airtable.com",
            "*.ipfs.dweb.link", // ipfs.tech
            "*.ipfs.cf-ipfs.com", // cloudflare.com
            "*.ipfs.w3s.link", // web3.storage
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "dl.airtable.com",
            "*.ipfs.dweb.link", // ipfs.tech
            "*.ipfs.cf-ipfs.com", // cloudflare.com
            "*.ipfs.w3s.link", // web3.storage
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  // ...
];
```

## Links

- [Strapi website](https://strapi.io/)
- [IPFS website](https://ipfs.tech/)
- [Filebase website](https://filebase.com/)
- [Pinata website](https://pinata.cloud/)
- [Fleek website](https://fleek.co/)
- [Web3 website](https://web3.storage/)

`(c)` Alex Baker
