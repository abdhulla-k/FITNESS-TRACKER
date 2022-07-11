import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/compat/firestore";

import { Exercise } from "./exercise.model";

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  exerciseChanged = new Subject<Exercise | null>(); // emitting status of current exercise.
  exercisesChanged = new Subject<Exercise[]>();  // emitting availableExercises
  finishedExerciseChanged = new Subject<Exercise[]>();
  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise | undefined;

  constructor( private db: AngularFirestore ) {}

  fetchAvailableExercises() {
    this.db
      .collection( 'availableExercises' )
      .snapshotChanges()
      .pipe(
        map( docData => {
          return docData.map( doc => {
            let object1 = doc.payload.doc.data()

            return {
              id: doc.payload.doc.id,
              ...( typeof object1 === 'object' )? object1 : {}
            }
          })
        })
      ).subscribe(( exercises: any[] ) => {
        this.availableExercises = exercises;
        this.exercisesChanged.next( [... this.availableExercises] );
      })
    // return this.availableExercises.slice();
  }

  startExercise( selectedId: string ) {
    this.runningExercise = this.availableExercises.find(
      ex => ex.id === selectedId
    );
    this.exerciseChanged.next({ ...this.runningExercise! })
  }

  completeExercise() {
    if( this.runningExercise ) {
      this.addDataToDatabase({
        ...this.runningExercise,
        date: new Date,
        state: 'completed'
      });
    }

    this.runningExercise = null as any;
    this.exerciseChanged.next( null );
  }

  cancelExercise( progress: number ) {
    if( this.runningExercise ) {
      this.addDataToDatabase({
        ...this.runningExercise,
        duration: this.runningExercise.duration * ( progress / 100 ),
        calories: this.runningExercise.calories * ( progress / 100 ),
        date: new Date,
        state: 'cancelled'
      });
    }

    this.runningExercise = null as any;
    this.exerciseChanged.next( null );
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  fetchCompletedOrCancelledExercises() {
    this.db
      .collection( 'finishedExercises' )
      .valueChanges()
      .subscribe(( exercises: any[] ) => {
        this.finishedExerciseChanged.next( exercises );
      })
    // return this.fiishedExercises.slice();
  }

  private addDataToDatabase( exercise: Exercise ) {
    this.db.collection( 'finishedExercises' ).add( exercise );
  }
}
