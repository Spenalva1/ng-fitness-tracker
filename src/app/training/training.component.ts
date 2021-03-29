import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../auth/user.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {
  exerciseSub: Subscription;
  userSub: Subscription;
  user: User;
  ongoingTraining: boolean;

  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.exerciseSub = this.store.select('training').subscribe(trainingState => {
      this.ongoingTraining = !!trainingState.runningExercise;
    });
    this.userSub = this.store.select('auth').subscribe(authState => {
      this.user = authState.user;
    });
  }

  ngOnDestroy(): void {
    if (this.exerciseSub) {
      this.exerciseSub.unsubscribe();
    }
  }
}
