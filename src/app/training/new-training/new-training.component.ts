import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[] | undefined;
  exerciseSubscription: Subscription | undefined;
  isLoading = false;
  fetchingExerciseSubs: Subscription | undefined;

  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore,
    private uiService: UIService
  ) { }

  ngOnInit(): void {
    this.fetchingExerciseSubs = this.uiService.fetchingExercises.subscribe( isLoading => {
      this.isLoading = isLoading;
    })
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe( exercises => {
      this.exercises = exercises
    })
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises()
  }

  onStartTraining( form: NgForm ) {
    this.trainingService.startExercise( form.value.exercise )
  }

  ngOnDestroy(): void {
    this.exerciseSubscription?.unsubscribe();
    this.fetchingExerciseSubs?.unsubscribe();
  }
}
