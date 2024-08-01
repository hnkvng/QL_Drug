import {deleteDatabase, enablePromise, openDatabase, SQLiteDatabase, Transaction} from 'react-native-sqlite-storage';
import {FormDrug, FormPrice } from './interface';
import {DrugItem, TableName} from './type';
import { DATABASE, MESSAGE } from './config';
import uuid from 'uuid-random';
import { Alert } from 'react-native';

const Drug = {
  name: 'Drug',
  column: [
    'MST',
    'avatar',
    'tenThuoc',
    'soDangKy',
    'NSX',
    'HSD'
  ]
}
const DrugDetail = {
  name: 'Drug_Detail',
  column: [
    'MST',
    'huongDanSuDung',
    'soDangKy',
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
  ]
}

const Price = {
  name: 'Price',
  column: [
    'MST',
    'giaBan',
    'donVi',
    'soLuong',
    'trongSo'
  ]
}
enablePromise(true);
// SQLite.DEBUG(true);


export const getDBConnection = async () => {
    return openDatabase({name: 'Medicine', createFromLocation: '~Medicine.db'});
};

export const deleteDB = async () => {
  return deleteDatabase({name: 'Medicine', createFromLocation:'~Medicine.db'});
}

export const getItems = async (db: SQLiteDatabase, tableName: TableName, condition: string = "", column?: string[], arrange: "ASC" | "DESC" = "ASC"): Promise<object[]> => {
  try {
    const item : object[] = [];
    const results = await db.executeSql(`SELECT ${column ? column.join(','): "*"} FROM ${tableName} ${condition}`);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        item.push(result.rows.item(index))
      }
    });
    return item;
  } catch (error : any) {
    return error.message
  }
};

export const getMemberDrug = async (db: SQLiteDatabase) : Promise<{
  stilldate: number,
  expired: number,
  almostExpired:number,
}> => {
  try {
    const stilldate = await db.executeSql(`SELECT HSD FROM ${Drug.name} WHERE HSD > DATE('now', '+30 days')`);
    const almostExpired = await db.executeSql(`SELECT HSD FROM ${Drug.name} WHERE HSD <= DATE('now', '+30 days') AND HSD >  DATE('now')`);
    const expired = await db.executeSql(`SELECT HSD FROM ${Drug.name} WHERE  HSD <=  DATE('now')`);
    
    return {
      stilldate: stilldate[0].rows.length,
      almostExpired: almostExpired[0].rows.length,
      expired: expired[0].rows.length,
    }
  } catch (error : any) {
    return error.message
  }
}


export const saveDrugItems = async (db: SQLiteDatabase, FormAdd: FormDrug) => {
  
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

  const priceId = uuid();
  const drugDetailId = uuid();


  const transInsertDrug = 
  `
    INSERT INTO ${DATABASE.table.Drug.name} (${DATABASE.table.Drug.column.join(',')})
    VALUES (${MST}, '${avatar}', '${tenThuoc}', '${NSX}', '${HSD}');
  `
  const transInsertPrice = 
  `
    INSERT INTO ${DATABASE.table.Price.name} (${DATABASE.table.Price.column.join(',')})
    VALUES ${giaBan.map((value, index) => 
      `(${priceId}, '${value.giaBan}', '${value.donVi}' ,${value.soLuong}, ${index+1}, ${MST})`).join(',')};
  `
  const transInsertDrugDetail = 
  `
    INSERT INTO ${DrugDetail.name} (${DrugDetail.column.join(',')})
    VALUES (
      ${drugDetailId}
      ${huongDanSuDung},
      ${soDangKy},
      ${hoatChat},
      ${nongDo},
      ${baoChe},
      ${dongGoi},
      ${tuoiTho},
      ${congTySx},
      ${nuocSx},
      ${diaChiSx},
      ${congTyDk},
      ${nuocDk},
      ${diaChiDk},
      ${nhomThuoc},
      ${MST}
    );
  `
  try {
    await db.executeSql(transInsertDrug);
    await db.executeSql(transInsertPrice);
    await db.executeSql(transInsertDrugDetail);

    return {message: "Thêm thuốc thành công"}
  } catch (error) {
    throw error
  }
  
};

export class Database { 
 

  db: Promise<SQLiteDatabase>;

