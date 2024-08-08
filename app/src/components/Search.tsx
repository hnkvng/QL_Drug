import { ComponentJSX, ComponentProps } from "../services/type"
import { Searchbar } from "react-native-paper"
import { memo } from "react";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

interface SearchProps {
    value: string,
    iconRight?: IconSource 
    setValue: any,
    handleFocus?: any,
    handleIconSearch?: any,
    handleIconRight?: any,
}

const Search : ComponentProps<SearchProps> = (
    {
        value, 
        setValue,
        iconRight, 
        handleFocus,
        handleIconSearch, 
        handleIconRight
    }) : ComponentJSX => {
    return (
        <Searchbar
            style = {{
                backgroundColor: 'white',
                borderRadius: 10,
                margin: 20,
                height: 50,
            }}
            onFocus={handleFocus && (() => handleFocus(true))}
            onBlur={handleFocus && (() => handleFocus(false))}
            traileringIcon={iconRight}
            onTraileringIconPress={handleIconRight}
            cursorColor="black"
            placeholder="Search..."
            value={value}
            onChangeText={setValue}
            onIconPress={handleIconSearch}
        />
    )
}

export default memo(Search);