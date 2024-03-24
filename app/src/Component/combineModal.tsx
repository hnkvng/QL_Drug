import { combineReducers } from 'redux';
import selectionSlice from './Selection/selectionSlice';
import notifiSlice from './Notifi/notifiSlice';
import loadingSlice from './Loading/loadingSlice';


const rootModalReducer = combineReducers({
    selection: selectionSlice.reducer,
    notifi: notifiSlice.reducer,
    loading: loadingSlice.reducer,
});

export default rootModalReducer;