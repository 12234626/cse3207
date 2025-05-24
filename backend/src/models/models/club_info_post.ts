import {Model, Table, Column, DataType, PrimaryKey, BelongsTo, AutoIncrement, AllowNull} from "sequelize-typescript";

import Club from "./club";
import Post from "./post";

// 동아리 상세 설명 게시글 모델
@Table({tableName: "club_info_post_table"})
class ClubInfoPost extends Model {
  // 더미 아이디
  @PrimaryKey
  @AutoIncrement
  @Column({type: DataType.INTEGER.UNSIGNED})
  public id!: number;

  // 동아리 아이디
  @BelongsTo(() => Club, {foreignKey: "club_id", as: "club", onDelete: "CASCADE"})
  @AllowNull(false)
  @Column({type: DataType.INTEGER.UNSIGNED})
  public club_id!: number;

  // 게시글 아이디
  @BelongsTo(() => Post, {foreignKey: "info_post_id", as: "info_post", onDelete: "CASCADE"})
  @AllowNull(false)
  @Column({type: DataType.INTEGER.UNSIGNED})
  public info_post_id!: number;
}

export default ClubInfoPost;
