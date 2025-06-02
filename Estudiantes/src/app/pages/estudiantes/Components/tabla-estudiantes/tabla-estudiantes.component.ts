import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { EstudiantesXMaterias } from '../../../../shared/models/Estudiante';
import { EstudiantesService } from '../../services/estudiantes.service';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { tap } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-tabla-estudiantes',
  imports: [
    CommonModule,
    TableModule,
  ],
  templateUrl: './tabla-estudiantes.component.html',
  styleUrl: './tabla-estudiantes.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class TablaEstudiantesComponent implements OnInit {
  Estudiantes!: EstudiantesXMaterias[];
  idEstudiante!: number;
  constructor(
    private estudianteService: EstudiantesService,
    private localStorage: LocalStorageService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.idEstudiante = this.localStorage.getIdEstudiante();
    this.estudianteService.GetEstudianteXMaterias(this.idEstudiante)
      .pipe(
        tap(response => {
          this.Estudiantes = response.value
        })
      )
      .subscribe({
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error!', detail: err });
        }
      });
  }
}
