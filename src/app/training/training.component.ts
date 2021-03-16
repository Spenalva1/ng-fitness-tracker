import { Component, OnDestroy, OnInit } from '@angular/core';
import { Event } from '@angular/router';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {
  exerciseSub: Subscription;
  ongoingTraining: boolean;

  constructor(
    private trainingService: TrainingService
  ) {}

  ngOnInit(): void {
    this.exerciseSub = this.trainingService.runningExerciseChanged.subscribe(ex => {
      this.ongoingTraining = ex !== null;
    });
  }

  ngOnDestroy(): void {
    if (this.exerciseSub) {
      this.exerciseSub.unsubscribe();
    }
  }
}
