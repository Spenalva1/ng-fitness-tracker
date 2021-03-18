import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { Exercise } from 'src/app/exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnDestroy, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  pastExercises: Exercise[] = [];
  pastExercisesSubs: Subscription;
  showTable = false;

  constructor(
    private trainingService: TrainingService,
    private authService: AuthService
  ) { }

  ngOnDestroy(): void {
    if (this.pastExercisesSubs) {
      this.pastExercisesSubs.unsubscribe();
    }
    this.trainingService.stopFetchingPastExercises();
  }

  ngAfterViewInit(): void {
    this.authService.user.subscribe(user => {
      if (!user) {
        return;
      }
      this.pastExercisesSubs = this.trainingService.pastExercisesChanged.subscribe(exercises => {
        this.showTable = exercises.length > 0;
        this.pastExercises = exercises;
        this.dataSource.data = this.pastExercises;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
      this.trainingService.fetchPastExercises(user.userId);
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
