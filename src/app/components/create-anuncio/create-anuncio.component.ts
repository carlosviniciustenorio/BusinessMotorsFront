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
}
