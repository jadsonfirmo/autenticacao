import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class MensagemService {
  private readonly swal = Swal;

  constructor() {}

  sucesso(titulo: string, texto: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.swal
        .fire({
          title: titulo,
          text: texto,
          icon: 'success',
          allowEscapeKey: false,
          allowOutsideClick: false,
        })
        .then((resposta: SweetAlertResult) => {
          if (
            resposta.value ||
            resposta.dismiss === Swal.DismissReason.backdrop
          ) {
            resolve(true);
          } else {
            reject(new Error('Operação cancelada'));
          }
        })
        .catch((error: any) => {
          reject(
            error instanceof Error ? error : new Error('Erro desconhecido')
          );
        });
    });
  }

  informacao(titulo: string, texto: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.swal
        .fire({
          title: titulo,
          text: texto,
          icon: 'info',
          allowEscapeKey: false,
          allowOutsideClick: false,
        })
        .then((resposta: SweetAlertResult) => {
          if (
            resposta.value ||
            resposta.dismiss === Swal.DismissReason.backdrop
          ) {
            resolve(true);
          } else {
            reject(new Error('Operação cancelada'));
          }
        })
        .catch((error: any) => {
          reject(
            error instanceof Error ? error : new Error('Erro desconhecido')
          );
        });
    });
  }

  aviso(titulo: string, texto: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.swal
        .fire({
          title: titulo,
          html: texto,
          icon: 'warning',
          allowEscapeKey: false,
          allowOutsideClick: false,
          confirmButtonText: 'Sim, tenho certeza.',
          confirmButtonColor: '#4CAF50',
          showCancelButton: true,
          cancelButtonText: 'Não',
        })
        .then((resposta: SweetAlertResult) => {
          if (
            resposta.value ||
            resposta.dismiss === Swal.DismissReason.backdrop
          ) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch((error: any) => {
          reject(
            error instanceof Error ? error : new Error('Erro desconhecido')
          );
        });
    });
  }

  erro(titulo: string, texto: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.swal
        .fire({ title: titulo, text: texto, icon: 'error' })
        .then((resposta: SweetAlertResult) => {
          if (
            resposta.value ||
            resposta.dismiss === Swal.DismissReason.backdrop
          ) {
            resolve(true);
          } else {
            reject(new Error('Operação cancelada'));
          }
        })
        .catch((error: any) => {
          reject(
            error instanceof Error ? error : new Error('Erro desconhecido')
          );
        });
    });
  }

  customizada(config: SweetAlertOptions): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.swal
        .fire(config)
        .then((resposta: SweetAlertResult) => {
          if (resposta.value) {
            resolve(true);
          } else {
            reject(new Error('Operação cancelada'));
          }
        })
        .catch((error: any) => {
          reject(
            error instanceof Error ? error : new Error('Erro desconhecido')
          );
        });
    });
  }
}
