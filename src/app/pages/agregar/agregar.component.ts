import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {NgForm} from '@angular/forms';
import { PaisesService } from 'src/app/services/paises.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {

  // Se utiliza para mostrar la alerta tan pronto sel pais haya sido agregado
  alertAgregar = false;
  // Es el mensaje que va a mostrar en la alerta
  mensaje = '';

  // arreglo con los continentes,estos seran las opciones deplegadas en el select al momento de agregar un pais
  continentes = [
    {value: 'asia', label: 'asia'},
    {value: 'america', label: 'america'},
    {value: 'africa', label: 'africa'},
    {value: 'antartida', label: 'antartida'},
    {value: 'europa', label: 'europa'},
    {value: 'oceania', label: 'oceania'},
  ];

  constructor(
    private paisService: PaisesService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  // Función para agregar el pais
  agregar(form: NgForm){

    let formData = new FormData();

    if( form.valid ){
      formData.append("nombre",form.value.nombre);
      formData.append("continente",form.value.continente);
      formData.append("idioma",form.value.idioma);
      this.paisService.agregarPais(formData).subscribe( resp => {
        this.mensaje = resp.estado;
        this.alertAgregar = true;
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

  cerrarAlert(){
    this.alertAgregar = false;
    this.mensaje = '';
    this.router.navigate(['']);
  }

}