  constructor () {
    this.db = openDatabase(
      {
        name: DATABASE.name, 
        createFromLocation: DATABASE.location
      }
    )
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

    const querySameId = `SELECT id FROM ${DATABASE.table.Drug.name} WHERE id = ${MST};`
    const querySameSDK = `SELECT soDangKy FROM ${DATABASE.table.DrugDetail.name} WHERE soDangKy = '${soDangKy}';`

    const sameId : any = await this.createTransaction(querySameId);
    const sameSDK : any = await this.createTransaction(querySameSDK);

    if(sameId.rows.length) {
      throw MESSAGE.addInfoDrug.warning.sameId;
    }
    else if(sameSDK.rows.length) {
      throw MESSAGE.addInfoDrug.warning.sameDrug;
    }

    const drugDetailId = uuid();
    const storageId = uuid();
    const donViBasic = giaBan[giaBan.length - 1].donVi;
    const soLuongStorage = giaBan.reduce((sum, item) => {
      sum *= parseInt(item.soLuong);
      return sum;
    }, 1)

    const transInsertDrug = 
    `
      INSERT INTO ${DATABASE.table.Drug.name} (${DATABASE.table.Drug.column.join(',')})
      VALUES (${MST}, '${avatar}', '${tenThuoc}', '${NSX}', '${HSD}');
    `
    const transInsertPrice = 
    `
      INSERT INTO ${DATABASE.table.Price.name} (${DATABASE.table.Price.column.join(',')})
      VALUES ${giaBan.map((value, index) => {
        let priceId = uuid();
        return `('${priceId}', '${value.giaBan}', '${value.donVi}' ,${value.soLuong}, ${index+1}, ${MST})`
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
        ${soLuongStorage},
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

    try {
      await this.createTrigger(nameTrigger, 'AFTER', 'INSERT', DATABASE.table.Drug.name, query);
      await this.createTransaction(transInsertDrug,`DROP TRIGGER ${nameTrigger}`);
      return MESSAGE.addInfoDrug.susscess;
    }
    catch (error : any) {
      throw MESSAGE.error;
    }
    
  }

  async updateInfoDrug(id: number, soDangKyInit: string, giaBanInit: FormPrice[], FormAdd: FormDrug) {
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
    
    if(id !== parseInt(MST)) {
      const querySameId = `SELECT id FROM ${DATABASE.table.Drug.name} WHERE id = ${MST};`
      const sameId : any = await this.createTransaction(querySameId);
      if(sameId.rows.length) {
        throw MESSAGE.updateInfoDrug.warning.sameId;
      }
    } 
    if(soDangKy !== soDangKyInit) {
      const querySameSDK = `SELECT soDangKy FROM ${DATABASE.table.DrugDetail.name} WHERE soDangKy = '${soDangKy}';`
      const sameSDK : any = await this.createTransaction(querySameSDK);
      if(sameSDK.rows.length) {
        throw MESSAGE.updateInfoDrug.warning.sameDrug;
      }
    }

    const donViBasic = giaBan[giaBan.length - 1].donVi;
    const soLuongStorage = giaBan.reduce((sum, item) => {
      sum *= parseInt(item.soLuong);
      return sum;
    }, 1)
    
    const transChangeDrug = 
    `
      UPDATE ${DATABASE.table.Drug.name}
      SET id = ${MST},
          avatar = '${avatar}',
          tenThuoc = '${tenThuoc}',
          NSX = '${NSX}',
          HSD = '${HSD}'
      WHERE id = ${id};
    `

    let transChangePrice = '';

    for(let index = 0; index < giaBanInit.length; index++) {
      transChangePrice += 
      `
        UPDATE ${DATABASE.table.Price.name}
        SET giaBan = '${giaBan[index].giaBan}',
            donVi = '${giaBan[index].donVi}',
            soLuong = ${giaBan[index].soLuong},
            Drug_Id = ${MST}
        WHERE Drug_Id = ${id} AND trongSo = ${index + 1};
      `
    }

    if(giaBan.length < giaBanInit.length) {
      const start = giaBanInit.length;
      const end = giaBan.length;
      for(let index = start; index > end; index--) {
        transChangePrice += 
        `
          DELETE FROM ${DATABASE.table.Price.name}
          WHERE Drug_Id = ${id} AND trongSo = ${index};
        `
      }
    } 
    if (giaBan.length > giaBanInit.length) {
      const start = giaBanInit.length;
      const end = giaBan.length;
      for(let index = start; index < end; index++) {
        let priceId = uuid();
        transChangePrice += 
        `
          INSERT INTO ${DATABASE.table.Price.name} (${DATABASE.table.Price.column.join(',')})
          VALUES (
            '${priceId}', 
            '${giaBan[index].giaBan}', 
            '${giaBan[index].donVi}', 
            ${giaBan[index].soLuong}, 
            ${index + 1}, 
            ${MST}
          );
        `
      }
    }
    
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
          nhomThuoc = '${nhomThuoc}',
          Drug_Id = ${MST}
      WHERE Drug_Id = ${id};
    `

    const transStorage = 
    `
      UPDATE ${DATABASE.table.Storage.name}
      SET donViCoBan = '${donViBasic}',
          soLuong = ${soLuongStorage},
          Drug_Id = ${MST}
      WHERE Drug_Id = ${id};
    `

    const query = 
    `
      ${transChangePrice}
      ${transChangeDrugDetail}
      ${transStorage}
    `
    
    const nameTrigger = 'changeInfoDrug';

    
    try {
      await this.createTrigger(nameTrigger, 'AFTER', 'UPDATE', DATABASE.table.Drug.name, query);
      await this.createTransaction(transChangeDrug,`DROP TRIGGER ${nameTrigger}`)
      return MESSAGE.updateInfoDrug.susscess;
    }
    catch (error : any) {
      throw MESSAGE.error;
    }
  }

