import {Model, Table, Column, DataType, PrimaryKey, AllowNull, ForeignKey} from "sequelize-typescript";
import User from "./user"; //유저가 user모델 참조

//문의 모델
@Table({tableName: "club_table"})
class Club extends Model {
  // 동아리 이름
  @PrimaryKey
  @Column({type: DataType.STRING(50)})
  public clubName!: string;

  //동아리 소속
  @AllowNull(false)
  @Column({type: DataType.STRING(50)})
  public MemOfClub!: string;

  //분야
  @AllowNull(false)
  @Column({type: DataType.STRING(50)})
  public field!: string;

  //동아리 관리자
  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER.UNSIGNED})
  public clubManager!: number;
};

export default Club;
