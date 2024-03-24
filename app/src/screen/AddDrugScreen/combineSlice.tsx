import { combineReducers } from 'redux';
import faceDrugSlice from './Component/FaceDrug/faceDrugSlice';
import formInputSlice from './Component/Form/formSlice';
// import buttonSlice from './Component/Button/buttonSlice';
import addSlice from './addSlice';

const rootAddScreenReducer = combineReducers({
    add: addSlice.reducer,
    faceDrug: faceDrugSlice.reducer,
    formInput: formInputSlice.reducer,
});

export default rootAddScreenReducer;