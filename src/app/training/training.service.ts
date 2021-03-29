import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Exercise } from '../exercise.model';
import * as fromTraining from './store/training.reducer';
import * as trainingActions from './store/training.actions';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private availableExercisesSubs: Subscription;
  private pastExercisesSubs: Subscription;

  constructor(
    private firestore: AngularFirestore,
    private snackbar: MatSnackBar,
    private store: Store<fromTraining.State>
  ) { }

  public fetchExercises(): void {
    this.store.dispatch(trainingActions.StartLoading());
    this.availableExercisesSubs = this.firestore.collection('availableExercises').valueChanges({idField: 'id'})
    .subscribe((data: Exercise[]) => {
      this.store.dispatch(trainingActions.AvailableExercisesUpdate({exercises: data}));
      this.store.dispatch(trainingActions.StopLoading());
    },
    error => {
      console.error(error);
      this.snackbar.open('Fetching exercises failed, please try again later', null, {duration: 3000});
      this.store.dispatch(trainingActions.AvailableExercisesUpdate({exercises: null}));
      this.store.dispatch(trainingActions.StopLoading());
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
      this.store.dispatch(trainingActions.PastExercisesUpdate({exercises}));
    },
    error => {
      console.error(error);
      this.snackbar.open('Fetching past exercises failed, please try again later', null, {duration: 3000});
      this.store.dispatch(trainingActions.PastExercisesUpdate({exercises: null}));
    });
  }

  public stopFetchingPastExercises(): void {
    if (this.pastExercisesSubs) {
      this.pastExercisesSubs.unsubscribe();
    }
  }

  public startExercise(id: string): void {
    this.store.dispatch(trainingActions.StartExercise({id}));
  }

  public completeExercise(exercise: Exercise, userId: string): void {
    this.store.dispatch(trainingActions.StopExercise());
    if (!exercise) {
      return;
    }
    this.storeExerciseInDatabase({
      ...exercise,
      state: 'completed'
    }, userId);
    this.store.dispatch(trainingActions.StopExercise());
  }

  public cancelExercise(exercise: Exercise, progress: number, userId: string): void {
    this.store.dispatch(trainingActions.StopExercise());
    if (!exercise) {
      return;
    }
    this.storeExerciseInDatabase({
      ...exercise,
      duration: exercise.duration * (progress / 100),
      calories: exercise.calories * (progress / 100),
      state: 'cancelled'
    }, userId);
    this.store.dispatch(trainingActions.StopExercise());
  }

  public async storeExerciseInDatabase(exercise: Exercise, userId: string): Promise<void> {
    if (!userId) {
      return;
    }
    try {
      await this.firestore.collection(`users/${userId}/exercises`).add(exercise);
      this.snackbar.open('Exercise recorded', null, {duration: 3000});
    }
    catch (error) {
      this.snackbar.open('Exercise could not be recorded, sorry.', null, {duration: 3000});
    }
  }
}
