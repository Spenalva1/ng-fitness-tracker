import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Exercise } from 'src/app/exercise.model';
import { TrainingService } from '../training.service';
import * as fromApp from '../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  private exercisesSubs: Subscription;
  public exercises: Exercise[];
  public loading = false;

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.exercisesSubs = this.store.select('training').subscribe(trainingState => {
      this.loading = trainingState.loading;
      this.exercises = trainingState.availableExercises;
    });
    this.fetchExercises();
  }

  public fetchExercises(): void {
    this.trainingService.fetchExercises();
  }

  ngOnDestroy(): void {
    if (this.exercisesSubs) {
      this.exercisesSubs.unsubscribe();
    }
    this.trainingService.stopFetchingExercises();
  }

  onStartTraining(form: FormGroup): void {
    this.trainingService.startExercise(form.value.exercise);
  }

}
