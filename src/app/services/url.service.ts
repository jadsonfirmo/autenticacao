import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  constructor(
    @Inject(DOCUMENT) private readonly document,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  recuperarUrlCorrente(): string {
    return this.document.location.href;
  }

  irParaLoginComRetorno(retorno = ''): void {
    const retornoUrl = this.convertURL(retorno);

    this.router.navigate(['/login'], { queryParams: { retornoUrl } });
  }

  convertURL(url: string): string {
    const urlObj = new URL(url);
    const params = urlObj.searchParams;

    // Constrói a URL de destino com os parâmetros no formato necessário
    let destino = `${urlObj.origin}${urlObj.pathname}?`;

    params.forEach((value, key) => {
      destino += `${key}=${value}&`;
    });

    // Remove o último "&" extra
    destino = destino.slice(0, -1);

    // Codifica a URL de destino
    return encodeURIComponent(destino);
  }

  irPara(url: string): void {
    this.document.location.href = url;
  }

  recuperarQueryParams(): any {
    return this.activateRoute.snapshot.queryParams;
  }

  sincronizar(parametros: any): string {
    const query = this.recuperarQueryParams();

    const request = { ...query, ...parametros };

    this.atualizarUrl(request);

    return request;
  }

  atualizarUrl(request: any): void {
    this.router.navigate([], {
      relativeTo: this.activateRoute,
      queryParams: request,
    });
  }
}
