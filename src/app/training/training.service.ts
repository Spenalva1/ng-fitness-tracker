import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Exercise } from '../exercise.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private availableExercisesSubs: Subscription;
  private pastExercisesSubs: Subscription;
  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  public availableExercisesChanged = new Subject<Exercise[]>();
  public runningExerciseChanged = new Subject<boolean>();
  public pastExercisesChanged = new Subject<Exercise[]>();

  constructor(
    private firestore: AngularFirestore
  ) { }

  public fetchExercises(): void {
    this.availableExercisesSubs = this.firestore.collection('availableExercises').valueChanges({idField: 'id'}).subscribe(data => {
      this.availableExercises = (data as Exercise[]);
      this.availableExercisesChanged.next([...this.availableExercises]);
    });
  }

  public stopFetchingExercises(): void {
    if (this.availableExercisesSubs) {
      this.availableExercisesSubs.unsubscribe();
    }
  }

  public fetchPastExercises(userId: string): void {
    this.pastExercisesSubs = this.firestore.collection(`users/${userId}/exercises`).valueChanges({idField: 'id'})
    .pipe(
      map(data => {
        return (data as Exercise[]).map(ex => {
          return {
            ...ex,
            date: (ex.date as any).toDate()
          };
        });
      })
    )
    .subscribe(exercises => {
      this.pastExercisesChanged.next([...exercises]);
    });
  }

  public stopFetchingPastExercises(): void {
    if (this.pastExercisesSubs) {
      this.pastExercisesSubs.unsubscribe();
    }
  }

  public startExercise(id: string): void {
    this.runningExercise = {
      ...this.availableExercises.find(ex => ex.id === id),
      date: new Date()
    };
    this.runningExerciseChanged.next(true);
  }

  public completeExercise(userId: string): void {
    this.storeExerciseInDatabase({
      ...this.runningExercise,
      state: 'completed'
    }, userId);
    this.runningExercise = null;
    this.runningExerciseChanged.next(false);
  }

  public cancelExercise(progress: number, userId: string): void {
    this.storeExerciseInDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      state: 'cancelled'
    }, userId);
    this.runningExercise = null;
    this.runningExerciseChanged.next(false);
  }

  public getRunningExercise(): Exercise {
    return {...this.runningExercise};
  }

  public storeExerciseInDatabase(exercise: Exercise, userId: string): void {
    if (!userId) {
      return;
    }
    this.firestore.collection(`users/${userId}/exercises`).add(exercise);
  }
}
