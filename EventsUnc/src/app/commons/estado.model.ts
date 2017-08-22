export interface IEstado {
  id: number;
  nombre: string;
}

export class Estado implements IEstado {
  id: number;
  nombre: string;
  constructor(id: number, nombre: string) {
    this.id = id;
    this.nombre = nombre;
  }
}

export interface IEstadosList {
  estadosList: Estado[];
}

export class EstadosList implements IEstadosList {
  estadosList: Estado[];

  constructor() {
  }

  add (estado: Estado): void {
    this.estadosList.push(estado);
  }

  remove (estado: Estado): void {
    let filter_result = this.estadosList.filter(value => {
      value.id != estado.id
    });
    this.estadosList = filter_result;
  }

  //findByKey(key) , existByKey(key) , exist(estado), list(), removeByKey(key), remove(estado)

}


