import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { AsignarMaterias, Materias } from '../../../../shared/models/Materias';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { MateriasService } from '../../services/materias.service';
import { tap } from 'rxjs';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { IconFieldModule } from 'primeng/iconfield';
import { ButtonModule } from 'primeng/button';
import { InputIconModule } from 'primeng/inputicon';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-tabla-materias',
  imports: [
    CommonModule,
    TableModule,
    ToggleSwitch,
    IconFieldModule,
    ButtonModule,
    InputIconModule,
    FormsModule,
    InputTextModule,
    ToastModule
  ],
  templateUrl: './tabla-materias.component.html',
  styleUrl: './tabla-materias.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class TablaMateriasComponent implements OnInit {
  Materias: Materias[] = [];
  loading: boolean = true;
  searchValue: string | undefined;
  idEstudiante!: number;
  constructor(
    private materiaService: MateriasService,
    private localStorage: LocalStorageService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.idEstudiante = this.localStorage.getIdEstudiante();
    this.materiaService.GetMaterias(this.idEstudiante)
      .pipe(
        tap(response => {
          this.Materias = response.value
          this.loading = false;
        })
      )
      .subscribe({
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error!', detail: err });
        }
      });
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = ''
  }

  applyGlobalFilter(event: Event, dt: Table) {
    const inputValue = (event.target as HTMLInputElement).value;
    dt.filterGlobal(inputValue, 'contains');
  }

  asignarMateria(materia: Materias) {
    const estadoAnterior = materia.asignada;

    const asignarMateria: AsignarMaterias = {
      idEstudiante: this.idEstudiante,
      idMaterias: materia.idMateria,
      asignado: Boolean(materia.asignada)
    }

    this.materiaService.AsignarMaterias(asignarMateria)
      .pipe(
        tap(response => {
          if (response.value) {
            this.messageService.add({ severity: 'success', summary: 'Exitoso!', detail: response.message });
          } else {
            this.messageService.add({ severity: 'warn', summary: 'Exitoso!', detail: response.message });
          }

          if(materia.asignada && !response.value){
            materia.asignada = !estadoAnterior;
          }
        })
      )
      .subscribe({
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error!', detail: err });
        }
      });
  }
}
