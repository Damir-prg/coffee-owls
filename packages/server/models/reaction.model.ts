/* eslint-disable @typescript-eslint/no-unused-vars */
import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import type { Optional } from 'sequelize';
import type { IReaction, TReaction } from './types';
import { Comment } from './comment.model';

@Table({
  modelName: 'Reaction',
  tableName: 'Reaction',
  timestamps: false,
})
export class Reaction extends Model<IReaction, Optional<IReaction, 'id'>> {
  @Column({ type: DataType.STRING, allowNull: false })
  reaction!: TReaction;

  @ForeignKey(() => Comment)
  @Column({ type: DataType.INTEGER, allowNull: false })
  commentId!: number;
}
