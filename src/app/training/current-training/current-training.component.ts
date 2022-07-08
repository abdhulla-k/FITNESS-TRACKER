import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: number = 0
  currentExercise: Exercise | undefined;

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService,
  ) { }

  ngOnInit(): void {
    this.startOrResumeTimer()
  }

  startOrResumeTimer() {
    let steps = this.trainingService.getRunningExercise().duration;
    if( steps == undefined ) {
      steps = 0;
    } else {
      steps = steps / 100 * 1000;
    }

    this.timer = window.setInterval(() => {
      this.progress += 1;
      if( this.progress >= 100 ) {
        this.trainingService.completeExercise();
        clearInterval( this.timer );
      }
    }, steps );
  }

  onStop() {
    clearInterval( this.timer );
    const dialogRef = this.dialog.open( StopTrainingComponent, {
       data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe( data => {
      if( data ) {
        this.trainingService.cancelExercise( this.progress );
      } else {
        this.startOrResumeTimer();
      }
    })
  }
}
