export interface UserPayload {
  sub: string;
  sessionId: string;
  email: string;
  name: string;
  iat?: number;
  exp?: number;
}
