import { AfterContentInit, AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
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
export class PastTrainingsComponent implements OnDestroy, AfterContentInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  pastExercises: Exercise[] = [];
  exercisesSubs: Subscription;
  showTable = false;

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnDestroy(): void {
    if (this.exercisesSubs) {
      this.exercisesSubs.unsubscribe();
    }
    this.trainingService.stopFetchingPastExercises();
  }

  ngAfterContentInit(): void {
    // TODO corregir estos subscribes
    this.store.select('auth').subscribe(authState => {
      if (!authState.user) {
        return;
      }
      this.exercisesSubs = this.store.select('training').subscribe(trainingState => {
        if (!trainingState.pastExercises) {
          return;
        }
        this.showTable = trainingState.pastExercises.length > 0;
        this.pastExercises = trainingState.pastExercises;
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
