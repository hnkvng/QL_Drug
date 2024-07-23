import { memo} from "react";
import { ComponentJSX, ComponentProps} from "../services/type";
import { Button } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";
import { ViewStyle } from "react-native";


interface ButtonAppProps {
    style?: ViewStyle,
    name?: string,
    textColor?: string,
    mode?:  "text" | "outlined" | "contained" | "elevated" | "contained-tonal",
    icon?: IconSource | undefined,
    disabled?: boolean,
    handleClick: () => void
}

const ButtonApp : ComponentProps<ButtonAppProps> = ({
    style,
    name, 
    mode = "outlined",
    icon, 
    textColor,
    disabled, 
    handleClick
    }) : ComponentJSX => {

    return (
        <Button
            style= {style}
            textColor= {textColor}
            icon= {icon}
            mode= {mode}
            disabled= {disabled}
            onPress={handleClick}
        >
            {name}
      </Button>
    )
}

export default memo(ButtonApp);