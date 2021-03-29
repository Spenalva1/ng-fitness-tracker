import { createAction, props } from '@ngrx/store';
import { Exercise } from 'src/app/exercise.model';

export const START_LOADING = 'START_LOADING';
export const STOP_LOADING = 'STOP_LOADING';
export const AVAILABLE_EXERCISES_UPDATE = 'AVAILABLE_EXERCISES_UPDATE';
export const PAST_EXERCISES_UPDATE = 'PAST_EXERCISES_UPDATE';
export const START_EXERCISE = 'START_EXERCISE';
export const STOP_EXERCISE = 'STOP_EXERCISE';

export const StartLoading = createAction(START_LOADING);

export const StopLoading = createAction(STOP_LOADING);

export const AvailableExercisesUpdate = createAction(AVAILABLE_EXERCISES_UPDATE, props<{exercises: Exercise[]}>());

export const PastExercisesUpdate = createAction(PAST_EXERCISES_UPDATE, props<{exercises: Exercise[]}>());

export const StartExercise = createAction(START_EXERCISE, props<{id: string}>());

export const StopExercise = createAction(STOP_EXERCISE);

