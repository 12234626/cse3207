import {Model, Table, Column, DataType, PrimaryKey, AllowNull} from "sequelize-typescript";

// 유저 모델
@Table({tableName: "user_table"})
class User extends Model {
  // 유저 아이디
  @PrimaryKey
  @Column({type: DataType.INTEGER.UNSIGNED})
  public id!: number;

  // 유저 비밀번호
  @AllowNull(false)
  @Column({type: DataType.STRING(50)})
  public password?: string;
  
  // 유저 이름
  @AllowNull(false)
  @Column({type: DataType.STRING(20)})
  public name!: string;
};

export default User;
