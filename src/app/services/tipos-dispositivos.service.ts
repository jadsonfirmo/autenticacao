import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints,
} from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const DESKTOP = 'desktop';
const MOBILE = 'mobile';
const TABLET = 'tablet';

@Injectable({
  providedIn: 'root',
})
export class TiposDispositivosService {
  constructor(private readonly breakpointObserver: BreakpointObserver) {}

  getDispositivoTipo(): Observable<string> {
    const opcoes = [Breakpoints.Handset, Breakpoints.Tablet, Breakpoints.Web];

    return this.breakpointObserver
      .observe(opcoes)
      .pipe(map((state: BreakpointState) => this.mapDispositivoTipo(state)));
  }

  private mapDispositivoTipo(state: BreakpointState): string {
    const mobile =
      state.breakpoints[Breakpoints.HandsetPortrait] ||
      state.breakpoints[Breakpoints.HandsetLandscape];

    const tablet =
      state.breakpoints[Breakpoints.TabletPortrait] ||
      state.breakpoints[Breakpoints.TabletLandscape];

    if (mobile) {
      return MOBILE;
    } else if (tablet) {
      return TABLET;
    } else {
      // Qualquer outro caso: Retorno Desktop - state.breakpoints[Breakpoints.Web]
      return DESKTOP;
    }
  }

  verificarDispositivoDesktop(tipo: string): boolean {
    return !tipo || tipo.toLocaleLowerCase() === DESKTOP;
  }

  verificarDispositivoMobile(tipo: string): boolean {
    return tipo.toLocaleLowerCase() === MOBILE;
  }

  verificarDispositivoTablet(tipo: string): boolean {
    return tipo.toLocaleLowerCase() === TABLET;
  }
}
