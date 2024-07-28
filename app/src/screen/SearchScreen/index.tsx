import { SafeAreaView } from "react-native-safe-area-context";
import { ComponentJSX } from "../../services/type";
import SearchbarApp from "./include/SearchbarApp";
import { useState } from "react";
import ListSearch from "./include/ListSearch";
import { FlatList } from "react-native-gesture-handler";

const SearchScreen = () : ComponentJSX => {
    const [searchQuery, setSearchQuery] = useState('')
    const list = [
        { id: 1, title: 'Paracetamol' },
        { id: 2, title: 'Ibuprofen' },
        { id: 3, title: 'Aspirin' },
        { id: 4, title: 'Amoxicillin' },
        { id: 5, title: 'Ciprofloxacin' },
        { id: 6, title: 'Paracetamol' },
        { id: 7, title: 'Ibuprofen' },
        { id: 8, title: 'Aspirin' },
        { id: 9, title: 'Amoxicillin' },
        { id: 10, title: 'Ciprofloxacin' },
    ]
    return (
        <SafeAreaView style = {{flex: 1}}>
            <SearchbarApp
                searchQuery= {searchQuery}
                setSearchQuery= {setSearchQuery}
            />
            <FlatList
                data={list}
                renderItem={(item) => (
                    <ListSearch
                        item={item}
                    />
                )}
            />
        </SafeAreaView>
    )
}

export default SearchScreen;