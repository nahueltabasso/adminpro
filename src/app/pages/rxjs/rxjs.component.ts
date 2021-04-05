import { Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { retry, take, map } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {


    // this.retornaObservable().pipe(
    //   retry(1)
    // ).subscribe(
    //   valor => console.log('Subs', valor),
    //   (err) => console.warn('Error', err),
    //   () => console.info('Obs Terminado')
    // );

    // this.retornaIntervalo().subscribe(
    //   (valor) => console.log(valor)
    // )
  }

  public retornaIntervalo(): Observable<number> {
    const intervalo$ = interval(1000).pipe(
      take(4),
      map(valor => {
        return valor + 1;
      })
    );
    return intervalo$
  }

  public retornaObservable(): Observable<number> {
    let i = -1;

    const obs$ = new Observable<number>(observer => {
      const intervalo = setInterval(() => {
        i++;

        observer.next(i);

        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }
      }, 1000)
    });
    return obs$;
  }

}
