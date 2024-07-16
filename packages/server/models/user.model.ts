/* eslint-disable @typescript-eslint/no-unused-vars */
import { Table, Column, Model, DataType } from 'sequelize-typescript';
import type { IUser } from './types';

@Table({ modelName: 'User', tableName: 'Users', timestamps: true })
export class User extends Model<IUser> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  override id!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  first_name!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  second_name!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  display_name!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  login!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  email!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  phone?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  avatar?: string;
}
