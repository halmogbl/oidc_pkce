declare module 'oidc_pkce' {
    export function generateCodeChallenge(
      codeVerifier: string,
      method: 'plain' | 'S256'
    ): Promise<string>;
  
    export function getRandomString(length: number): string;
  
    export function generatePKCEandNONCEandState(
      useNONCE?: boolean,
      useSTATE?: boolean,
      usePKCE?: boolean,
      codeChallengeMethod?: 'plain' | 'S256',
      codeVerifierLength?: number,
      stateLength?: number,
      nonceLength?: number
    ): Promise<object>;
  }
  