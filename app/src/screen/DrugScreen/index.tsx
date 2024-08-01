import { Alert, SafeAreaView, Text, View} from "react-native";
import { ComponentJSX } from "../../services/type";
import Search from "../../components/Search";
import { useState } from "react";
import { Chip } from "react-native-paper";
import MenuSelect from "./include/MenuSelect";
import { useDispatch, useSelector } from "react-redux";
import { listCheckBoxChip } from "../../redux/selection";
import ListDrug from "./include/ListDrug";
import SearchDrug from "./include/SearchDrug";

const DrugScreen = () : ComponentJSX => {

    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);

    const listChip = useSelector(listCheckBoxChip);
    
    return (
        <SafeAreaView style = {{flex:1}}>
            <View style = {{display: 'flex', flexDirection: 'column'}}>
                <SearchDrug setVisible={setVisible}/>
                <View style = {{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap',marginTop: -10, marginRight: 20, marginLeft: 20}}>
                    {
                        listChip?.map((item, index) => 
                            <Chip 
                                key= {index}
                                style = {{margin: 5}}
                                onPress= {() => Alert.alert(item.helperText)}
                                onClose= {() => dispatch(item.action())}
                            >
                                {item.name}
                            </Chip>
                        )
                    }
                </View>
            </View>
            <ListDrug/>
            <MenuSelect
                visible = {visible}
                setVisible= {setVisible}
            />
        </SafeAreaView>
    );
}

export default DrugScreen;