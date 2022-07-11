import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises: Observable<any> | undefined;

  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore
  ) { }

  ngOnInit(): void {
    // this.exercises = this.trainingService.getAvailableExercises()
    this.exercises = this.db
      .collection( 'availableExercises' )
      .valueChanges();
  }

  onStartTraining( form: NgForm ) {
    this.trainingService.startExercise( form.value.exercise )
  }
}
