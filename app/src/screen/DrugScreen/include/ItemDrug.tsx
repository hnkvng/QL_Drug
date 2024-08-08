import { Card, Text } from "react-native-paper";
import { ComponentJSX, ComponentProps } from "../../../services/type";
import { TouchableNativeFeedback, View } from "react-native";
import { Image } from "react-native";
import { PropsNavigation } from "../../../services/stackNavigate";
import { useNavigation } from "@react-navigation/native";
import { memo } from "react";
import { DATA } from "./ListDrug";

interface ItemDrugProps {
    item: DATA,
}

const ItemDrug : ComponentProps<ItemDrugProps> = ({
    item,
}) : ComponentJSX => {
    const {
        MST,
        avatar,
        tenThuoc,
        soDangKy,
        NSX,
        HSD 
    } = item;
    
    const navigation = useNavigation<PropsNavigation>();

    return (
        <TouchableNativeFeedback
            onPress={() => navigation.navigate('detailScreen', {MST: MST})}
        >
        <Card style = {{ height: 100, margin: 10}}>
            <View style = {{height: "100%", display: 'flex', flexDirection: 'row', alignItems:'center'}}>
                <View style = {{padding: 10}}>
                    <Image
                        source={avatar ? 
                            { uri: avatar } 
                            : require('../../../assets/imageDrug.jpg')
                        }
                        style = {{width: 80, objectFit: 'cover', height: 80, borderRadius: 10}}
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

export default memo(ItemDrug);