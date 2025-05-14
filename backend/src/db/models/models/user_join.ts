import {Model, Table, Column, DataType, PrimaryKey, AllowNull, ForeignKey} from "sequelize-typescript";
import User from "./user"; //유저가 user모델 참조

//문의 모델
@Table({tableName: "user-join_table"})
class UserJoin extends Model {
  // 유저 학번(PK + FK)
  @PrimaryKey
  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER.UNSIGNED})
  public id!: number;

  // 동아리명
  @PrimaryKey
  @Column({type: DataType.STRING(50)})
  public clubName!: string;
  
  //관리자 여부
  @AllowNull(false)
  @Column({type: DataType.STRING(50)})
  public appManagerId?: string;
};

export default UserJoin;
