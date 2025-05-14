import {Model, Table, Column, DataType, PrimaryKey, Unique, ForeignKey, AutoIncrement, AllowNull} from "sequelize-typescript";

import User from "./user";

// 동아리 모델
@Table({tableName: "club_table"})
class Club extends Model {
  // 동아리 아이디
  @PrimaryKey
  @AutoIncrement
  @Column({type: DataType.INTEGER.UNSIGNED})
  public id!: number;

  // 동아리 이름
  @Unique
  @Column({type: DataType.STRING(50)})
  public name!: string;

  // 동아리 소속
  @AllowNull(false)
  @Column({type: DataType.ENUM("central", "group")})
  public type!: string;

  // 동아리 분야
  @AllowNull(false)
  @Column({type: DataType.STRING(50)})
  public field!: string;

  // 동아리 관리자
  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER.UNSIGNED})
  public admin!: number;
};

export default Club;
