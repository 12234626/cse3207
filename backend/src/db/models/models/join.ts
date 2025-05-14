import {Model, Table, Column, DataType, PrimaryKey, AllowNull, ForeignKey} from "sequelize-typescript";
import User from "./user"; //유저가 user모델 참조
import Club from "./club"; //동아리 모델 참조

//문의 모델
@Table({tableName: "join_table"})
class ClubJoin extends Model {
  //신청 번호
  @PrimaryKey
  @Column({type: DataType.INTEGER.UNSIGNED})
  public applicationId!: number;
  
  //신청 상태
  @AllowNull(false)
  @Column({type: DataType.STRING(50)})
  public applicationStatus!: string;

  //신청 일자
  @AllowNull(false)
  @Column({type: DataType.DATE})
  public applicationDate!: Date;
  
  // 유저 학번(FK)
  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER.UNSIGNED})
  public id!: number;

  // 동아리 이름(FK)
  @ForeignKey(() => Club)
  @Column({type: DataType.STRING(50)})
  public clubName!: string;
  
  
};

export default ClubJoin;
