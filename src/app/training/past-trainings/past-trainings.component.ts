import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service'

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  @ViewChild( MatSort ) sort!: MatSort;
  displayedColumns = [ 'date', 'name', 'calories', 'duration', 'state'];
  dataSource = new MatTableDataSource<Exercise>()

  constructor( private trainingService: TrainingService ) { }

  ngOnInit(): void {
    this.dataSource.data = this.trainingService.getCompletedOrCancelledExercises();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

}
