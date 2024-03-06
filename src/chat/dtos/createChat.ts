import { User } from 'src/user/model/user.entity';

export class CreateChatDto {
  users: User['id'][];
}
