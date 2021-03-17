import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Exercise } from '../exercise.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 5, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 10, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 15, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 20, calories: 8 }
  ];
  public runningExerciseChanged = new Subject<boolean>();
  private runningExercise: Exercise;
  // tslint:disable-next-line: max-line-length
  private pastExercises: Exercise[] = [
    {id: 'crunches', name: 'Crunches', duration: 5, calories: 8, state: 'completed'},
    {id: 'touch-toes', name: 'Touch Toes', duration: 0.7000000000000001, calories: 1.05, state: 'cancelled'},
    {id: 'crunches', name: 'Crunches', duration: 0.55, calories: 0.88, state: 'cancelled'},
    {id: 'side-lunges', name: 'Side Lunges', duration: 0.44999999999999996, calories: 0.54, state: 'cancelled'},
    {id: 'burpees', name: 'Burpees', duration: 0.4, calories: 0.16, state: 'cancelled'}
  ];

  constructor() { }

  public getExercises(): Exercise[] {
    return this.availableExercises.slice();
  }

  public getPastExercises(): Exercise[] {
    return this.pastExercises.slice();
  }

  public startExercise(id: string): void {
    this.runningExercise = {
      ...this.availableExercises.find(ex => ex.id === id),
      date: new Date()
    };
    this.runningExerciseChanged.next(true);
  }

  public completeExercise(): void {
    this.pastExercises.push({
      ...this.runningExercise,
      state: 'completed'
    });
    this.runningExercise = null;
    this.runningExerciseChanged.next(null);
  }

  public cancelExercise(progress: number): void {
    this.pastExercises.push({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.runningExerciseChanged.next(null);
  }

  public getRunningExercise(): Exercise {
    return {...this.runningExercise};
  }
}
