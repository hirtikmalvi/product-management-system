export interface RegisterUserRequest {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface RegisterUserResponse {
  name: string;
  email: string;
  password: string;
}
