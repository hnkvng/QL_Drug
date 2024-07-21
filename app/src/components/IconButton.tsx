import {memo} from "react";
import { ComponentJSX, ComponentProps} from "../services/type";
import { IconButton } from "react-native-paper";


interface IconButtonAppProps {
    color? : 
        "inherit" | 
        "default" | 
        "primary" | 
        "secondary" | 
        "error" | 
        "info" | 
        "success" | 
        "warning", 
    icon : ComponentJSX, 
    handleClick : () => void,
}

const IconButtonApp : ComponentProps<IconButtonAppProps> = ({
    color = "default", 
    icon, 
    handleClick
    }) : ComponentJSX => {

    return (
        <IconButton
            icon="camera"
            // iconColor={MD3Colors.error50}
            size={20}
            onPress={() => console.log('Pressed')}
        />
    )
}

export default memo(IconButtonApp);