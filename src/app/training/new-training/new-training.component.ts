import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Exercise } from 'src/app/exercise.model';
import { TrainingService } from '../training.service';

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
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.exercisesSubs = this.trainingService.availableExercisesChanged.subscribe(exercises => {
      this.exercises = exercises;
      this.loading = false;
    });
    this.fetchExercises();
  }

  public fetchExercises(): void {
    this.loading = true;
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
