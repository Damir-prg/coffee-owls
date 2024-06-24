/* eslint-disable @typescript-eslint/no-unused-vars */
import { Table, Column, Model, ForeignKey, BelongsTo, HasMany, DataType } from 'sequelize-typescript';
import { User } from './user.model';
import { Comment } from './comment.model';

import type { Optional } from 'sequelize';
import type { ITopic } from './types';

type TTopicCreationAttributes = Optional<ITopic, 'id'>;

@Table({ modelName: 'Topic', tableName: 'Topics', timestamps: true })
export class Topic extends Model<ITopic, TTopicCreationAttributes> {
  @Column({ type: DataType.STRING, allowNull: false })
  title!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description!: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  authorId!: number;

  @BelongsTo(() => User)
  author!: User;

  @HasMany(() => Comment, 'topicId')
  comments!: Comment[];
}
