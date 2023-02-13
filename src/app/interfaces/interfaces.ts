export interface RespuestaPaises {
  paises: Pais[];
}

export interface Pais {
  nombre?: string;
  continente?: string;
  idioma?: string;
  ciudades?: string[];
}

export interface RespuestaEliminarPais {
  Estado: string;
}

export interface RespuestaAgregarPais {
  estado: string;
}

export interface RespuestaEditarPais {
  estado: string;
}
