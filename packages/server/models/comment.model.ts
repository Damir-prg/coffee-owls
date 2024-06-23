/* eslint-disable @typescript-eslint/no-unused-vars */
import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { User } from './user.model';
import { Topic } from './topic.model';

import type { Optional } from 'sequelize';
import type { IComment } from './types';

type TCommentCreationAttributes = Optional<IComment, 'id'>;

@Table({ modelName: 'Comment', tableName: 'Comments', timestamps: true })
export class Comment extends Model<IComment, TCommentCreationAttributes> {
  @Column({ type: DataType.STRING, allowNull: false })
  text!: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  authorId!: number;

  @BelongsTo(() => User)
  author!: User;

  @ForeignKey(() => Topic)
  @Column({ type: DataType.INTEGER, allowNull: false })
  topicId!: number;

  @BelongsTo(() => Topic)
  topic!: Topic;
}
