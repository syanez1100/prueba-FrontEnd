import { Component, OnInit } from '@angular/core';
import { PaisesService } from '../../services/paises.service';
import { Pais } from 'src/app/interfaces/interfaces';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditarComponent } from 'src/app/components/editar/editar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  mensaje = '';
  paisEliminado = '';
  // Se utiliza para mostrar un spinner mientras se recibe una respuesta para eliminar un pais
  spinner = false;
  // Se utiliza para mostrar una alerta al momento de eliminar un pais
  alertEliminar = false;
  // Arreglo de paises vacio,en este arreglo se almacenaran los paises que retorne la api
  paises: Pais[] = [];

  constructor(
    private PaiseService: PaisesService,
    private modalService: NgbModal
  ) { }

  ngOnInit(){
    // Se guardan los paises que retorno la api el el arreglo de paises
    this.PaiseService.visualizarPaises().subscribe( resp => {
      this.paises = resp.paises;
    });
  }

  // Funcion para eliminar un pais
  async eliminarPais(pais: Pais,index: number){
    this.spinner = true;
    // Se guarda lo que retorne la promesa que informa sobre el exito de la pericion para eliminar el pais
    const resp = await this.PaiseService.eliminarPais();
    this.spinner = false
    if( resp ){
      this.alertEliminar = true;
      this.mensaje = 'Registro eliminado de manera exitosa';
      // Se guarda el nombre del pais elimidado
      this.paisEliminado = pais.nombre || '';
      // Se elimina el pais en el arreglo de paises
      this.paises.splice(index,1);
    }
    // Se utiliza para cerrar la alerta automaticamente a los 5 segundos
    setTimeout(
      () => this.cerrarAlert(), 5000
    );
  }

  // Funcion para abrir un modal que muestra el Wireframe de editar un pais
  openModal(pais: Pais) {
    const modalRef = this.modalService.open(EditarComponent,{ size: 'xl' });
		modalRef.componentInstance.pais = pais;
  }

  cerrarAlert(){
    this.alertEliminar = false;
    this.mensaje = '';
    this.paisEliminado = '';
  }

}


