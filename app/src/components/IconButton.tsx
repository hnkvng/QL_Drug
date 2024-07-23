import {memo} from "react";
import { ComponentJSX, ComponentProps} from "../services/type";
import { IconButton } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";


interface IconButtonAppProps {
    color? : string, 
    icon : IconSource, 
    size: number,
    handleClick : () => void,
}

const IconButtonApp : ComponentProps<IconButtonAppProps> = ({
    color = "default", 
    icon, 
    size,
    handleClick
    }) : ComponentJSX => {

    return (
        <IconButton
            icon= {icon}
            iconColor={color}
            size={size}
            onPress={handleClick}
        />
    )
}

export default memo(IconButtonApp);