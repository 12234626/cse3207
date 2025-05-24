import {Model, Table, Column, DataType, PrimaryKey, BelongsTo, AutoIncrement, AllowNull} from "sequelize-typescript";

import Club from "./club";
import Image from "./image";

// 게시글 모델
@Table({tableName: "post_table"})
class Post extends Model {
  // 게시글 아이디
  @PrimaryKey
  @AutoIncrement
  @Column({type: DataType.INTEGER.UNSIGNED})
  public id!: number;

  // 게시글 유형
  @AllowNull(false)
  @Column({type: DataType.ENUM("공지", "홍보", "상세 설명")})
  public type!: string;

  // 제목
  @AllowNull(false)
  @Column({type: DataType.STRING(50)})
  public title!: string;

  // 내용
  @AllowNull(false)
  @Column({type: DataType.TEXT})
  public content!: string;

  // 동아리 아이디
  @BelongsTo(() => Club, {foreignKey: "club_id", as: "club", onDelete: "CASCADE"})
  @AllowNull(false)
  @Column({type: DataType.INTEGER.UNSIGNED})
  public club_id!: number;

  // 이미지 세트
  // @BelongsTo(() => Image, {foreignKey: "image_id", as: "image", onDelete: "SET NULL"})
  @AllowNull(true)
  @Column({type: DataType.INTEGER.UNSIGNED})
  public image_id?: number;
};

export default Post;
