import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { PaisesService } from 'src/app/services/paises.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {

  // A traves de un Input se recibe toda la informacion el pais que se va a editar
  @Input() pais: any;

  continentes = [
    {value: 'asia', label: 'asia'},
    {value: 'america', label: 'america'},
    {value: 'africa', label: 'africa'},
    {value: 'antartida', label: 'antartida'},
    {value: 'europa', label: 'europa'},
    {value: 'oceania', label: 'oceania'},
  ];

  // Se utiliza para mostrar la alerta tan pronto sel pais haya sido editado
  alertEditar = false;
  // Es el mensaje que va a mostrar en la alerta
  mensaje = '';

  // Se utiliza para seleccionar por defecto el continente del pais a editar
  continenteSelecionado = '';

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private paisService: PaisesService
    )
    {
      // Se utiliza para evitar que modal se cierre al dar clic fuera de este
      config.backdrop = 'static';
      config.keyboard = false;
    }

  ngOnInit(): void {
    // Se obtiene el continete actual del pais a editar
    this.continenteSelecionado = this.pais.continente;
  }

  editar(form: NgForm){

    let formData = new FormData();
    if( form.valid ){
      formData.append("nombre",form.value.nombre);
      formData.append("continente",form.value.continente);
      formData.append("idioma",form.value.idioma);
      // Se enviar el formulario con los datos del pais a editar y se retorna una respuesta
      this.paisService.editarPais( formData ).subscribe( resp => {
        this.mensaje = resp.estado;
        this.alertEditar = true;
        // Se utiliza para cerrar la alerta automaticamente a los 5 segundos
        setTimeout(
          () => this.cerrarAlert(), 5000
        );
      });
    }
    else{
      const validacion = document.getElementById('needs-validation');
      validacion?.classList.add('was-validated');
    }
    }

  // Funcion para cerrar el modal al presionar la X que se muestra en el modal
  closeModal(){
    this.modalService.dismissAll();
  }

  cerrarAlert(){
    this.alertEditar = false;
    this.mensaje = '';
  }



}
