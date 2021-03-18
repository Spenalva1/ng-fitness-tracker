import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { TrainingService } from './training.service';

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
    private trainingService: TrainingService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.exerciseSub = this.trainingService.runningExerciseChanged.subscribe(ex => {
      this.ongoingTraining = ex;
    });
    this.userSub = this.authService.user.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    if (this.exerciseSub) {
      this.exerciseSub.unsubscribe();
    }
  }
}
