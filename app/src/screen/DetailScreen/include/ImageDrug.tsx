import { Image } from "react-native";
import { ComponentJSX, ComponentProps } from "../../../services/type";
import { View } from "react-native";

interface ImageDrugProps {
    avatar?: string,
}

const ImageDrug : ComponentProps<ImageDrugProps> = ({
    avatar
    }) : ComponentJSX => {
    return (
        <View style = {{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <View style = {{backgroundColor: 'white', padding: 3,borderBottomRightRadius: 10, 
                        borderBottomLeftRadius: 10,}}>
                <Image
                    style = {{
                        width: 200,
                        height: 200, 
                        borderBottomRightRadius: 10, 
                        borderBottomLeftRadius: 10,
                    }}
                    source={avatar ? {uri: avatar}: require('../../../assets/imageDrug.jpg')}
                />
            </View>

        </View>
        
    )
}

export default ImageDrug;