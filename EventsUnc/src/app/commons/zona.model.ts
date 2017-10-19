export interface IZona {
  nombre: string;
}

export class Zona implements IZona {
  nombre: string;
  constructor(nombre: string) {
    this.nombre = nombre;
  }
}
