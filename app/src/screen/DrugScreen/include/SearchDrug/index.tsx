import { useDispatch, useSelector } from "react-redux"
import { ComponentJSX, ComponentProps } from "../../../../services/type"
import { getCodeScanScreen, getSearch } from "../../../../redux/selection";
import Search from "../../../../components/Search";
import searchSlice from "./slice";
import { memo, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { PropsNavigation } from "../../../../services/stackNavigate";

interface SearchDrugProps {
    setVisible: (show : boolean) => void,
}

const SearchDrug : ComponentProps<SearchDrugProps> = ({
    setVisible
}) : ComponentJSX => {

    const navigation = useNavigation<PropsNavigation>();
    const dispatch = useDispatch();
    const searchQuery = useSelector(getSearch);
    const barcode = useSelector(getCodeScanScreen);
    const setSearchQuery = searchSlice.actions.setSearch;
    
    useEffect(() => {
        if(barcode) {
            setTimeout(() => navigation.navigate('detailScreen', {MST: parseInt(barcode)}),500)
        }
    },[barcode])
    return (
        <Search
            value= {searchQuery}
            setValue={(value : string) => dispatch(setSearchQuery(value))}
            iconRight= 'barcode-scan'
            handleIconRight={() => navigation.navigate('scanScreen')}
            handleIconSearch={() => setVisible(true)}
        />
    )
}
export default memo(SearchDrug);