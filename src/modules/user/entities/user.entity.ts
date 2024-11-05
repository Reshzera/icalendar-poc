import { User as PrismaUser } from '@prisma/client';
import { hashSync } from 'bcrypt';

export interface UserProps {
  id?: string;
  email?: string;
  name?: string;
  password?: string;
  sessionId?: string;
}

export class User {
  constructor(private _props: UserProps) {}

  update(user: Partial<UserProps>): void {
    this.email = user.email ?? this.email;
    this.name = user.name ?? this.name;
    this.password = user.password ?? this.password;
  }

  get id(): string | undefined {
    return this._props.id;
  }

  get email(): string {
    return this._props.email;
  }

  get name(): string | undefined {
    return this._props.name;
  }

  get password(): string {
    return this._props.password;
  }

  get sessionId(): string | undefined {
    return this._props.sessionId;
  }

  set sessionId(sessionId: string) {
    this._props.sessionId = sessionId;
  }

  set id(id: string) {
    this._props.id = id;
  }

  set email(email: string) {
    this._props.email = email;
  }

  set name(name: string) {
    this._props.name = name;
  }

  set password(password: string) {
    this._props.password = password;
  }

  public encryptPassword(): void {
    this.password = hashSync(this.password, 10);
  }

  static PrismaToEntity(prismaUser: PrismaUser): User {
    if (!prismaUser) return null;

    return new User({
      id: prismaUser.id,
      email: prismaUser.email,
      name: prismaUser.name,
      password: prismaUser.password,
      sessionId: prismaUser.sessionId,
    });
  }

  static EntityToApi(user: User) {
    return {
      id: user.id ?? undefined,
      email: user.email ?? undefined,
      name: user.name ?? undefined,
    };
  }
}