  getItemDrug(selectColumn: string[], condition?: string) {
    const query = `SELECT ${selectColumn.join(',')} FROM ${DATABASE.table.Drug.name} ${condition}`
    return this.createTransaction(query);
  }

  getItemDrugDetail(selectColumn: string[], condition?: string) {
    const query = `SELECT ${selectColumn} FROM ${DATABASE.table.DrugDetail.name} ${condition}`
    return this.createTransaction(query);
  }

  getIemPrice(selectColumn: string[], condition?: string) {
    const query = `SELECT ${selectColumn.join(',')} FROM ${DATABASE.table.Price.name} ${condition}`
    return this.createTransaction(query);
  }

  getDetail(condition: string) {
    const listColumn = [
      'D.id',
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
    ]
    const nameDrug = DATABASE.table.Drug.name;
    const nameDrugDetail = DATABASE.table.DrugDetail.name;

    const query = 
    `
      SELECT 
      ${listColumn.join(',')}
      FROM ${nameDrug} as D
      JOIN ${nameDrugDetail} as DT
      ON D.id = DT.Drug_Id
      ${condition}
      ;
    `
    return this.createTransaction(query);
  }

  getStorage(selectColumn: string[], condition?: string) {
    const query = `SELECT ${selectColumn.join(',')} FROM ${DATABASE.table.Storage.name} ${condition}`
    return this.createTransaction(query);
  }

  dropTrigger(name: string) {
    const query = 
    `
      DROP TRIGGER ${name}
    `
    return this.createTransaction(query);
  }

  async deleteItemDrug(id: number) {

    const searchDrug : any = await this.getItemDrug(['id'], `WHERE id = ${id}`);

    if(!searchDrug.rows.length) {
      throw MESSAGE.deleteDrug.warning.notId;
    }

    const nameTrigger = 'deleteItemDrug'
    const tranDeleteDrug = 
    `
      DELETE FROM ${DATABASE.table.Drug.name} WHERE id = ${id};
    `
    const query = 
    `
      DELETE FROM ${DATABASE.table.Price.name} WHERE Drug_Id = ${id};
      DELETE FROM ${DATABASE.table.DrugDetail.name} WHERE Drug_Id = ${id};
      DELETE FROM ${DATABASE.table.Storage.name} WHERE Drug_Id = ${id};
    `

    try {
      await this.createTrigger(nameTrigger, 'AFTER', 'DELETE', DATABASE.table.Drug.name, query);
      await this.createTransaction(tranDeleteDrug,`DROP TRIGGER ${nameTrigger}`)
      return MESSAGE.deleteDrug.susscess;
    }
    catch (error : any) {
      Alert.alert(error);
      throw MESSAGE.error;
    }
  }
}



