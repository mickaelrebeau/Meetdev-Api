import { Data } from 'src/data/model/data.entity';

export class UserDto {
  name: string;
  email: string;
  password: string;
  data?: Data;
}
