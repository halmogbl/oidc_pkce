# Overview


OIDC PKCE is a package for generating PKCE parameters, nonce, and state for OpenID Connect authentication. It simplifies secure authentication flows in web applications.

# Installation

using npm
```shell
npm install oidc_pkce
```

or using yarn

```shell
yarn add oidc_pkce
```

```javascript
import { generatePKCEandNONCEandState } from 'oidc_pkce';

// Generate PKCE parameters, nonce, and state
const params = await generatePKCEandNONCEandState();
console.log(params);
```


# API
`generatePKCEandNONCEandState(useNONCE?, useSTATE?, usePKCE?, codeChallengeMethod?, codeVerifierLength?, stateLength?, nonceLength?)`

Generates PKCE parameters, nonce, and state for OpenID Connect authentication.

- useNONCE (optional, default: true): Whether to include a nonce in the generated parameters.
- useSTATE (optional, default: true): Whether to include a state in the generated parameters.
- usePKCE (optional, default: true): Whether to include PKCE parameters (code_verifier and code_challenge) in the generated parameters.
- codeChallengeMethod (optional, default: 'S256'): The method used to generate the code_challenge. Supported values: 'plain' or 'S256'.
- codeVerifierLength (optional, default: 64): The length of the code_verifier to generate.
- stateLength (optional, default: 32): The length of the state to generate.
- nonceLength (optional, default: 32): The length of the nonce to generate.
- Returns an object containing the generated parameters.

# License

This package is licensed under the MIT License. See the `LICENSE` file for details.

