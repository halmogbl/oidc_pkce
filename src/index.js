import { encode as base64encode } from "base64-arraybuffer";


// this function generate code challenge used in OIDC code flow with PKCE
export const generateCodeChallenge = async (codeVerifier, method)=> {
    if (method === 'plain') {
      return codeVerifier;
    } else if (method === 'S256') {
        const encoder = new TextEncoder();
        const data = encoder.encode(codeVerifier);
        const digest = await window.crypto.subtle.digest("SHA-256", data);
        const base64Digest = base64encode(digest);
        // you can extract this replacing code to a function
        return base64Digest
          .replace(/\+/g, "-")
          .replace(/\//g, "_")
          .replace(/=/g, "");
    } else {
      throw new Error("code challenge method must be 'plain' or 'S256'.");
    }
  }
  
// this function generate random string
export const getRandomString =(length) =>{
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
// this function generate OIDC authentication url and use all the functions above
export const generatePKCEandNONCEandState = async (useNONCE = true,useSTATE = true, usePKCE = true, codeChallengeMethod='S256',codeVerifierLength=64,stateLength=32,nonceLength=32) => {
    let params = {}
    if (useSTATE) {
      const state = getRandomString(stateLength);
      params = { ...params, state: state };
    }

    if (useNONCE) {
      const nonce = getRandomString(nonceLength);
      params = { ...params, nonce: nonce };
    }
  
    if (usePKCE) {
      // Check that codeVerifierLength is between the min and max length
      if (!(43 <= codeVerifierLength <= 128)) {
        throw new Error('codeVerifierLength must be between 43 and 128');
      }
      // Generate codeVerifier and codeChallenge pair
      let codeVerifier = getRandomString(codeVerifierLength);
      const codeChallenge = await generateCodeChallenge(codeVerifier, codeChallengeMethod);
      // Append codeChallenge to authentication request parameters
      params = { ...params, code_verifier: codeVerifier, code_challenge: codeChallenge, code_challenge_method: codeChallengeMethod };
    }

    return params
}

