import {deleteDatabase, enablePromise, openDatabase, SQLiteDatabase, Transaction} from 'react-native-sqlite-storage';
import {FormDrug } from './interface';
import {DrugItem, TableName} from './type';
import { DATABASE } from './config';
import uuid from 'uuid-random';

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

  dropTrigger(name: string) {
    const query = 
    `
      DROP TRIGGER ${name}
    `
    return this.createTransaction(query);
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
        `('${priceId}', '${value.giaBan}', '${value.donVi}' ,${value.soLuong}, ${index+1}, ${MST})`).join(',')};
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
    const query = 
    `
        ${transInsertPrice}
        ${transInsertDrugDetail}
    `

    const nameTrigger = 'addInfoDrug';

    try {
      await this.createTrigger('addInfoDrug', 'AFTER', 'INSERT', DATABASE.table.Drug.name, query);
      return await this.createTransaction(transInsertDrug,`DROP TRIGGER ${nameTrigger}`)
    }
    catch (error) {
      return {message: error}
    }
    
  }

  getItemDrug(condition?: string) {
    const query = `SELECT id, tenThuoc FROM ${DATABASE.table.Drug.name} ${condition}`
    return this.createTransaction(query);
  }

  getItemDrugDetail(condition?: string) {
    const query = `SELECT * FROM ${DATABASE.table.DrugDetail.name} ${condition}`
    return this.createTransaction(query);
  }

  getIemPrice(condition?: string) {
    const query = `SELECT * FROM ${DATABASE.table.Price.name} ${condition}`
    return this.createTransaction(query);
  }

  getDetail(id: number) {
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
      'giaBan',
      'donVi',
      'soLuong',
      'trongSo',
    ]
    const nameDrug = DATABASE.table.Drug.name;
    const nameDrugDetail = DATABASE.table.DrugDetail.name;
    const namePrice = DATABASE.table.Price.name;

    const query = 
    `
      SELECT 
      ${listColumn.join(',')}
      FROM ${nameDrug} as D
      JOIN ${nameDrugDetail} as DT
      ON D.id = DT.Drug_Id
      JOIN ${namePrice} as P
      ON D.id = P.Drug_Id
      WHERE D.id = ${id}
      ;
    `
    return this.createTransaction(query);
  }
}



