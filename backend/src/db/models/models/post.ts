import {Model, Table, Column, DataType, PrimaryKey, ForeignKey, AutoIncrement, AllowNull} from "sequelize-typescript";

import Club from "./club";

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
  @AllowNull(false)
  @ForeignKey(() => Club)
  @Column({type: DataType.INTEGER.UNSIGNED})
  public club_id!: number; 
};  

export default Post;
