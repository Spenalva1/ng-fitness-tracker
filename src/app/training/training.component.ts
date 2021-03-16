import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent {
  ongoingTraining = false;

  public onTrainingExit(): void {
    this.ongoingTraining = false;
  }

}
