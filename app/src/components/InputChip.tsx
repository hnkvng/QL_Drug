import React, {memo} from "react";
import { StyleSheet } from "react-native";
import { Chip,HelperText, IconButton, Text } from 'react-native-paper';
import { View } from "react-native";
import { ComponentJSX, ComponentProps } from "../services/type";
import { TextInput, Icon} from "react-native-paper";
import { FormPrice } from "../services/interface";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";
import { TouchableOpacity } from "react-native-gesture-handler";
import IconButtonApp from "./IconButtonApp";

interface InputChipProps {
    listItem: FormPrice[],
    error?: any,
    label: string,
    icon?: IconSource,
    iconL?: IconSource,
    action: any,
    handleClose: any,
    handlePress: any
}

const InputChip : ComponentProps<InputChipProps> = ({
    listItem,
    label, 
    error,
    iconL,
    icon,
    action,
    handlePress,
    handleClose,
    }) : ComponentJSX => {

    return (
        <View  style = {{display: 'flex'}}>
            <TextInput
                style = {{margin: 10}}
                editable = {false}
                error= {error ? true : false}
                mode= "outlined"
                label= {listItem.length > 0 ? '' : label}
                left = {iconL && <TextInput.Icon icon= {iconL} disabled></TextInput.Icon>}
                right = {
                    listItem.length < 5 
                    ? <TextInput.Icon 
                        icon="plus" 
                        onPress={action}
                    /> : null
                }
                render={() => listItem.length > 0 &&
                    listItem.map((value: FormPrice, index : number) => 
                        <TouchableOpacity
                            key={index}
                            style = {styles.chip}
                            onPress= {() => handlePress(value, index)}
                        >
                            <View style = {{padding: 10,}}>
                                <Icon source= "cash-multiple" size={20} color="green"/>
                            </View>
                            <View 
                                style = {{
                                    display: 'flex', 
                                    justifyContent: 'center', 
                                    backgroundColor:'center',
                                    flexBasis: '70%',
                                    height: "100%"
                                }}
                            >
                                <Text
                                    style = {{width: "100%"}}
                                    numberOfLines={1} 
                                    ellipsizeMode="tail"
                                >
                                    Giá: {value.giaBan}₫
                                </Text>
                                <Text
                                    style = {{width: "100%"}}
                                    numberOfLines={1} 
                                    ellipsizeMode="tail"
                                >
                                    Đơn vị: {value.donVi}
                                </Text>
                                <Text
                                    style = {{width: "100%"}}
                                    numberOfLines={1} 
                                    ellipsizeMode="tail"
                                >
                                    Số lượng: {value.soLuong}
                                </Text>
                            </View>
                            <View style = {{margin:10}}>
                                <IconButtonApp 
                                    icon= "close" 
                                    size={20} 
                                    color="black" 
                                    handleClick={() => handleClose(value)}
                                />
                            </View>
                        </TouchableOpacity>
                        // <Chip 
                        //     key={index}
                        //     textStyle={styles.chip}
                        //     style ={{width: "80%", margin: 10}} 
                        //     icon= {icon} 
                        //     onPress= {() => handlePress(value, index)}
                        //     onClose={() => handleClose(value)}
                        // >
                        //     <View 
                        //         style = {{
                        //             display: 'flex', 
                        //             justifyContent: 'center', 
                        //             backgroundColor:'center',
                        //             width: "100%", 
                        //             height: "100%"
                        //         }}
                        //     >
                        //         <Text
                        //             style = {{width: "100%"}}
                        //             numberOfLines={1} 
                        //             ellipsizeMode="tail"
                        //         >
                        //             Giá: {value.giaBan}₫
                        //         </Text>
                        //         <Text
                        //             style = {{width: "100%"}}
                        //             numberOfLines={1} 
                        //             ellipsizeMode="tail"
                        //         >
                        //             Đơn vị: {value.donVi}
                        //         </Text>
                        //         <Text
                        //             style = {{width: "100%"}}
                        //             numberOfLines={1} 
                        //             ellipsizeMode="tail"
                        //         >
                        //             Số lượng: {value.soLuong}
                        //         </Text>
                        //     </View>
                           
                        // </Chip>
                )}
            >
            </TextInput>
            <HelperText type="error" visible={error ? true : false}>
                {error}
            </HelperText>
        </View>
    );
}

const styles = StyleSheet.create({
    chip: {
        display: 'flex', 
        flexDirection: 'row',
        backgroundColor: 'pink',
        justifyContent: 'center', 
        alignItems: 'center',
        width: "80%",
        minHeight: 80, 
        maxHeight: 100,
        padding: 20,
        margin: 10,
        borderRadius: 5,
    }
})


export default memo(InputChip);