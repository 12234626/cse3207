import {Model, Table, Column, DataType, PrimaryKey, BelongsTo} from "sequelize-typescript";

import Club from "./club";
import User from "./user";

// 동아리 가입 모델
@Table({tableName: "club_member_table"})
class ClubMember extends Model {
  // 동아리 아이디
  @PrimaryKey
  @BelongsTo(() => Club, {foreignKey: "club_id", as: "club", onDelete: "CASCADE"})
  @Column({type: DataType.INTEGER.UNSIGNED})
  public club_id!: number;

  // 유저 아이디
  @PrimaryKey
  @BelongsTo(() => User, {foreignKey: "user_id", as: "user", onDelete: "CASCADE"})
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    validate: {
      is: {
        args: /^12\d{6}$/,
        msg: "유저 아이디는 12로 시작하는 8자리 숫자"
      }
    }
  })
  public user_id!: number;
};

export default ClubMember;
