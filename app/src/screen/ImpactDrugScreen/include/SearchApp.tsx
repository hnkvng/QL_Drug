import { useEffect, useState, memo, useCallback } from "react";
import { ComponentJSX, ComponentProps } from "../../../services/type";
import Search from "../../../components/Search";
import { PropsNavigation } from "../../../services/stackNavigate";

interface SearchAppProps {
    navigation: PropsNavigation,
    setData: (
        data: {
            MST: number,
            avatar: string,
            tenThuoc: string,   
        }[]
    ) => void;
    getItemDrug: (search: string) => Promise<any>,

}

const SearchApp : ComponentProps<SearchAppProps> = ({
    navigation,
    setData,
    getItemDrug,
}) : ComponentJSX => {
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        getItemDrug(searchQuery)
        .then((data : any) => {
            const item : {
                MST: number,
                avatar: string,
                tenThuoc: string,   
            }[] = [];
            for(let index = 0; index < data.rows.length; index++) {
                item.push({...data.rows.item(index), MST: data.rows.item(index).MST})
            }
            setData(item);
        })
        .catch((error) => {
            console.log(error)
        })
    },[searchQuery]);

    const handleIconRight = useCallback(() => {
        navigation.navigate('scanScreen')
    },[])

    return (
        <Search
            value= {searchQuery}
            setValue= {setSearchQuery}
            iconRight= "barcode-scan"
            handleIconRight= {handleIconRight}
        />
    )
}

export default memo(SearchApp);