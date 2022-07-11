import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
    // this.exercises = this.db
    //   .collection( 'availableExercises' )
    //   .valueChanges();

    this.exercises = this.db
      .collection( 'availableExercises')
      .snapshotChanges()
      .pipe(
        map( docData => {
          return docData.map( doc => {
            let object1 = doc.payload.doc.data()

            return {
              id: doc.payload.doc.id,
              ...( typeof object1 === 'object' )? object1 : {}
            };

          });
        })
      )
  }

  onStartTraining( form: NgForm ) {
    this.trainingService.startExercise( form.value.exercise )
  }
}
