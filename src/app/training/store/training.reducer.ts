import { createReducer, on, Action } from '@ngrx/store';
import { Exercise } from 'src/app/exercise.model';
import * as TrainingActions from './training.actions';


export interface State {
  availableExercises: Exercise[];
  pastExercises: Exercise[];
  runningExercise: Exercise;
  loading: boolean;
}

const initialState: State = {
  availableExercises: null,
  pastExercises: null,
  runningExercise: null,
  loading: false
};

const authReducer = createReducer(
  initialState,

  on(TrainingActions.AvailableExercisesUpdate , (state, action) => {
    return {
      ...state,
      availableExercises: action.exercises
    };
  }),

  on(TrainingActions.PastExercisesUpdate , (state, action) => {
    return {
      ...state,
      pastExercises: action.exercises
    };
  }),

  on(TrainingActions.StartExercise , (state, action) => {
    const exercise = {
      ...state.availableExercises.find(ex => ex.id === action.id),
      date: new Date()
    };
    return {
      ...state,
      runningExercise: exercise
    };
  }),

  on(TrainingActions.StopExercise , (state, action) => {
    return {
      ...state,
      runningExercise: null
    };
  }),

  on(TrainingActions.StartLoading , state => {
    return {
      ...state,
      loading: true
    };
  }),

  on(TrainingActions.StopLoading , state => {
    return {
      ...state,
      loading: false
    };
  }),
);

// tslint:disable-next-line: typedef
export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
