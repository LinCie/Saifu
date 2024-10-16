import { User } from '../../../entities';
import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: User;
}
