import {Model, Table, Column, DataType, PrimaryKey, ForeignKey} from "sequelize-typescript";

import Club from "./club";
import User from "./user";

// 동아리 가입 모델
@Table({tableName: "club_member_table"})
class ClubMember extends Model {
  // 동아리 아이디
  @PrimaryKey
  @ForeignKey(() => Club)
  @Column({type: "INTEGER UNSIGNED ON DELETE CASCADE"})
  public club_id!: number;

  // 유저 아이디
  @PrimaryKey
  @ForeignKey(() => User)
  @Column({type: "INTEGER UNSIGNED ON DELETE CASCADE"})
  public user_id!: number;
};

export default ClubMember;
