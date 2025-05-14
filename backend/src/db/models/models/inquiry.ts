import {Model, Table, Column, DataType, PrimaryKey, AllowNull, ForeignKey} from "sequelize-typescript";
import User from "./user"; //유저가 user모델 참조
import AppManager from "./appManager"; // 앱 관리자를 참조

//문의 모델
@Table({tableName: "inquiry_table"})
class Inquiry extends Model {
  // 문의사항 번호
  @PrimaryKey
  @Column({type: DataType.INTEGER.UNSIGNED})
  public inquiryNum!: number;

  // 유저 학번(FK)
  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER.UNSIGNED})
  public id!: number;
  
  //앱 관리자 아이디(FK)
  @ForeignKey(() => AppManager)
  @Column({type: DataType.STRING(50)})
  public appManagerId?: string;
};

export default Inquiry;
