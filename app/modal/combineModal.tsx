import { combineReducers } from 'redux';
import datePickerSlice from './DatePicker/dataPickerSlice';
import selectionSlice from './Selection/selectionSlice';
import notifiSlice from './Notifi/notifiSlice';
import loadingSlice from './Loading/loadingSlice';
import factSelectionSlice from './FactSelection/factSelectionSlice';


const rootModalReducer = combineReducers({
    datePicker: datePickerSlice.reducer,
    selection: selectionSlice.reducer,
    factSelection: factSelectionSlice.reducer,
    notifi: notifiSlice.reducer,
    loading: loadingSlice.reducer,
});

export default rootModalReducer;