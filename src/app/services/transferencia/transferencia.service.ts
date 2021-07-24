import { Transferencia } from './../../interface/transferencia.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransferenciaService {
  private listaTrasferencias: Transferencia[];
  private url: string = 'http://localhost:3000/transferencias';

  constructor(private httpClient: HttpClient) {
    this.listaTrasferencias = [];
  }

  get trasferencias() {
    return this.listaTrasferencias;
  }

  all(): Observable<Transferencia[]> {
    return this.httpClient.get<Transferencia[]>(this.url);
  }

  add(transferencia: Transferencia): Observable<Transferencia> {
    this.hidratar(transferencia);

    return this.httpClient.post<Transferencia>(this.url, transferencia);
  }

  private hidratar(transferencia: Transferencia) {
    transferencia.data = new Date();
  }
}
