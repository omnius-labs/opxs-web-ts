export interface AuthToken {
  access_token: string;
  access_token_expires_at: Date;
  refresh_token: string;
  refresh_token_expires_at: Date;
}
