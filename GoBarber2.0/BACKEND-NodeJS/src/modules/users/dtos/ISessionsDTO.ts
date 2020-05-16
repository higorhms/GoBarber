import User from '../infra/typeorm/entities/User';

export interface ICreateSessionRequestDTO {
  email: string;
  password: string;
}

export interface ICreateSessionResponseDTO {
  user: User;
  token: string;
}
