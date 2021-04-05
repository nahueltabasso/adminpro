import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesa',
  templateUrl: './promesa.component.html',
  styles: []
})
export class PromesaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsuarios().then(data => console.log(data));
  }

  public getUsuarios() {
    const promesa = new Promise(resolve => {
      fetch('https://reqres.in/api/users')
      .then(data => data.json())
      .then(body => console.log(body.data));
    });
    return promesa;
  }
}
