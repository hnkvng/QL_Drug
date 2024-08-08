import Search from "../../../components/Search"
import { ComponentJSX, ComponentProps } from "../../../services/type"

interface SearchDrugProps {
    value: string,
    setValue: any,
    handleIconRight: any,
}

const SearchDrug : ComponentProps<SearchDrugProps> = (
    {
        value, 
        setValue,
        handleIconRight
    }) : ComponentJSX => {

    return (
        <Search
            value= {value}
            setValue= {setValue}
            iconRight= "barcode-scan"
            handleIconRight={handleIconRight}
        />
    )
}

export default SearchDrug;