import { useDispatch, useSelector } from "react-redux"
import { ComponentJSX, ComponentProps } from "../../../../services/type"
import { getSearch } from "../../../../redux/selection";
import Search from "../../../../components/Search";
import SearchSlice from "./slice";

interface SearchDrugProps {
    setVisible: (x : boolean) => void,
}

const SearchDrug : ComponentProps<SearchDrugProps> = ({
    setVisible
}) : ComponentJSX => {

    const dispatch = useDispatch();

    const searchQuery = useSelector(getSearch);
    
    const setSearchQuery = SearchSlice.actions.setSearch;
    
    return (
        <Search
            value= {searchQuery}
            setValue={(value : string) => dispatch(setSearchQuery(value))}
            handleIconSearch={() => setVisible(true)}
        />
    )
}
export default SearchDrug;