import { ComponentJSX, ComponentProps } from "../services/type"
import { Searchbar } from "react-native-paper"

interface SearchProps {
    value: string,
    setValue: any,
    handleIconSearch?: any,
}

const Search : ComponentProps<SearchProps> = ({value, setValue, handleIconSearch}) : ComponentJSX => {
    return (
        <Searchbar
            style = {{
                backgroundColor: 'white',
                borderRadius: 10,
                margin: 20,
                height: 50,
            }}
            cursorColor="black"
            placeholder="Search..."
            onChangeText={setValue}
            value={value}
            onIconPress={handleIconSearch}
        />
    )
}

export default Search;