import {deleteDatabase, enablePromise, openDatabase, SQLiteDatabase} from 'react-native-sqlite-storage';
import { DrugItem, FormDrug, PriceItem } from './interface';

const Drug = {
  name: 'Drug',
  column: [
    'avatar',
    'MST',
    'tenThuoc',
    'soDangKy',
    'NSX',
    'HSD'
  ]
}
const Price = {
  name: 'Price',
  column: [
    'MST',
    'giaBan',
    'donVi',
    'soLuong',
  ]
}

enablePromise(true);

export const getDBConnection = async () => {
    return openDatabase({name: 'Medicine', createFromLocation: '~Medicine.db'});
};

export const deleteDB = async () => {
  return deleteDatabase({name: 'Medicine', createFromLocation:'~Medicine.db'});
}

export const getDrugItems = async (db: SQLiteDatabase, arrange: "ASC" | "DESC"): Promise<DrugItem[]> => {
  try {
    const drugItem: DrugItem[] = [];
    const results = await db.executeSql(`SELECT * FROM ${Drug.name} ORDER BY tenThuoc ${arrange}`);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        drugItem.push(result.rows.item(index))
      }
    });
    return drugItem;
  } catch (error : any) {
    throw Error(error.message)
  }
};

export const getMemberDrug = async (db: SQLiteDatabase, date: "expired" | "almost expired" | "" = "" ) : Promise<{
  sum: number,
  expired: number,
  almostExpired:number,
}> => {
  try {
    const sum = await db.executeSql(`SELECT * FROM ${Drug.name}`);
    const almostExpired = await db.executeSql(`SELECT HSD FROM ${Drug.name} WHERE HSD <= DATE('now', '+30 days')`);
    const expired = await db.executeSql(`SELECT HSD FROM ${Drug.name} WHERE  HSD <=  DATE('now')`);
    
    return {
      sum: sum[0].rows.length,
      almostExpired: almostExpired[0].rows.length,
      expired: expired[0].rows.length,
    }
  } catch (error : any) {
    throw Error(error.message)
  }
}

export const saveDrugItems = async (db: SQLiteDatabase, FormAdd: FormDrug) => {
  
  const {avatar, MST, tenThuoc, soDangKy, NSX, HSD, giaBan} = FormAdd;
  const transInsertDrug = 
  `
    INSERT INTO ${Drug.name} (${Drug.column.join(',')})
    VALUES ('${avatar}', ${MST}, '${tenThuoc}', '${soDangKy}', '${NSX}', '${HSD}');
  `
  const transInsertPrice = 
  `
    INSERT INTO ${Price.name} (${Price.column.join(',')})
    VALUES ${giaBan.map(value => `(${MST}, '${value.giaBan}', '${value.donVi}' ,${value.soLuong})`).join(',')};
  `
  try {
    await db.executeSql(transInsertDrug);
    await db.executeSql(transInsertPrice);
    return {message: "Thêm thuốc thành công"}
  } catch (error) {
    throw error
  }
  
};



