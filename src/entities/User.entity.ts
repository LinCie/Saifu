import { Entity, Property, Unique } from '@mikro-orm/core';
import BaseEntity from './BaseEntity.entity';

@Entity()
export default class User extends BaseEntity {
  @Property()
  @Unique()
  username: string;

  @Property()
  hash: string;

  constructor(username: string, hash: string) {
    super();

    this.username = username;
    this.hash = hash;
  }
}
