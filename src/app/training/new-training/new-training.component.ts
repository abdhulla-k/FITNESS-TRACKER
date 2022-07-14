import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { Store } from '@ngrx/store';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[] | undefined;
  exerciseSubscription: Subscription | undefined;
  isLoading$: Observable<boolean> | undefined;
  fetchingExerciseSubs: Subscription | undefined;

  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select( fromRoot.getIsLoading );
    // this.fetchingExerciseSubs = this.uiService.fetchingExercises.subscribe( isLoading => {
    //   this.isLoading = isLoading;
    // })
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe( exercises => {
      this.exercises = exercises
      console.log( this.exercises );
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
    // this.fetchingExerciseSubs?.unsubscribe();
  }
}
