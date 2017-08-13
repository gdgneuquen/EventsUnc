
export interface Evento {
  $key?: string;
  descripcion: string;
  dias: any[];
  horaFin: string;
  horaInicio: string;
  nombre: string;
  pickerDesde: string;
  pickerHasta: string;
  estadoActividad: string;
  tipoActividad: string;
  zonaAula: string;
  periodo: string;
}

/*
export class Evento implements IEvento {
  //$key?: string;
  public descripcion: string;
  public dias: any[];
  public horaFin: string;
  public horaInicio: string;
  public nombre: string;
  public pickerDesde: string;
  public pickerHasta: string;
  public estadoActividad: string;
  public tipoActividad: string;
  public zonaAula: string;
  public periodo: string;

  constructor(
    //$key: string,
    descripcion: string,
    dias: any[],
    horaFin: string,
    horaInicio: string,
    nombre: string,
    pickerDesde: string,
    pickerHasta: string,
    estadoActividad: string,
    tipoActividad: string,
    zonaAula: string,
    periodo: string
  ) {
      //if($key)
      //  this.$key = $key;
      this.descripcion = descripcion;
      this.dias = dias;
      this.horaFin =  horaFin;
      this.horaInicio =  horaInicio;
      this.nombre =  nombre;
      this.pickerDesde =  pickerDesde;
      this.pickerHasta =  pickerHasta;
      this.estadoActividad =  estadoActividad;
      this.tipoActividad =  tipoActividad;
      this.zonaAula =  zonaAula;
      this.periodo = periodo;
  }
}
*/
