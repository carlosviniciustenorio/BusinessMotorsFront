import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-create-anuncio',
  templateUrl: './create-anuncio.component.html',
  styleUrls: ['./create-anuncio.component.css']
})
export class CreateAnuncioComponent {
  anuncioForm: FormGroup;
  marcas: any[] = [];
  marca: any | null = null;
  modelos: any[] = [];
  versoes: any[] = [];
  tiposCombustiveis: any[] = [];
  opcionais: any[] = [];
  caracteristicas: any[] = [];

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    this.anuncioForm = this.fb.group({
      placa: ['', Validators.required],
      idModelo: ['', Validators.required],
      idVersao: ['', Validators.required],
      idTiposCombustiveis: ['', Validators.required],
      portas: ['', Validators.required],
      cambio: ['', Validators.required],
      cor: ['', Validators.required],
      idOpcionais: ['', Validators.required],
      idCaracteristicas: ['', Validators.required],
      km: ['', Validators.required],
      estado: ['', Validators.required],
      preco: ['', Validators.required],
      exibirTelefone: [false],
      exibirEmail: [false],
      anoFabricacao: ['', Validators.required],
      anoVeiculo: ['', Validators.required],
      files: [null, Validators.required]
    });
  }

  async onSubmit() {
    const formData = new FormData();
    Object.keys(this.anuncioForm.value).forEach(key => {
      formData.append(key, this.anuncioForm.value[key]);
    });

    await this.apiService.postAnuncio(formData);
  }

  getModelos(idMarca: number) {
    this.apiService.getModelosByMarca(0,10,idMarca)
    .subscribe(
      (response) => {
        this.modelos = response;
      },
      (error) => {
        console.error('Erro ao buscar modelos:', error);
      }
    );
  }

  onModeloChange(event: any) {
    const idModelo = event.target.value;
    this.anuncioForm.patchValue({ idModelo });
    const modeloSelecionado = this.modelos.find(m => m.id === Number(idModelo));
    this.versoes = modeloSelecionado ? modeloSelecionado.versoes : [];
  }

  onVersaoChange(event: any){
    const idVersao = event.target.value;
    this.anuncioForm.patchValue({ idVersao });
    this.getTiposCombustiveis();
    this.getCaracteristicas();
    this.getOpcionais();
  }

  onFocus() {
    this.getMarcas();
  }

  getMarcas() {
      this.apiService.getMarcas(0,50)
      .subscribe(
        (response) => {
          this.marcas = response;
        },
        (error) => {
          console.error('Erro ao buscar marcas:', error);
        }
      );
    }

  selectMarca(marca: any) {
    this.marca = marca;
    this.marcas = [];
    this.getModelos(this.marca.id);
  }

  getOpcionais(){
    this.apiService.getOpcionais(0, 100)
    .subscribe((response) => {
      this.opcionais = response;
    },
    (error) => {
      console.error('Erro ao buscar opcionais:', error);
    })
  }

  getTiposCombustiveis(){
    this.apiService.getTiposCombustiveis(0, 100)
    .subscribe((response) => {
      this.tiposCombustiveis = response;
    },
    (error) => {
      console.error('Erro ao buscar tipos de combustiveis:', error);
    })
  }

  getCaracteristicas(){
    this.apiService.getCaracteristicas(0, 100)
    .subscribe((response) => {
      this.caracteristicas = response;
    },
    (error) => {
      console.error('Erro ao buscar características:', error);
    })
  }
}
