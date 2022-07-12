import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UIService {
  loginStateChanged = new Subject<boolean>();
  fetchingExercises = new Subject<boolean>();
}
