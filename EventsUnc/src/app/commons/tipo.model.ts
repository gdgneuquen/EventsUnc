export interface ITipo {
  nombre: string;
}

export class Tipo implements ITipo {
  nombre: string;
  constructor(nombre: string) {
    this.nombre = nombre;
  }
}
