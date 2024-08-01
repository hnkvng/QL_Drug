import { Card, Text } from "react-native-paper";
import { ComponentJSX, ComponentProps } from "../../../services/type";
import { Touchable, TouchableNativeFeedback, View } from "react-native";
import { Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../services/stackNavigate";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../../services/theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import Button from "../../../components/Button";

type PropsNavigation = StackNavigationProp<RootStackParamList,
    'detailScreen'
>;

interface ItemDrugProps {
    id: number,
    avatar: string,
    tenThuoc: string,
    soDangKy: string,
    NSX: string,
    HSD: string, 
}

const ItemDrug : ComponentProps<ItemDrugProps> = (
    {
        id,
        avatar,
        tenThuoc,
        soDangKy,
        NSX,
        HSD
    }
) : ComponentJSX => {
    const navigation = useNavigation<PropsNavigation>();

    return (
        <TouchableNativeFeedback
            onPress={() => navigation.navigate('detailScreen', {id: id})}
        >
        <Card style = {{ height: 100, margin: 10}}>
            <View style = {{height: "100%", display: 'flex', flexDirection: 'row', alignItems:'center'}}>
                <View style = {{padding: 10}}>
                    <Image
                        source={avatar ? 
                            { uri: avatar } 
                            : require('../../../assets/imageDrug.jpg')
                        }
                        style = {{width: 80, height: 80, borderRadius: 10}}
                    />
                </View>
                <View>
                    <Text 
                        numberOfLines = {1} 
                        style = {{fontSize: 16, fontWeight: 700, width: 230}}
                    >
                        {tenThuoc}
                    </Text>
                    <Text style = {{fontSize: 14}}>SĐK: {soDangKy}</Text>
                    <Text style = {{fontSize: 12, opacity: 0.7}}>Ngày sản xuất: {NSX}</Text>
                    <Text style = {{fontSize: 12, opacity: 0.7}}>Hạn sử dụng: {HSD}</Text>
                </View>
            </View>  
        </Card>
        </TouchableNativeFeedback>
    )
}

export default ItemDrug;