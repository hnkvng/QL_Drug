import { createSelector } from "reselect";
import { rootReducer } from "../services/type";
import MenuSelectSlice from "../screen/DrugScreen/include/MenuSelect/slice";

export const getCodeScanScreen = (state: rootReducer) => state.scanScreen.code;
export const getMenu = (state: rootReducer) => state.drugScreen.menuSelectSlice;
export const getSearch = (state: rootReducer) => state.drugScreen.searchDrugSlice.search;
export const getNotifi = (state: rootReducer) => state.componentSpecial.notifi;
export const getCart = (state: rootReducer) => state.componentSpecial.cart;
 
export const listCheckBoxChip = createSelector(
    getMenu,
    ({checkAll, checkNotExpired, checkNearExpired, checkExpired}) => {
        const setCheckAll = MenuSelectSlice.actions.setCheckAll;
        const setCheckNearExpired = MenuSelectSlice.actions.setCheckNearExpired;
        const setCheckNotExpired = MenuSelectSlice.actions.setCheckNotExpired;
        const setCheckExpired = MenuSelectSlice.actions.setCheckExpired;

        const listChip = [
            {
                name: 'Tất cả', 
                action: setCheckAll,
                helperText: "Toàn bộ thuốc có trong kho"
            },
            {
                name: 'Thuốc còn hạn',
                action: setCheckNotExpired,
                helperText: "Thuốc có hạn sử dụng còn lại lớn hơn 30 ngày"
            },
            {
                name: 'Thuốc gần hết hạn',
                action: setCheckNearExpired,
                helperText: "Thuốc có hạn sử dụng còn lại nhỏ hơn 30 ngày"
            },
            {
                name: 'Thuốc đã hết hạn',
                action: setCheckExpired,
                helperText: "Thuốc đã quá thời hạn sử dụng"
            }
        ]

        return [checkAll, checkNotExpired, checkNearExpired, checkExpired].reduce(
            (todo : {name: string, action: any, helperText: string}[], item, index) => {
            if(item) 
                todo.push(
                    {
                        name: listChip[index].name, 
                        action: listChip[index].action,
                        helperText: listChip[index].helperText
                    }
                );
            return todo;
        }, [])
    }
)

export const querySearchDrug = createSelector(
    getSearch,
    getMenu,
    (search,{checkAll, checkNotExpired, checkNearExpired, checkExpired}) => {
        const query = [`tenThuoc LIKE '%${search}%'`];
        const listQuery = [
            "HSD > DATE('now', '+30 days')",
            "HSD <= DATE('now', '+30 days')",
            "HSD <  DATE('now')"
        ]
        if(checkAll) {
            return `WHERE ${query.join('')}`
        } else {
            const queryList = [checkNotExpired, checkNearExpired, checkExpired].reduce(
                (todo : string[], item, index) => {
                    if(item)
                        todo.push(listQuery[index])
                    return todo
                },[])
            if(search)
                return `WHERE ${[...query, ...queryList].join(' OR ')}`
            else if (queryList.length != 0)   
                return `WHERE ${queryList.join(' OR ')}`
            else
                return `WHERE tenThuoc LIKE ''`
        }
    }
)

export const mathSumPrice =  createSelector(
    getCart,
    ({listItem}) => {
        return listItem.reduce((sum, item) => {
            sum += parseInt(item.giaBan.replace('.','')) * item.soLuong;
            return sum
        },0)
    }
)