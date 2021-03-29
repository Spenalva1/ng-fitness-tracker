import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/auth/user.model';
import { Exercise } from 'src/app/exercise.model';
import { StopTrainingComponent } from './stop-training.component';
import * as fromApp from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit, OnDestroy {
  @Input() user: User;
  progress = 0;
  interval: any;
  exercise: Exercise;
  exerciseSub: Subscription;

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.exerciseSub = this.store.select('training').pipe(take(1)).subscribe(trainingState => {
      this.exercise = trainingState.runningExercise;
      this.startTimer();
    });
  }

  ngOnDestroy(): void {
    this.exerciseSub.unsubscribe();
  }

  private startTimer(): void {
    this.interval = setInterval(() => {
      this.progress++;
      if (this.progress >= 100) {
        this.trainingService.completeExercise(this.exercise, this.user.userId);
        clearInterval(this.interval);
      }
    }, this.exercise.duration * 1000 / 100);
  }

  public onStop(): void {
    clearInterval(this.interval);
    const dialog = this.dialog.open(StopTrainingComponent);
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.trainingService.cancelExercise(this.exercise, this.progress, this.user.userId);
      } else {
        this.startTimer();
      }
    });
  }

}
