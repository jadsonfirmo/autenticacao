import { createAction, props } from '@ngrx/store';
import { User } from 'app/store/models/user.model';

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User }>()
);

export const logout = createAction('[Auth] Logout');
