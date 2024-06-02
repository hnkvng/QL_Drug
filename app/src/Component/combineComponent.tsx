import { combineReducers } from 'redux';
import chooseImageSlice from './ChooseImage/slice';
import notifiSlice from './Notifi/slice';
import loadingSlice from './Loading/slice';


const rootModalReducer = combineReducers({
    chooseImage: chooseImageSlice.reducer,
    notifi: notifiSlice.reducer,
    loading: loadingSlice.reducer,
});

export default rootModalReducer;