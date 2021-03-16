import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Exercise } from 'src/app/exercise.model';
import { TrainingService } from '../training.service';
import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  interval: any;

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService
  ) { }

  ngOnInit(): void {
    this.startTimer();
  }

  private startTimer(): void {
    this.interval = setInterval(() => {
      this.progress += 5;
      if (this.progress === 100) {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  public onStop(): void {
    clearInterval(this.interval);
    const dialog = this.dialog.open(StopTrainingComponent);
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.trainingService.stopExercise();
      } else {
        this.startTimer();
      }
    });
  }

}
