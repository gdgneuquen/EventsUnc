export interface INotificacion {
  nombre: string;
}

export class Notificacion implements INotificacion {
  nombre: string;
  constructor(nombre: string){
    this.nombre = nombre;
  }
}
