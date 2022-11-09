import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UserService {
  async getUser(id: string): Promise<boolean> {
    return true;
  }
}
