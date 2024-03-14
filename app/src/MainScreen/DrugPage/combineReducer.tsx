import { combineReducers } from 'redux';
import listDrugSlice from './Component/ListDrug/listDrugSlice';
import menuSlice from './Component/MenuAction/menuSlice';
import buttonOptionSlice from './Component/Button/buttonOptionSlice';
const rootDrugReducer = combineReducers({
    listDrug: listDrugSlice.reducer,
    menu: menuSlice.reducer,
    buttonOption: buttonOptionSlice.reducer, 
});

export default rootDrugReducer;