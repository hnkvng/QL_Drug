import { rootReducer } from "./store";

//Modal
    const getNotifi = (state : rootReducer) => state.Modal.notifi;
    const getLoading = (state : rootReducer) => state.Modal.loading;
    const getSelection = (state : rootReducer) => state.Modal.selection;
    export {
        getNotifi,
        getLoading,
        getSelection,
    }
//


//DrugPage
    const getListDrug = (state: rootReducer ) =>  state.DrugPage.listDrug;
    const getOption = (state: rootReducer) => state.DrugPage.menu;
    const getButtonOption = (state: rootReducer) => state.DrugPage.buttonOption;
    export {
        getListDrug,
        getOption,
        getButtonOption
    }
//

//AddScreen 
    const getAdd = (state: rootReducer) => state.AddScreen.add;
    const getFaceDrug = (state: rootReducer) =>  state.AddScreen.faceDrug;
    const getFormInput = (state: rootReducer) => state.AddScreen.formInput;
    // const getButton = (state : rootReducer) => state.AddScreen.button;
    export {
        getAdd,
        getFaceDrug,
        getFormInput,
        // getButton,
    }
//

//TrushScreen
    const getListItemsDeleted = (state: rootReducer) => state.Trush.listDrugDeleted;
    const getWantAction = (state: rootReducer) => state.Trush.trushDrug;
    const getButtonOptions = (state: rootReducer) => state.Trush.buttonOption;
    export {
        getListItemsDeleted,
        getWantAction,
        getButtonOptions,
    }
//


//ScanScreen
    const getScanController = (state: rootReducer) => state.Scan.controller;
    export {
        getScanController
    }
//