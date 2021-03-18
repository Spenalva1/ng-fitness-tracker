import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/auth/user.model';
import { Exercise } from 'src/app/exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  @Input() user: User;
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
