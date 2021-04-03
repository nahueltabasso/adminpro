import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica-one',
  templateUrl: './grafica-one.component.html',
  styles: []
})
export class GraficaOneComponent {

  public labels1: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public data1 = [[350, 450, 100],];

}
