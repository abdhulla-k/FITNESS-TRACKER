import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Exercise } from "./exercise.model";

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  trainingExit = new Subject()
  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 10 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 7 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ];

  private runningExercise: Exercise | undefined;
  private exercises: Exercise[] = [];

  getAvailableExercises() {
    return this.availableExercises.slice();
  }

  startExercise( selectedId: string ) {
    this.runningExercise = this.availableExercises.find(
      ex => ex.id === selectedId
    );
    this.exerciseChanged.next({ ...this.runningExercise! })
  }

  completeExercise() {
    if( this.runningExercise ) {
      this.exercises.push({
        ...this.runningExercise,
        date: new Date,
        state: 'completed'
      });
    }

    this.runningExercise = null as any;
    this.trainingExit.next( null );
  }

  cancelExercise( progress: number ) {
    if( this.runningExercise ) {
      this.exercises.push({
        ...this.runningExercise,
        duration: this.runningExercise.duration * ( progress / 100 ),
        calories: this.runningExercise.duration * ( progress / 100 ),
        date: new Date,
        state: 'cancelled'
      });
    }

    this.runningExercise = null as any;
    this.trainingExit.next( null );
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }
}
