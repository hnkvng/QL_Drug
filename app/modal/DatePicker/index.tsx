import React, { useCallback, useEffect } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch, useSelector } from "react-redux";
import datePickerSlice, { typeOfDatePicker } from "./dataPickerSlice";
import { getDataPicker } from "../../redux/selection";

interface DatePicker {
    handleConfirm:(data : Date) => void
}


const ModalDate : React.FC<DatePicker> = ({handleConfirm}) : React.JSX.Element => {
    const dispatch = useDispatch();

    const datePicker : typeOfDatePicker = useSelector(getDataPicker);
    const reset = datePickerSlice.actions.reset;
    
    const hideDatePicker = useCallback(() : void => {
        dispatch(reset())
    },[])

    useEffect(() => {
        return () => {
            dispatch(reset())
        }
    },[])
    return (
        <DateTimePickerModal
            isVisible={datePicker.show}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
        />
    )
}
export default ModalDate