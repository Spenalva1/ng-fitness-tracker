import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  @Output() trainingExit = new EventEmitter<void>();
  progress = 0;
  interval: any;

  constructor(private dialog: MatDialog) { }

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
        this.trainingExit.emit();
      } else {
        this.startTimer();
      }
    });
  }

}
