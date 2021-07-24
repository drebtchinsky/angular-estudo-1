import { TransferenciaService } from './../services/transferencia/transferencia.service';
import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Transferencia } from '../interface/transferencia.interface';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nova-transferencia',
  templateUrl: './nova-transferencia.component.html',
  styleUrls: ['./nova-transferencia.component.scss'],
})
export class NovaTransferenciaComponent implements OnDestroy {
  sub?: Subscription;

  destino!: string;
  valor!: number;

  constructor(private service: TransferenciaService, private router: Router) {
    this.clean();
  }
  ngOnDestroy(): void {
    if (!!this.sub) this.sub.unsubscribe();
  }

  onTransferir() {
    this.sub = this.service
      .add({
        valor: this.valor,
        destino: this.destino,
      })
      .subscribe(
        (transferencia: Transferencia) => {
          this.clean();
          this.router.navigateByUrl('extrato');
        },
        (err) => console.error(err)
      );
  }

  clean() {
    this.valor = 0;
    this.destino = '';

    if (!!this.sub) this.sub.unsubscribe();
  }
}
