import { Component } from '@angular/core';

@Component({
  selector: 'dialog-stop-training',
  template: `
    <h2 mat-dialog-title>Are you sure?</h2>
    <div mat-dialog-actions>
      <button mat-raised-button [mat-dialog-close]="true">Yes</button>
      <button mat-raised-button [mat-dialog-close]="false">No</button>
    </div>
  `
})
export class StopTrainingComponent {}
