import {deleteDatabase, enablePromise, openDatabase, SQLiteDatabase, Transaction} from 'react-native-sqlite-storage';
import {FormDrug, FormPrice } from './interface';
import { DATABASE, MESSAGE } from './config';
import uuid from 'uuid-random';


enablePromise(true);
// SQLite.DEBUG(true);


export const getDBConnection = async () => {
    return openDatabase({name: 'Medicine', createFromLocation: '~Medicine.db'});
};

export const deleteDB = async () => {
  return deleteDatabase({name: 'Medicine', createFromLocation:'~Medicine.db'});
}

export class Database { 
 

  db: Promise<SQLiteDatabase>;

  constructor () {
    this.db = openDatabase(
      {
        name: DATABASE.name, 
        createFromLocation: DATABASE.location,
      }
    )
  }
  async onPragma() {
    (await this.db).executeSql("pragma foreign_keys=on");
  }

  testSameId(MST : number) {
    const querySameId = `SELECT MST FROM ${DATABASE.table.Drug.name} WHERE MST = ${MST};`
    return this.createTransaction(querySameId);
  }

  testSameSDK(soDangKy: string) {
    const querySameSDK = `SELECT soDangKy FROM ${DATABASE.table.DrugDetail.name} WHERE soDangKy = '${soDangKy}';`
    return this.createTransaction(querySameSDK);
  }

  createTransaction(query : string, queryAfter?: string) {
    return new Promise(async (resolve, reject) => {
      const db = await this.db;
      db.transaction(tx => {
        tx.executeSql(
          query,
          [],
          (tx, results) => {
            resolve(results);
          },
          error => {
            reject(error);
          }
        );
        if(queryAfter)
          tx.executeSql(queryAfter);
      });
    });
  }

  createTrigger(
      name: string, 
      time: "AFTER" | "BEFORE",  
      event: string,
      nameTable: string,
      query: string,
    ) {
    const trigger = 
    `
      CREATE TRIGGER ${name} ${time} ${event}
      ON ${nameTable}
      BEGIN
        ${query}
      END;
    `
    return this.createTransaction(trigger);
  }

  async addInfoDrug(FormAdd: FormDrug) {
    const {
      avatar,
      MST, 
      tenThuoc, 
      NSX, 
      HSD, 
      giaBan,
      huongDanSuDung,
      soDangKy,
      hoatChat,
      nongDo,
      baoChe,
      dongGoi,
      tuoiTho,
      congTySx,
      nuocSx,
      diaChiSx,
      congTyDk,
      nuocDk,
      diaChiDk,
      nhomThuoc,
    } = FormAdd;

    try {
      const sameId : any = await this.testSameId(parseInt(MST));
      const sameSDK : any = await this.testSameSDK(soDangKy);
      if(sameId.rows.length) {
        throw MESSAGE.addInfoDrug.warning.sameId;
      }
      else if(sameSDK.rows.length) {
        throw MESSAGE.addInfoDrug.warning.sameDrug;
      }
    } catch (error){
      throw error
    }
    

    try {
      const drugDetailId = uuid();
      const storageId = uuid();
      const donViBasic = giaBan[giaBan.length - 1].donVi;

      const transInsertDrug = 
      `
        INSERT INTO ${DATABASE.table.Drug.name} (${DATABASE.table.Drug.column.join(',')})
        VALUES (${MST}, '${avatar}', '${tenThuoc}', '${NSX}', '${HSD}');
      `
      const transInsertPrice = 
      `
        INSERT INTO ${DATABASE.table.Price.name} (${DATABASE.table.Price.column.join(',')})
        VALUES ${giaBan.map((value) => {
          let priceId = uuid();
          return `('${priceId}', '${value.giaBan}', '${value.donVi}' ,${value.quyCach}, ${MST})`
        }).join(',\n')};
      `

      const transInsertDrugDetail = 
      `
        INSERT INTO ${DATABASE.table.DrugDetail.name} (${DATABASE.table.DrugDetail.column.join(',')})
        VALUES (
          '${drugDetailId}',
          '${soDangKy}',
          '${huongDanSuDung}',
          '${hoatChat}',
          '${nongDo}',
          '${baoChe}',
          '${dongGoi}',
          '${tuoiTho}',
          '${congTySx}',
          '${nuocSx}',
          '${diaChiSx}',
          '${congTyDk}',
          '${nuocDk}',
          '${diaChiDk}',
          '${nhomThuoc}',
          ${MST}
        );
      `

      const transStorage = 
      `
        INSERT INTO ${DATABASE.table.Storage.name} (${DATABASE.table.Storage.column.join(',')})
        VALUES (
          '${storageId}',
          '${donViBasic}',
          ${0},
          ${MST}
        );
      `
      const query = 
      `
        ${transInsertPrice}
        ${transInsertDrugDetail}
        ${transStorage}
      `

      const nameTrigger = 'addInfoDrug';

      await this.createTrigger(nameTrigger, 'AFTER', 'INSERT', DATABASE.table.Drug.name, query);
      await this.createTransaction(transInsertDrug,`DROP TRIGGER ${nameTrigger}`);
      return MESSAGE.addInfoDrug.susscess;
    }
    catch (error : any) {
      throw MESSAGE.error;
    }
    
  }

