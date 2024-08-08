import { Image, View } from "react-native";
import { ComponentJSX, ComponentProps } from "../../../services/type";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconButton, Text } from "react-native-paper";
import { theme } from "../../../services/theme";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../services/stackNavigate";
import { useNavigation } from "@react-navigation/native";


type PropsNavigation = StackNavigationProp<RootStackParamList,
    'addOrReduceScreen'
>;


interface ItemDrugProps {
    id: number,
    avatar: string,
    tenThuoc: string,
    donViTinh: string,
    soLuongTonKho: number,
    
}

const ItemDrug : ComponentProps<ItemDrugProps> = (
    {
        id,
        avatar,
        tenThuoc,
        donViTinh,
        soLuongTonKho,
        
    }
    ) : ComponentJSX => {
    const navigation = useNavigation<PropsNavigation>();

    return (
        <SafeAreaView
            style = {{
                flex: 1,
                height: 75,
                margin: 10,
                backgroundColor: "white",
                borderRadius: 10,
            }}
        >
            <View
                style = {{
                    display: 'flex',
                    flexDirection: "row"
                }}
            >
                <View
                    style = {{
                        display: 'flex',
                        height: "100%",
                        paddingLeft: 5,
                        justifyContent: 'center',
                    }}
                >  
                    <Image
                        style = {{width: 60, height: 60, borderRadius: 10,}}
                        source={
                            avatar ? {uri: avatar} 
                            : require('../../../assets/imageDrug.jpg')
                        }
                    />
                </View>
                <View style = {{display: 'flex', padding: 10, width: 200}}>
                    <Text numberOfLines={1} style = {{fontSize: 17}}>{tenThuoc}</Text>
                    <Text style = {{fontSize: 12}}>{id}</Text>
                    <Text numberOfLines={1} style = {{fontSize: 12}}>Tồn kho: {soLuongTonKho}/{donViTinh}</Text>
                </View>
            </View>
            
            <View
                style = {{
                    position: 'absolute', 
                    right: 5,
                    height:"100%", 
                    display: 'flex', 
                    justifyContent:'center', 
                    alignItems:'center'
                }}
            >
                <IconButton
                    size= {30}
                    icon= "store-edit"
                    iconColor= {theme.colors.mainColor}
                    onPress={() => navigation.navigate('addOrReduceScreen', {MST: id})}
                />
            </View>
           
        </SafeAreaView>
    )
}

export default ItemDrug;