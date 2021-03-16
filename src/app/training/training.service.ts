import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Exercise } from '../exercise.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  public runningExerciseChanged = new Subject<Exercise>();
  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120 },
    { id: 'burpees', name: 'Burpees', duration: 60 }
  ];
  private runningExercise: Exercise;

  constructor() { }

  public getExercises(): Exercise[] {
    return this.availableExercises.slice();
  }

  public startExercise(id: string): void {
    this.runningExercise = this.availableExercises.find(ex => ex.id === id);
    this.runningExerciseChanged.next({...this.runningExercise});
  }

  public stopExercise(): void {
    this.runningExerciseChanged.next(null);
  }
}