  async updateInfoDrug(
    MSTInit: number, 
    soDangKyInit: string,
    FormAdd: FormDrug
  ) {
    const {
      avatar,
      MST, 
      tenThuoc, 
      NSX, 
      HSD, 
      giaBan,
      huongDanSuDung,
      soDangKy,
      hoatChat,
      nongDo,
      baoChe,
      dongGoi,
      tuoiTho,
      congTySx,
      nuocSx,
      diaChiSx,
      congTyDk,
      nuocDk,
      diaChiDk,
      nhomThuoc,
    } = FormAdd;
    
    try {
      //check same MST
      if(MSTInit !== parseInt(MST)) {  
          const sameId : any = await this.testSameId(parseInt(MST));
          if(sameId.rows.length) {
            throw MESSAGE.updateInfoDrug.warning.sameId;
          }
      } 
    
      //check same drug
      if(soDangKy !== soDangKyInit) {
        const sameSDK : any = await this.testSameSDK(soDangKy);
        if(sameSDK.rows.length) {
          throw MESSAGE.updateInfoDrug.warning.sameDrug;
        }
      }
    } catch (error){
      throw error
    }

    try {
      const transChangeDrug = 
      `
        UPDATE ${DATABASE.table.Drug.name}
        SET MST = ${MST},
            avatar = '${avatar}',
            tenThuoc = '${tenThuoc}',
            NSX = '${NSX}',
            HSD = '${HSD}'
        WHERE MST = ${MSTInit};
      `

      const transChangeDrugDetail = 
      `
        UPDATE ${DATABASE.table.DrugDetail.name}
        SET huongDanSuDung = '${huongDanSuDung}',
            soDangKy = '${soDangKy}',
            hoatChat = '${hoatChat}',
            nongDo = '${nongDo}',
            baoChe = '${baoChe}',
            dongGoi = '${dongGoi}',
            tuoiTho = '${tuoiTho}',
            congTySx = '${congTySx}',
            nuocSx = '${nuocSx}',
            diaChiSx = '${diaChiSx}',
            congTyDk = '${congTyDk}',
            nuocDk = '${nuocDk}',
            diaChiDk = '${diaChiDk}',
            nhomThuoc = '${nhomThuoc}'
        WHERE Drug_Id = ${MSTInit};
      `

      const transPrice = giaBan.map((item) => (
        `
          UPDATE ${DATABASE.table.Price.name}
          SET giaBan = '${item.giaBan}'
          WHERE Drug_Id = ${MSTInit} AND donVi = '${item.donVi}';
        `
      )).join('\n');
      

      const query = 
      `
        ${transChangeDrugDetail}
        ${transPrice}
      `
      
      const nameTrigger = 'changeInfoDrug';

      await this.createTrigger(nameTrigger, 'AFTER', 'UPDATE', DATABASE.table.Drug.name, query);
      await this.createTransaction(transChangeDrug,`DROP TRIGGER ${nameTrigger}`)
      return MESSAGE.updateInfoDrug.susscess;
    }
    catch (error : any) {
      throw MESSAGE.error;
    }
  }

  async deleteItemDrug(MST: number) {
    try {
      const searchDrug : any = await this.getItem(['MST'], DATABASE.table.Drug.name, `WHERE MST = ${MST}`);

      if(!searchDrug.rows.length) {
        throw MESSAGE.deleteDrug.warning.notId;
      }
    } catch (error){
      throw error
    }

    try {
      const tranDeleteDrug = 
      `
        DELETE FROM ${DATABASE.table.Drug.name} WHERE MST = ${MST};
      `

      await this.createTransaction(tranDeleteDrug);
      return MESSAGE.deleteDrug.susscess;
    }
    catch (error : any) {
      throw MESSAGE.error;
    }
  }

