import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Estudiante } from '../../../../shared/models/Estudiante';
import { EstudiantesService } from '../../services/estudiantes.service';

@Component({
  selector: 'app-tabla-estudiantes',
  imports: [
    CommonModule,
    TableModule
  ],
  templateUrl: './tabla-estudiantes.component.html',
  styleUrl: './tabla-estudiantes.component.scss'
})
export class TablaEstudiantesComponent implements OnInit{
  Estudiantes!: Estudiante[];
  constructor(
    private estudianteService: EstudiantesService
  ){}

  ngOnInit(): void {
    
  }
}
