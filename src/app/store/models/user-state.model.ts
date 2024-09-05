import { User } from 'app/store/models/user.model';

export interface UserState {
  isAuthenticated: boolean;
  user: User | null;
}
