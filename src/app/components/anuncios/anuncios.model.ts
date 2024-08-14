export class Anuncios {
    constructor(
      public id: string,
      public modelo: Modelo,
      public cambio: number,
      public cor: number,
      public km: string,
      public estado: string,
      public cidade: string,
      public preco: number,
      public usuarioId: string,
      public exibirTelefone: boolean,
      public exibirEmail: boolean,
      public imagem: Imagem,
      public anoFabricacao: number,
      public anoVeiculo: number
    ) {}
  }
  
  export class Modelo {
    constructor(
      public id: number,
      public descricao: string,
      public marca: Marca,
      public versoes: Versao[]
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