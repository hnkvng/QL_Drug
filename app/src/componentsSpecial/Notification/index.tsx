import { useEffect, memo} from "react";
import { ComponentJSX } from "../../services/type";
import { ActivityIndicator, Snackbar, Text } from 'react-native-paper';
import { Icon } from 'react-native-paper';
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getNotifi } from "../../redux/selection";
import notifiSlice from "./slice";


const NotificationApp = () : ComponentJSX=> {

    const dispatch = useDispatch();
    const {show, loading, icon, color, message} = useSelector(getNotifi);
    const reset = notifiSlice.actions.reset;
    const setShow = notifiSlice.actions.setShow;

    const handleDismiss = () => {
        dispatch(setShow(false))
    }

    useEffect(() => {
        if(loading && !show) {
            dispatch(setShow(true))
        }
    },[loading])

    useEffect(() =>{ 
        if(!show)
            dispatch(reset())
    },[show]) 
 
    return (
        <Snackbar
            visible= {show}
            onDismiss={handleDismiss}
            action={{
                label: 'Ẩn',
                textColor: 'black',
                onPress: handleDismiss,
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
                    color= {color}
                />}
                <Text style = {{marginLeft: 10, color: color}}>
                    {message}
                </Text>
            </View>
            
        </Snackbar>
    );
};

export default memo(NotificationApp);
  