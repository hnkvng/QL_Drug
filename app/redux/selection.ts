import { rootReducer } from "./store";

const getImgDrug = (state: rootReducer) => state.add.imgDrug;
const getValueInput = (state: rootReducer) => state.add.input;
const getInputPlus = (state: rootReducer) => state.add.inputPlus;
const getPriceUnit = (state: rootReducer) => state.add.priceUnit;
export {
    getImgDrug,
    getValueInput,
    getInputPlus,
    getPriceUnit,
}