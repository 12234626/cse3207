import {Model, Table, Column, DataType, PrimaryKey, AllowNull, ForeignKey} from "sequelize-typescript";
import Club from "./club"; //동아리 모델 참조

//문의 모델
@Table({tableName: "bulletin_table"})
class bulletin extends Model {
  //게시글 번호
  @PrimaryKey
  @Column({type: DataType.INTEGER.UNSIGNED})
  public bulletinNum!: number;

  //게시글 유형
  @AllowNull(false)
  @Column({type: DataType.STRING(50)})
  public bulletinType!: string;

  // 동아리 이름(FK)
  @ForeignKey(() => Club)
  @Column({type: DataType.STRING(50)})
  public clubName!: string; 

  //제목
  @AllowNull(false)
  @Column({type: DataType.STRING(50)})
  public title!: string;

  //내용
  @AllowNull(false)
  @Column({type: DataType.STRING(100)})
  public content!: string;

  //작성 일시
  @AllowNull(false)
  @Column({type: DataType.DATE})
  public writeDate!: Date;
  
};

export default bulletin;
