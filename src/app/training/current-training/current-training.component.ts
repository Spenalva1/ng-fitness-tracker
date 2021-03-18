import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/auth/user.model';
import { Exercise } from 'src/app/exercise.model';
import { TrainingService } from '../training.service';
import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  @Input() user: User;
  progress = 0;
  interval: any;
  exercise: Exercise;

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService
  ) { }

  ngOnInit(): void {
    this.exercise = this.trainingService.getRunningExercise();
    this.startTimer();
  }

  private startTimer(): void {
    this.interval = setInterval(() => {
      this.progress++;
      if (this.progress >= 100) {
        this.trainingService.completeExercise(this.user.userId);
        clearInterval(this.interval);
      }
    }, this.exercise.duration * 1000 / 100);
  }

  public onStop(): void {
    clearInterval(this.interval);
    const dialog = this.dialog.open(StopTrainingComponent);
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.trainingService.cancelExercise(this.progress, this.user.userId);
      } else {
        this.startTimer();
      }
    });
  }

}
