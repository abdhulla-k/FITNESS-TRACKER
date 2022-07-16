import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service'
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  @ViewChild( MatSort ) sort!: MatSort;
  @ViewChild( MatPaginator ) paginator!: MatPaginator;
  displayedColumns = [ 'date', 'name', 'calories', 'duration', 'state'];
  dataSource = new MatTableDataSource<Exercise>();

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>,
  ) { }

  ngOnInit(): void {
    this.store.select( fromTraining.getFinishedExercises ).subscribe(
      ( exercises: Exercise[] ) => {
        this.dataSource.data = exercises;
      }
    );
    this.trainingService.fetchCompletedOrCancelledExercises();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter( filterValue: KeyboardEvent ) {
    this.dataSource.filter = ( filterValue?.target as HTMLInputElement)
      .value.trim().toLowerCase();
  }
}
