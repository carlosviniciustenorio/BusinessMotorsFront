export class Anuncios {
    constructor(
      public id: string,
      public modelo: Modelo,
      public cambio: number,
      public cor: number,
      public km: string,
      public estado: string,
      public preco: number,
      public usuarioId: string,
      public exibirTelefone: boolean,
      public exibirEmail: boolean,
      public imagem: Imagem
    ) {}
  }
  
  export class Modelo {
    constructor(
      public id: number,
      public descricao: string,
      public anoModelo: number,
      public anoFabricacao: number,
      public marca: Marca,
      public versao: Versao
    ) {}
  }
  
  export class Marca {
    constructor(
      public id: number,
      public descricao: string
    ) {}
  }
  
  export class Versao {
    constructor(
      public id: number,
      public descricao: string
    ) {}
  }
  
  export class Imagem {
    constructor(
      public arn: string
    ) {}
  }