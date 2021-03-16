import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Exercise } from 'src/app/exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit{
  public exercises: Exercise[] = [];

  constructor(
    private trainingService: TrainingService
  ) {}

  ngOnInit(): void {
    this.exercises = this.trainingService.getExercises();
  }

  onStartTraining(form: FormGroup): void {
    this.trainingService.startExercise(form.value.exercise);
  }

}
