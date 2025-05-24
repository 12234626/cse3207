import {Model, Table, Column, DataType, PrimaryKey, BelongsTo, AutoIncrement, AllowNull} from "sequelize-typescript";

import Club from "./club";
import User from "./user";

// 동아리 가입 신청 테이블
@Table({tableName: "club_request_table"})
class ClubRequest extends Model {
  // 신청 아이디
  @PrimaryKey
  @AutoIncrement
  @Column({type: DataType.INTEGER.UNSIGNED})
  public id!: number;

  // 신청 상태
  @AllowNull(false)
  @Column({type: DataType.ENUM("대기", "수락", "거절"), defaultValue: "대기"})
  public status!: string;

  // 동아리 아이디
  @AllowNull(false)
  @BelongsTo(() => Club, {foreignKey: "club_id", as: "club", onDelete: "CASCADE"})
  @Column({type: DataType.INTEGER.UNSIGNED})
  public club_id!: number;

  // 유저 아이디
  @AllowNull(false)
  @BelongsTo(() => User, {foreignKey: "user_id", as: "user", onDelete: "CASCADE"})
  @Column({type: DataType.INTEGER.UNSIGNED})
  public user_id!: number;
};

export default ClubRequest;
