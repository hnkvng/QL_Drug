import { combineReducers } from 'redux';

import buttonOptionSlice from './component/Button/buttonOptionSlice';
import trushDrugSlice from './trushDrugSlice';
import listDrugDeletedSlice from './component/ListDrugDeleted/listDrugDeletedSlice';

const rootTrushDrugReducer = combineReducers({
    trushDrug: trushDrugSlice.reducer,
    listDrugDeleted: listDrugDeletedSlice.reducer,
    buttonOption: buttonOptionSlice.reducer, 
});

export default rootTrushDrugReducer;