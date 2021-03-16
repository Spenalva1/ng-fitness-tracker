import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent {
  @Output() startTraining = new EventEmitter<void>();

  onStartTraining(): void {
    this.startTraining.emit();
  }

}
