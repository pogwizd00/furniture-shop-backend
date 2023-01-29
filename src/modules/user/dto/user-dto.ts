import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserDto implements User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  //nie wyrzucam hasla bo chce zeby zostalo niewidoczne

  //jesli chce zwrocic jakies inne dane to lepiej uzyc konstruktora dto
  @Exclude() // cos co nie chcemy pokazac uzytkownikowi
  password: string;
}
