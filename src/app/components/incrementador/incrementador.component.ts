import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent  implements OnInit{


  ngOnInit(){
    this.btnClass = `btn ${ this.btnClass }`;
  }

  // Para indicar que puederecibir un valor desde el componente padre
  // En caso de querer renombrar el argumento:
  @Input('valor') progreso: number = 50;
  // La clase se manda como argumento, del padre al hijo
  @Input() btnClass: string = 'btn-primary'; 

  @Output('valor') valorSalida: EventEmitter<number> = new EventEmitter();
 
  cambiarValor( valor: number ):any {

    if( this.progreso >= 100 && valor >= 0) {
      this.valorSalida.emit(100);
      return this.progreso = 100;
    }

    if( this.progreso <= 0 && valor < 0) {
      this.valorSalida.emit(0);
      return this.progreso = 0;
    }

    this.progreso = this.progreso + valor;
    this.valorSalida.emit(this.progreso);
  }

  onChange( NuevoValor:number ) {

    if( NuevoValor >= 100 ){

      this.progreso = 100;

    }else if( NuevoValor <= 0 ) {

      this.progreso = 0;

    } else{

      this.progreso = NuevoValor;

    }
    
    this.valorSalida.emit(this.progreso);
    
  }

}
