import { Injectable } from "@angular/core";
import { Subscription } from "rxjs";
import { map, take } from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Store } from "@ngrx/store";

import { Exercise } from "./exercise.model";
import { UIService } from "../shared/ui.service";
import * as Training from "./training.actions";
import * as fromTraining from "./training.reducer";
import * as UI from "../shared/ui.actions";

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private fbSub: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.State>
  ) {}

  fetchAvailableExercises() {
    this.store.dispatch( new UI.StartLoading() );
    this.fbSub.push(this.db
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
        this.store.dispatch( new UI.StopLoading() );
        this.store.dispatch( new Training.SetAvailableTrainings( exercises ));
      }, error => {
        this.store.dispatch( new UI.StopLoading() );
        this.uiService.showSnackbar(
          'Fetching Exercise failed, please try again later', null, 3000
        );
      }));
  }

  startExercise( selectedId: string ) {
    this.store.dispatch( new Training.StartTraining( selectedId ))
  }

  completeExercise() {
    this.store.select( fromTraining.getActiveTraining )
    .pipe(
      take(1))
      .subscribe( ex => {
        if( ex ) {
          this.addDataToDatabase({
            ...ex,
            date: new Date,
            state: 'completed'
          });
        }

        this.store.dispatch( new Training.StopTraining( null ));
    })
  }

  cancelExercise( progress: number ) {
    this.store.select( fromTraining.getActiveTraining )
    .pipe(
      take(1))
      .subscribe( ex => {
        if( ex ) {
          this.addDataToDatabase({
            ...ex,
            duration: ex.duration * ( progress / 100 ),
            calories: ex.calories * ( progress / 100 ),
            date: new Date,
            state: 'cancelled'
          });
        }

        this.store.dispatch( new Training.StopTraining( null ));
    })
  }

  fetchCompletedOrCancelledExercises() {
    this.fbSub.push(this.db
      .collection( 'finishedExercises' )
      .valueChanges()
      .subscribe(( exercises: any[] ) => {
        this.store.dispatch( new Training.SetFinishedTrainings( exercises ));
      }));
  }

  cancelSubscriptions() {
    this.fbSub.forEach( sub => {
      sub.unsubscribe();
    })
  }

  private addDataToDatabase( exercise: Exercise ) {
    this.db.collection( 'finishedExercises' ).add( exercise );
  }
}
