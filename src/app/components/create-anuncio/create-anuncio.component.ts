import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

enum Cambio {
  Manual = 'Manual',
  Automatico = 'Automatico',
  Automatizado = 'Automatizado'
}

enum Cor {
  Amarelo = 'Amarelo',
  Vermelho = 'Vermelho',
  Cinza = 'Cinza',
  Preto = 'Preto',
  Verde = 'Verde',
  Roxo = 'Roxo',
  Lilas = 'Lilás'
}

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
  cores: string[] = Object.keys(Cor).map(key => Cor[key as keyof typeof Cor]);
  cambios: string[] = Object.keys(Cambio).map(key => Cambio[key as keyof typeof Cambio]);
  selectedFiles: File[] = [];
  error: any;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    this.anuncioForm = this.fb.group({
      placa: ['', Validators.required],
      idModelo: ['', Validators.required],
      idVersao: ['', Validators.required],
      idTiposCombustiveis: [[], Validators.required],
      portas: ['', Validators.required],
      cambio: ['', Validators.required],
      cor: ['', Validators.required],
      idOpcionais: [[], Validators.required],
      idCaracteristicas: [[], Validators.required],
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
    if (this.anuncioForm.valid) {
        const formData = new FormData();

        Object.keys(this.anuncioForm.value).forEach(key => {
            const value = this.anuncioForm.value[key];

            if (key === 'files') {
                this.selectedFiles.forEach(file => {
                    formData.append('files', file, file.name);
                });
            } else if (Array.isArray(value)) {
                value.forEach((item: any) => {
                    formData.append(key, item);
                });
            } else {
                formData.append(key, value);
            }
        });

        try {
            await this.apiService.postAnuncio(formData).toPromise();
            console.log('Anúncio cadastrado com sucesso!');
            this.router.navigate(['/anuncios']);
        } catch (error) {
            console.error('Erro ao cadastrar anúncio:', error);
            this.error = 'Erro ao cadastrar anúncio';
        }
    } else {
        console.log('Formulário inválido. Verifique os campos.');
    }
  }

  transformFormData(formValue: any): any {
    const formData = new FormData();
  
    for (const key in formValue) {
      if (formValue.hasOwnProperty(key)) {
        if (Array.isArray(formValue[key])) {
          formValue[key].forEach((value: any) => {
            formData.append(key, value);
          });
        } else {
          formData.append(key, formValue[key]);
        }
      }
    }
  
    return formData;
  }

  getModelos(idMarca: number) {
    this.apiService.getModelosByMarca(0, 10, idMarca)
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

  onFilesSelected(event: any) {
    const files: FileList = event.target.files;
    if (this.selectedFiles.length + files.length > 8) {
      alert('Você só pode adicionar até 8 imagens.');
      return;
    }
    this.selectedFiles.push(...Array.from(files));
    this.anuncioForm.patchValue({ files: this.selectedFiles });
  }

  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
    this.anuncioForm.patchValue({ files: this.selectedFiles });
  }

  getImagePreview(file: File): string {
    return URL.createObjectURL(file);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files) {
      this.selectedFiles.push(...Array.from(files));
      this.anuncioForm.patchValue({ files: this.selectedFiles });
    }
  }

  onVersaoChange(event: any) {
    const idVersao = event.target.value;
    this.anuncioForm.patchValue({ idVersao });
    this.getTiposCombustiveis();
    this.getCaracteristicas();
    this.getOpcionais();
  }

  onTiposCombustiveisChange(event: any) {
    const value = event.target.value;
    const checked = event.target.checked;
    const currentValues = this.anuncioForm.get('idTiposCombustiveis')?.value;
  
    if (checked) {
      this.anuncioForm.patchValue({ idTiposCombustiveis: [...currentValues, value] });
    } else {
      this.anuncioForm.patchValue({ idTiposCombustiveis: currentValues.filter((id: string) => id !== value) });
    }
  }
  
  onOpcionaisChange(event: any) {
    const value = event.target.value;
    const checked = event.target.checked;
    const currentValues = this.anuncioForm.get('idOpcionais')?.value;
  
    if (checked) {
      this.anuncioForm.patchValue({ idOpcionais: [...currentValues, value] });
    } else {
      this.anuncioForm.patchValue({ idOpcionais: currentValues.filter((id: string) => id !== value) });
    }
  }
  
  onCaracteristicasChange(event: any) {
    const value = event.target.value;
    const checked = event.target.checked;
    const currentValues = this.anuncioForm.get('idCaracteristicas')?.value;
  
    if (checked) {
      this.anuncioForm.patchValue({ idCaracteristicas: [...currentValues, value] });
    } else {
      this.anuncioForm.patchValue({ idCaracteristicas: currentValues.filter((id: string) => id !== value) });
    }
  }
  

  onFocus() {
    this.getMarcas();
  }

  getMarcas() {
    this.apiService.getMarcas(0, 50)
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

  getOpcionais() {
    this.apiService.getOpcionais(0, 100)
      .subscribe((response) => {
        this.opcionais = response;
      },
        (error) => {
          console.error('Erro ao buscar opcionais:', error);
        })
  }

  getTiposCombustiveis() {
    this.apiService.getTiposCombustiveis(0, 100)
      .subscribe((response) => {
        this.tiposCombustiveis = response;
      },
        (error) => {
          console.error('Erro ao buscar tipos de combustiveis:', error);
        })
  }

  getCaracteristicas() {
    this.apiService.getCaracteristicas(0, 100)
      .subscribe((response) => {
        this.caracteristicas = response;
      },
        (error) => {
          console.error('Erro ao buscar características:', error);
        })
  }

  closeAlert() {
    this.error = null;
  }
  
}
