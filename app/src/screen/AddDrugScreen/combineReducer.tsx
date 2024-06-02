import { combineReducers } from "redux";
import imageDrugSlice from "./Component/ImageDrug/slice";
import FormInputSlice from "./Component/FormInput/slice";
import inputPlusSlice from "./Component/FormInput/Component/slice/inputPlusSlice";
import priceUnitSlice from "./Component/FormInput/Component/slice/priceUnitSlice";


const rootAddReduce = combineReducers({
    imgDrug: imageDrugSlice.reducer,
    input: FormInputSlice.reducer,
    inputPlus: inputPlusSlice.reducer,
    priceUnit: priceUnitSlice.reducer,
})

export default rootAddReduce;