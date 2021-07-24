import { TransferenciaService } from './../services/transferencia/transferencia.service';
import { Transferencia } from './../interface/transferencia.interface';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.scss'],
})
export class ExtratoComponent implements OnInit, OnDestroy {
  transferencias: Transferencia[] = [];
  sub?: Subscription;
  constructor(private service: TransferenciaService) {}

  ngOnInit(): void {
    this.sub = this.service
      .all()
      .subscribe((transferencias: Transferencia[]) => {
        this.transferencias = transferencias;
      });
  }

  ngOnDestroy(): void{
    if (!!this.sub) this.sub.unsubscribe();
  }

  showTable(): boolean {
    return this.transferencias.length > 0;
  }
}
