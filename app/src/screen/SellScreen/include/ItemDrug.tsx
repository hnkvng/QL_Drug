import { Image, View } from "react-native";
import { ComponentJSX, ComponentProps } from "../../../services/type";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconButton, Text, Title } from "react-native-paper";
import { theme } from "../../../services/theme";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Database } from "../../../services/db";
import { useDispatch, useSelector } from "react-redux";
import cartSlice from "../../../componentsSpecial/Cart/slice";
import Modal from "../../../components/Modal";
import ComboBox from "../../../components/ComboBox";
import Button from "../../../components/Button";
import { getCodeScanScreen } from "../../../redux/selection";
import notifiSlice from "../../../componentsSpecial/Notification/slice";
import { DATABASE } from "../../../services/config";

interface ItemDrugProps {
    id: number,
    avatar: string,
    tenThuoc: string,
}

const ItemDrug : ComponentProps<ItemDrugProps> = (
    {
        id,
        avatar,
        tenThuoc,
    }
    ) : ComponentJSX => {

    const dispatch = useDispatch();
    const db = useMemo(() => new Database(),[]);

    const [openModal, setOpenModal] = useState(false);
    const [options, setOption] = useState<{
        label: string,
        value: string,
    }[]>([]);
    const [unit, setUnit] = useState('');
    const [price, setPrice] = useState<{
        giaBan: string,
        donVi: string,
        heSo: number,
    }[]>([]);

    const barcode = useSelector(getCodeScanScreen);

    const setListItemCart = cartSlice.actions.setListItem;
    const handleSusscess = notifiSlice.actions.handleSusscess;
    const handleWarn =  notifiSlice.actions.handleWarn;

    const handleUnit = useCallback(() => {
        db.getItem(['giaBan','donVi','quyCach'], DATABASE.table.Price.name,`WHERE Drug_Id = ${id}`)
        .then((data : any) => {
            const item : {
                giaBan: string,
                donVi: string,
                heSo: number,
            }[]= [];

            for(let index = 0; index < data.rows.length; index++) {
                let heSo = 1;
                for(let jdex = index + 1; jdex < data.rows.length; jdex++) {
                    heSo *= data.rows.item(jdex).quyCach;
                }
                item.push({
                    giaBan: data.rows.item(index).giaBan,
                    donVi: data.rows.item(index).donVi,
                    heSo: heSo,
                })
                
            }
            if(item.length === 1) {
                handleAddCart(item, item[0].donVi);
            } else {
                setOpenModal(true);
                setOption(item.map((item) => ({label: item.donVi, value: item.donVi})));
            }
            setPrice(item);
        })
        .catch((err) => {
            console.log(err)
        })
    },[])

    const handleAddCart = useCallback((
        price : {
            giaBan: string,
            donVi: string,
            heSo: number,
        }[], 
        unit : string
    ) =>{ 
        const fillPrice = price.filter((item) => item.donVi === unit)[0];
        const {donVi, giaBan, heSo} = fillPrice;
        dispatch(setListItemCart(
            {
                id: id,
                avatar: avatar,
                tenThuoc: tenThuoc,
                giaBan: giaBan,
                donVi: donVi,
                heSo: heSo,
            }
        ));
        dispatch(handleSusscess('Thêm vào giỏ hàng thành công'))
        setOpenModal(false);
    },[]);

    useEffect(() => {
        if(barcode === id.toString()) {
            handleUnit();
            
        }
    },[barcode, price])

    useEffect(() => {
        if(!openModal) {
            setUnit('');
            setPrice([]);
        }
    },[openModal])

    return (
        <SafeAreaView
            style = {{
                flex: 1,
                height: 60,
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
                        style = {{width: 50,objectFit: 'cover', height: 50, borderRadius: 10,}}
                        source={
                            avatar ? {uri: avatar} 
                            : require('../../../assets/imageDrug.jpg')
                        }
                    />
                </View>
                <View style = {{display: 'flex', padding: 10, width: 200}}>
                    <Text numberOfLines={1} style = {{fontSize: 17}}>{tenThuoc}</Text>
                    <Text style = {{fontSize: 12}}>{id}</Text>
                </View>
            </View>
            
            <IconButton
                style = {{position: 'absolute', right: 5,}}
                size= {30}
                icon= "cart-plus"
                iconColor= {theme.colors.mainColor}
                onPress={handleUnit}
            />
            <Modal
                style = {{padding: 10,}}
                visible = {openModal}
                setVisible= {setOpenModal}
                children={
                    <View style =  {{ display: 'flex', justifyContent:'space-between',backgroundColor: 'white', height: 200, padding: 10, borderRadius: 10}}>
                        <Title style = {{textAlign: 'center'}}>Chọn Đơn vị</Title>
                        <View>
                            <ComboBox
                                options= {options}
                                handleChange= {setUnit}
                                placeholder= {"Chọn đơn vị"}
                            />
                        </View>
                        <Button
                            name="Thêm vào giỏ hàng"
                            mode= "contained"
                            disabled = {unit ? false : true}
                            textColor= 'white'
                            handleClick={() => handleAddCart(price, unit)}
                            style={{backgroundColor: theme.colors.mainColor}}
                        />
                    </View>
                }
            >

            </Modal>
        </SafeAreaView>
    )
}

export default ItemDrug;