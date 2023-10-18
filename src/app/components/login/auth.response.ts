export class AuthResponse {
    sucesso: boolean;
    accessToken: string;
    refreshToken: string;
    erros: string[];
  
    constructor(
      sucesso: boolean,
      accessToken: string,
      refreshToken: string,
      erros: string[]
    ) {
      this.sucesso = sucesso;
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      this.erros = erros;
    }
  }
  