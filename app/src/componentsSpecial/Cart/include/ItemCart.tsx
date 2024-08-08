import { SafeAreaView, View, Image, TouchableOpacity} from "react-native";
import { ComponentJSX, ComponentProps } from "../../../services/type";
import { Icon, Text, Title, } from "react-native-paper";
import InputSpinner from "react-native-input-spinner";
import { theme } from "../../../services/theme";
import { useDispatch } from "react-redux";
import cartSlice from "../slice";


interface ItemDrugProps {
    index: number,
    id: number,
    avatar: string,
    tenThuoc: string, 
    giaBan: string,
    soLuong: number,
    donVi: string,
}

const ItemCart : ComponentProps<ItemDrugProps>  = (
    {
        index,
        id,
        avatar,
        tenThuoc,
        giaBan,
        soLuong,
        donVi,
    }
) : ComponentJSX => {

    const dispatch = useDispatch();

    const dropItem = cartSlice.actions.dropItem;
    const setSoLuong = cartSlice.actions.setSoLuong;
    

    return (
        <View
            style = {{
                flex: 1,
                margin: 10,
                borderWidth: 0.5,
                borderRadius: 10,
            }}
        >
            <View
                style = {{
                    display: 'flex',
                    flexDirection: 'row'
                }}
            >
                <View
                    style = {{
                        display: 'flex',
                        height: "100%",
                        padding: 10,
                    }}
                >  
                    <Image
                        style = {{width: 90, objectFit: 'contain', height: 120, borderRadius: 10,}}
                        source={
                            avatar ? {uri: avatar} 
                            : require('../../../assets/imageDrug.jpg')
                        }
                    />
                    
                </View>
                <View style = {{display: 'flex', padding: 5}}>
                    <Title>{tenThuoc}</Title>
                    <Text style = {{fontSize: 17, fontWeight: 700, opacity: 0.6}} >{giaBan}₫</Text>
                    <Text style = {{fontSize: 13,opacity: 0.6}}>Loại: {donVi}</Text>
                    <View style = {{marginLeft: 30, padding: 10}}>
                        <InputSpinner
                            min={1}
                            max={999}
                            step={1}
                            value={soLuong}
                            width={35}
                            height={35}
                            fontSize={13}
                            buttonFontSize={20}
                            buttonStyle = {{backgroundColor: theme.colors.mainColor}}
                            onChange={(num : number) => {
                                dispatch(setSoLuong({index: index, soLuong: num}))
                            }}
                        />
                    </View>
                </View>
                <TouchableOpacity 
                    style = {{position: 'absolute', right: 0, bottom: 0, padding: 10}}
                    onPress={() => dispatch(dropItem({id: id, donVi: donVi}))}
                >
                    <Icon source= 'delete' color="red" size={25}></Icon>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ItemCart;