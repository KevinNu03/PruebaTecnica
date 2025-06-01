import { Component } from '@angular/core';
import { TablaEstudiantesComponent } from './Components/tabla-estudiantes/tabla-estudiantes.component';

@Component({
  selector: 'app-estudiantes',
  imports: [TablaEstudiantesComponent],
  templateUrl: './estudiantes.component.html',
  styleUrl: './estudiantes.component.scss'
})
export class EstudiantesComponent {

}
