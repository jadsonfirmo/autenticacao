import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensagemService } from 'app/services/mensagem.service';
import { UrlService } from 'app/services/url.service';

import { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ErroService {
  titulo = 'Atenção!';

  constructor(
    private urlService: UrlService,
    private readonly mensagemService: MensagemService
  ) {}

  tratarErro(erro: HttpErrorResponse, url: string = ''): void {
    const ERRO_500 = 500;
    const ERRO_400 = 400;
    const ERRO_401 = 401;

    if (erro != null) {
      switch (erro.status) {
        case ERRO_500:
          this.exibirAlerta('error', this.titulo, erro.error.Message);
          break;

        case ERRO_400:
          this.exibirAlerta('info', this.titulo, erro.error.Message);
          break;

        case ERRO_401: {
          /*
           * Requisições assíncronas que não atualizam a interface em algumas situações a API retorna 401
           * em um formato onde o objeto erro não é criado sendo assim será disparada mensagem padrão para usuários não autenticados
           * permitindo que o redirecionamento para tela de login funcione
           */
          if (erro.error) {
            this.exibirAlerta('info', this.titulo, erro.error.Message);
          } else {
            this.exibirAlerta(
              'info',
              this.titulo,
              this.criarNaoAutorizado().error.Message
            );
          }

          this.urlService.irParaLoginComRetorno(url);

          break;
        }

        default:
          this.exibirAlerta(
            'error',
            this.titulo,
            erro.error?.Message ?? erro.message
          );
      }
    }
  }

  exibirAlerta(tipo: SweetAlertIcon, titulo: string, texto: string): void {
    this.mensagemService.customizada({
      icon: tipo,
      title: titulo,
      html: texto,
    });
  }

  criarNaoAutorizado(): HttpErrorResponse {
    return new HttpErrorResponse({
      status: 401,
      statusText: 'Não autorizado',
      error: JSON.parse(
        '{ "Message" : "O usuário não está autorizado no sistema." }'
      ),
    });
  }

  emitirNaoAutorizado(url = ''): void {
    this.tratarErro(this.criarNaoAutorizado(), url);
  }
}
