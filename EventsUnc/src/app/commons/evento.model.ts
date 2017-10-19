
export interface IEvento {
  key?: string;
  descripcion?: string;
  dias?: any[];
  horaFin?: string;
  horaInicio?: string;
  nombre?: string;
  pickerDesde?: string;
  pickerHasta?: string;
  estadoActividad?: string;
  tipoActividad?: string;
  zonaAula?: string;
  periodo?: string;
}

//export class Evento implements IEvento {
  export class Evento {
  key?: string;
  public dias: any[];
  public chk_lun: boolean = false;
  public chk_ma: boolean = false;
  public chk_mi: boolean = false;
  public chk_ju: boolean = false;
  public chk_vi: boolean = false;
  public chk_sa: boolean = false;
  public chk_do: boolean = false;

  constructor(
    key?: string,
    public descripcion?: string,
    dias?: any[],
    public horaFin?: string,
    public horaInicio?: string,
    public nombre?: string,
    public pickerDesde?: string,
    public pickerHasta?: string,
    public estadoActividad?: string,
    public tipoActividad?: string,
    public zonaAula?: string,
    public periodo?: string
  ) {
      if (key) {
        this.key = key;
      }

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
      if(dias){
        this.chk_lun = dias[0];
        this.chk_ma = dias[1];
        this.chk_mi = dias[2];
        this.chk_ju = dias[3];
        this.chk_vi = dias[4];
        this.chk_sa = dias[5];
        this.chk_do = dias[6];
      }

  }
}
