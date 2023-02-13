import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaAgregarPais, RespuestaEliminarPais, RespuestaPaises, RespuestaEditarPais } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  constructor(
    private http: HttpClient
  )

  { }

  visualizarPaises(){
    return this.http.get<RespuestaPaises>('https://apimocha.com/pais/v1/');
  }

  agregarPais(data: FormData){
    return this.http.post<RespuestaAgregarPais>('https://apimocha.com/pais/v1/',data);
  }

  eliminarPais(){
    return new Promise( resolve => {
      this.http.delete<RespuestaEliminarPais>('https://apimocha.com/pais/v1/').subscribe(async (resp: any) => {
            resolve(true);
        });
    });
  }

  editarPais(data: FormData){
    return this.http.put<RespuestaEditarPais>('https://apimocha.com/pais/v1/',data);
  }


}
