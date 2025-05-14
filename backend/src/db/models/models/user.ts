import {Model, Table, Column, DataType, PrimaryKey, AllowNull} from "sequelize-typescript";

// 유저 모델
@Table({tableName: "user_table"})
class User extends Model {
  // 유저 아이디(학번)
  @PrimaryKey
  @Column({type: DataType.INTEGER.UNSIGNED})
  public id!: number;

  // 유저 이름
  @AllowNull(false)
  @Column({type: DataType.STRING(20)})
  public name!: string;
  
  // 유저 비밀번호
  @AllowNull(false)
  @Column({type: DataType.INTEGER.UNSIGNED})
  public password!: number;
  
  //유저 학년
  @AllowNull(false)
  @Column({type: DataType.INTEGER.UNSIGNED})
  public grade!: number;

  //유저 학과
  @AllowNull(false)
  @Column({type: DataType.STRING(50)})
  public department!: string;

  //유저 전화번호
  @AllowNull(false)
  @Column({type: DataType.INTEGER.UNSIGNED})
  public phoneNum!: number;
};

export default User;
