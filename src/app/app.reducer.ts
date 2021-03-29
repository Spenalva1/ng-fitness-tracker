import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from './auth/store/auth.reducer';
import * as fromTraining from './training/store/training.reducer';

export interface AppState {
  auth: fromAuth.State;
  training: fromTraining.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.reducer,
  training: fromTraining.reducer,
};
