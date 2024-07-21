import { useEffect, memo} from "react";
import { ComponentJSX, ComponentProps} from "../services/type";
import { ActivityIndicator, Snackbar, Text } from 'react-native-paper';
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";
import { Icon } from 'react-native-paper';
import { View } from "react-native";


interface NotificationAppProps {
    info: string,
    icon?: IconSource,
    color?: string, 
    loading?: boolean,
    visible: boolean,
    setVisible: any,
}

const NotificationApp : ComponentProps<NotificationAppProps> = ({
    info,
    icon,
    color,
    loading = true,
    visible,
    setVisible
    }) : ComponentJSX=> {

    const onDismissSnackBar = () => setVisible(false);

    useEffect(() => {
        if(loading && !visible) {
            setVisible(true)
        }
    },[visible])
 
    return (
        <Snackbar
            visible= {visible}
            onDismiss={onDismissSnackBar}
            action={{
                label: 'Ẩn',
                textColor: 'black',
                onPress: onDismissSnackBar,
            }}
            style = {{backgroundColor: "white"}}
        >
            <View style = {{display: 'flex', flexDirection: "row"}}>
                {!loading && <Icon 
                    source= {icon} 
                    size= {20} 
                    color= {color}
                />}
                {loading && <ActivityIndicator  
                    animating={true} 
                    color= "black"
                />}
                <Text style = {{marginLeft: 10}}>
                    {info}
                </Text>
            </View>
            
        </Snackbar>
    );
};

export default memo(NotificationApp);
  