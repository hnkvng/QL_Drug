import Realm from 'realm';
import { Price as typePrice } from '../src/AddDrugScreen/addSlice';
import { Inform } from '../modal/Notifi/notifiSlice';
import { Items } from '../src/MainScreen/DrugPage/Component/ListDrug/listDrugSlice';
import { ItemsDeleted } from '../src/TrushDrugScreen/component/ListDrugDeleted/listDrugDeletedSlice';


export interface Price extends Realm.Dictionary {
    unit: string;
    symbol: string;
    amount: number;
    price: string;
}

export interface ListAdd {
    _id : number, img : string | null, 
    name : string, price : typePrice, 
    NSX : string, HSD : string, 
    regisNumber: string, active: string,
    dosageForms: string, pack: string,
    companySX: string, companyDK: string,
    countrySX: string,countryDK: string
}

export class Drug extends Realm.Object {
    _id!: number;
    img?: string;
    name!: string;
    price!: Price;
    NSX!: string;
    HSD!: string;
    regisNumber!: string;
    active!: string;
    dosageForms!: string;
    pack?: string;
    companySX!: string;
    companyDK!: string;
    countrySX!: string;
    countryDK!: string;
    createdAt!: Date;
    deleted!: false;
    static schema = {
        name: "Drug",
        primaryKey: "_id",
        properties: {
            _id: "int",
            img: "string?",
            name: "string",
            price: "mixed{}",
            NSX: "string",
            HSD: "string",
            regisNumber: "string",
            active: "string",
            dosageForms: "string",
            pack: "string?",
            companySX: "string",
            companyDK: "string",
            countrySX: "string",
            countryDK: "string",
            createdAt: "date",
            deleted: "bool"
        },
        
    }
}


export class QueueDrug {

    getDrug(realm : Realm) : Items[] {   
        const data = realm.objects("Drug").filtered("deleted = false");
        return data.map((item : any) => ({
            id: item._id,
            name:item.name, 
            quantity: item.price.amount 
            + "/" 
            + item.price.unit
        }));
    }
    
    addDrug(
        realm : Realm, listAdd: ListAdd ): Inform {
            
        const existingDrug = realm.objectForPrimaryKey("Drug", listAdd._id);
        if(existingDrug ) {
            return {
                text: "Sản phẩm đã tồn tại!",
                status: "warning"
            }
        } else {
            realm.write(() => {
                realm.create("Drug",{
                    _id: listAdd._id,
                    img: listAdd.img,
                    name: listAdd.name,
                    price: listAdd.price,
                    NSX: listAdd.NSX,
                    HSD:  listAdd.HSD,
                    regisNumber: listAdd.regisNumber,
                    active: listAdd.active,
                    dosageForms: listAdd.dosageForms,
                    pack: listAdd.pack,
                    companySX: listAdd.companySX,
                    companyDK: listAdd.companyDK,
                    countrySX: listAdd.countrySX,
                    countryDK: listAdd.countryDK,
                    createdAt: new Date(),
                    deleted: false
                })
            }) 
            return {
                text: "Thêm thành công!",
                status: "success"   
            }  
        }
       
    }

    softDelete(realm: Realm, id: number[]) : Inform  {
        const drugsToSoftDelete = realm.objects("Drug").filtered("_id IN $0",id)
        if(drugsToSoftDelete) {
            realm.write(async () => {
                await drugsToSoftDelete.forEach((item) => {
                    item.deleted = true;
                })
            })
            return {
                text: "Xóa thành công!",
                status: "success",
            };
        }
        return {
            text: "Xóa Không thành công!",
            status: "warning",
        };
    }
}


export class QueueTrush {

    getDrug(realm : Realm) : ItemsDeleted[] {
        const data = realm.objects("Drug").filtered("deleted = true");
        return data.map((item : any) => ({
            id: item._id,
            name:item.name, 
        }));
    }

    retoreDrug(realm: Realm, id: number[]) : Inform {
        const drugsToSoftDelete = realm.objects("Drug").filtered("_id IN $0",id)
        if(drugsToSoftDelete) {
            realm.write(async () => {
                await drugsToSoftDelete.forEach((item) => {
                    item.deleted = false;
                })
            })
            return {
                text: "Khôi phục thành công!",
                status: "success",
            };
        }
        return {
            text: "Khôi phục không thành công!",
            status: "warning",
        };
    }

    deleteDrug(realm: Realm, id: number[]) : Inform {
        const drugsToDelete = realm.objects("Drug").filtered("_id IN $0",id)
        if (drugsToDelete) {
            try {
                realm.write(async () => {
                    await realm.delete(drugsToDelete);
                });
                return {
                    text: "Xóa thành công!",
                    status: "success",
                };
            } catch {
                return {
                    text: "Xảy ra lỗi!",
                    status: "error",
                };
            } 
        } else {
            return {
                text: "Id không hợp lệ!",
                status: "warning",
            };
        }
    }
}