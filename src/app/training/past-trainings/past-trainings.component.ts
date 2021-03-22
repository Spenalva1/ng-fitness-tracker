import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Exercise } from 'src/app/exercise.model';
import { TrainingService } from '../training.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app.reducer';

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
    private store: Store<fromApp.AppState>
  ) { }

  ngOnDestroy(): void {
    if (this.pastExercisesSubs) {
      this.pastExercisesSubs.unsubscribe();
    }
    this.trainingService.stopFetchingPastExercises();
  }

  ngAfterViewInit(): void {
    // TODO corregir estos subscribes
    this.store.select('auth').subscribe(authState => {
      if (!authState.user) {
        return;
      }
      this.pastExercisesSubs = this.trainingService.pastExercisesChanged.subscribe(exercises => {
        this.showTable = exercises.length > 0;
        this.pastExercises = exercises;
        this.dataSource.data = this.pastExercises;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
      this.trainingService.fetchPastExercises(authState.user.userId);
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
