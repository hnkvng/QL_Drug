import {deleteDatabase, enablePromise, openDatabase, SQLiteDatabase} from 'react-native-sqlite-storage';
import { DrugItem, PriceItem } from '../models';

const Drug = {
  name: 'Drug',
  column: [
    'id',
    'name',
    'image',
    'NSX',
    'HSD'
  ]
}
const Price = {
  name: 'Price',
  column: [
    'Drug_ID',
    'price',
    'unit',
    'amount',
  ]
}

enablePromise(true);

export const getDBConnection = async () => {
    return openDatabase({name: 'Medicine', createFromLocation: '~Medicine.db',});
};

export const deleteDB = async () => {
  return deleteDatabase({name: 'Medicine', createFromLocation:'~Medicine.db'});
}

export const getDrugItems = async (db: SQLiteDatabase, arrange: "ASC" | "DESC"): Promise<DrugItem[]> => {
    try {
      const todoItems: DrugItem[] = [];
      const results = await db.executeSql(`SELECT * FROM ${Drug.name} ORDER BY name ${arrange}`);
      results.forEach(result => {
        for (let index = 0; index < result.rows.length; index++) {
          todoItems.push(result.rows.item(index))
        }
      });
      return todoItems;
    } catch (error) {
      console.error(error);
      throw Error('Failed to get todoItems !!!');
    }
};

export const saveDrugItems = async (db: SQLiteDatabase,image: string | null, drugItem: DrugItem) => {
  const img = image ? `'${image}'` : null;
  const transInsertDrug = 
  `
  INSERT INTO ${Drug.name} (${Drug.column.join(',')})
  VALUES (${drugItem.MST}, '${drugItem.name}', ${img}, '${drugItem.NSX}', '${drugItem.HSD}');
  `
  return db.executeSql(transInsertDrug);
};

export const savePriceItems = async (db: SQLiteDatabase,MST: number, priceItem: PriceItem[]) => {
  const transInsertPrice = 
  `
  INSERT INTO ${Price.name} (${Price.column.join(',')})
  VALUES ${priceItem.map(value => `(${MST}, ${value.price}, '${value.unit}' ,${value.amount})`).join(',')};
  `
  return db.executeSql(transInsertPrice);
};


