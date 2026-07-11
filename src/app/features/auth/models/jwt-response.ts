export interface JwtResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    username: string;
    roles: string[];
  };
}
