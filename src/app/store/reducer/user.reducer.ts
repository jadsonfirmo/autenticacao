import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout } from 'app/store/actions/user.actions';
import { UserState } from 'app/store/models/auth.model';

const initialState: UserState = {
  isAuthenticated: false,
  user: null,
};

export const userReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { user }) => ({
    ...state,
    isAuthenticated: true,
    user,
  })),
  on(logout, () => initialState)
);
