import {Model, Table, Column, DataType, PrimaryKey, AutoIncrement, AllowNull} from "sequelize-typescript";

// 이미지 모델
@Table({tableName: "image_table"})
class Image extends Model {
  // 이미지 아이디
  @PrimaryKey
  @AutoIncrement
  @Column({type: DataType.INTEGER.UNSIGNED})
  public id!: number;

  // 이미지 파일 경로
  @AllowNull(false)
  @Column({type: DataType.STRING(255)})
  public path!: string;
}

export default Image;