  async sellDrug(
    listCart: {
      id: number,
      avatar: string,
      tenThuoc: string, 
      giaBan: string,
      soLuong: number,
      donVi: string,
      heSo: number,
    }[],
    tongTien: number,
    ) {

    for(let index = 0; index < listCart.length; index++) {
      const {id, tenThuoc, soLuong, heSo} = listCart[index]

      const querySoLuongTonKho = 
      `
        SELECT donViTinh, soLuongTonKho FROM ${DATABASE.table.Storage.name}
        WHERE Drug_Id = ${id}
        ;
      `
      try {
        const tonKho : any = await this.createTransaction(querySoLuongTonKho);
        const soLuongTrongKho =  tonKho.rows.item(0).soLuongTonKho;
        const donVi = tonKho.rows.item(0).donViTinh;
        const math = soLuongTrongKho - (soLuong * heSo);

       
        if(math < 0) {
          throw MESSAGE.sellDrug.warning.qualityIvalid(tenThuoc, soLuongTrongKho, donVi);
        }

        const transStorage = 
        `
          UPDATE ${DATABASE.table.Storage.name}
          SET soLuongTonKho = ${math}
          WHERE Drug_Id = ${id};
        `
        
        await this.createTransaction(transStorage);
      } 
      catch (error) {
        throw error;
      }
    }
    
    const sellId = uuid();

    const tranSell = 
    `
      INSERT INTO ${DATABASE.table.Sell.name} (${DATABASE.table.Sell.column.join(',')})
      VALUES ('${sellId}', ${tongTien}, '${new Date()}');
    `
    
    try {
      await this.createTransaction(tranSell);
      return MESSAGE.sellDrug.susscess;
    } catch {
      throw MESSAGE.error;
    }
  }

  async addOrReduceDrug(
    soLuong: number,  
    soLuongTonKho: number,
    addOrReduce: "Thêm" | "Bớt", 
    MST: number
  ) {

    let math = 0;

    try {
      switch (addOrReduce) {
        case "Thêm":
          math = soLuongTonKho + soLuong;
          break;
        case "Bớt":
          math = soLuongTonKho - soLuong;
          break;
        default: 
          throw MESSAGE.error;
      }

      if(math < 0) {
        throw MESSAGE.addOrReduceDrug.warning.qualityIvalid;
      } else if (math > 1000000) {
        throw MESSAGE.addOrReduceDrug.warning.maxStorage;
      }
      
    } catch (error){
      throw error
    }
    
    try {
      const transAddOrReduce = 
      `
        UPDATE ${DATABASE.table.Storage.name}
        SET soLuongTonKho = ${math}
        WHERE Drug_Id = ${MST};
      `
      await this.createTransaction(transAddOrReduce);
    } catch (error) {
      throw MESSAGE.error;
    }
    return MESSAGE.addOrReduceDrug.susscess(addOrReduce);
    
    
  }

  getItem(selectColumn: string[], table: string,  condition?: string) {
    const query = `SELECT ${selectColumn.join(',')} FROM ${table} ${condition ? condition: ''}`
    return this.createTransaction(query);
  }

  getDetail(condition: string) {
    const listColumn = [
      'MST',
      'avatar',
      'tenThuoc',
      'NSX',
      'HSD',
      'soDangKy',
      'huongDanSuDung',
      'hoatChat',
      'nongDo',
      'baoChe',
      'dongGoi',
      'tuoiTho',
      'congTySx',
      'nuocSx',
      'diaChiSx',
      'congTyDk',
      'nuocDk',
      'diaChiDk',
      'nhomThuoc',
      'soLuongTonKho',
      'donViTinh'
    ]
    const nameDrug = DATABASE.table.Drug.name;
    const nameDrugDetail = DATABASE.table.DrugDetail.name;
    const nameDrugStorage = DATABASE.table.Storage.name;

    const query = 
    `
      SELECT 
      ${listColumn.join(',')}
      FROM ${nameDrug} as D
      JOIN ${nameDrugDetail} as DT
      ON MST = DT.Drug_Id
      JOIN ${nameDrugStorage} as S
      ON MST = S.Drug_Id
      ${condition}
      ;
    `
    return this.createTransaction(query);
  }

  dropTrigger(name: string) {
    const query = 
    `
      DROP TRIGGER ${name}
    `
    return this.createTransaction(query);
  }

  
}



