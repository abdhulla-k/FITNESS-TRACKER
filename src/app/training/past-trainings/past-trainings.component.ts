import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service'

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild( MatSort ) sort!: MatSort;
  @ViewChild( MatPaginator ) paginator!: MatPaginator;
  displayedColumns = [ 'date', 'name', 'calories', 'duration', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  private exchangedSubscription: Subscription | undefined;

  constructor( private trainingService: TrainingService ) { }

  ngOnInit(): void {
    this.exchangedSubscription = this.trainingService.finishedExerciseChanged.subscribe(
      ( exercises: Exercise[] ) => {
        this.dataSource.data = exercises;
        console.log( this.dataSource.data )
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

  ngOnDestroy(): void {
    this.exchangedSubscription?.unsubscribe();
  }
}
