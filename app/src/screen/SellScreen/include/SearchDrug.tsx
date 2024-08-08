import { StackNavigationProp } from "@react-navigation/stack";
import Search from "../../../components/Search"
import { ComponentJSX, ComponentProps } from "../../../services/type"
import { RootStackParamList } from "../../../services/stackNavigate";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { getCodeScanScreen } from "../../../redux/selection";
import { useState } from "react";

type PropsNavigation = StackNavigationProp<RootStackParamList,
    'scanScreen'
>;


interface SearchDrugProps {
    value: string,
    setValue: any,
    handleFocus: any,
}

const SearchDrug : ComponentProps<SearchDrugProps> = (
    {
        value, 
        setValue,
        handleFocus
    }) : ComponentJSX => {

    const navigation = useNavigation<PropsNavigation>();

    return (
        <Search
            value= {value}
            setValue= {setValue}
            handleFocus= {handleFocus}
            iconRight= "barcode-scan"
            handleIconRight={() => navigation.navigate('scanScreen')}
        />
    )
}

export default SearchDrug;