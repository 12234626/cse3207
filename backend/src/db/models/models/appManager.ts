import {Model, Table, Column, DataType, PrimaryKey, AllowNull, ForeignKey} from "sequelize-typescript";

//문의 모델
@Table({tableName: "appManager_table"})
class AppManager extends Model {
  // 앱 관리자 아이디
  @PrimaryKey
  @Column({type: DataType.INTEGER.UNSIGNED})
  public id!: number;
};

export default AppManager;
