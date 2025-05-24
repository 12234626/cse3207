import {Model, Table, Column, DataType, PrimaryKey, AutoIncrement, AllowNull} from "sequelize-typescript";

// 이미지 모델
@Table({tableName: "image_table"})
class Image extends Model {
  // 이미지 아이디
  @PrimaryKey
  @AutoIncrement
  @Column({type: DataType.INTEGER.UNSIGNED})
  public id!: number;

  // 이미지 세트 아이디
  @AllowNull(false)
  @Column({type: DataType.INTEGER.UNSIGNED})
  public set_id!: number;

  // 이미지 파일 경로
  @AllowNull(false)
  @Column({type: DataType.STRING(255)})
  public url!: string;
}

export default Image;
