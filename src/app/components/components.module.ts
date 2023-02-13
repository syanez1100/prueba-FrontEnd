import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { EditarComponent } from './editar/editar.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HeaderComponent,
    EditarComponent
  ],
  imports: [
    CommonModule,
    FormsModule

  ],
  exports: [
    HeaderComponent,
    EditarComponent,

  ]
})
export class ComponentsModule { }
