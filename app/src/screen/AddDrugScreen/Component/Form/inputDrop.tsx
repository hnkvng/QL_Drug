import { FormikValues } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { getFormInput } from '../../../../../redux/selection';
import formInputSlice, { getSearchDrug } from './formSlice';
import { useAppDispatch } from '../../../../../redux/store';



interface InputDropdownProps {
    label: string,
    errors: any,
    textID: string,
    values: FormikValues,
    placeholder: string,
    setValues: (values: any) => any,
}

const InputDropdown : React.FC<InputDropdownProps>= ({
    label, errors, placeholder,
    setValues, values, textID
        
}) : React.JSX.Element => {

    const dispatch = useDispatch();
    const appDispatch = useAppDispatch();

    const [isFocus, setIsFocus] = useState<boolean>(false);
    const [value, setValue] = useState(null);
    const [data, setData] = useState<any>([]);
    const [textSearch, setTextSearch] = useState<string | null>(null);

    const outData = useSelector(getFormInput).outData;
    const searchDrug : object[] = useSelector(getFormInput).data;

    const setSelection = formInputSlice.actions.setData;

   

    const handleSearch = useCallback((text : string) => {
        appDispatch(getSearchDrug(text));
        setTextSearch(text);
    },[]);

    useEffect(() => {
        if(values[textID] ===  ''  ) {
            setValue(null);
        }
    },[values]);

    useEffect(() => {
        if(value === null) {
            setValues({
                ...values,
                'name':''
            });
        } else {
            dispatch(setSelection(outData[value]))
        }
    },[value]);

    useEffect(() => {
        if(textSearch) {
            setData(searchDrug);
            setValue(null)
        } else if(value === null) {
            setData([]);
        }
    },[searchDrug]);

    const renderLabel = () => {
        if (value === null && isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }, errors && {color:'red'}]}>
                    {placeholder}
                </Text>
            );
        }
        return null;
    };

    return (
        <View style={styles.container}>
            {renderLabel()}
            <Dropdown
                style={[
                    styles.dropdown, 
                    isFocus && { borderColor: 'blue' },
                    errors && { borderColor:'red',  borderWidth: 2 }
                ]}
                placeholderStyle={[
                    styles.placeholderStyle, 
                    errors && {color:'red'}
                ]}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? label : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChangeText={text =>  handleSearch(text)}
                onChange={(item : any) => {
                    setValues({
                        ...values,
                        'name':item.label
                    });
                    setValue(item.value)
                    setIsFocus(false);
                    setTextSearch(null);
                }}
            />
            {errors && <Text style = {styles.errorText}>{errors}</Text>}
        </View>
    );
};

export default InputDropdown;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        margin:5,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        width:'90%',
        position: 'absolute',
        backgroundColor: 'white',
        left: 8,
        top: 14,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 16,
    },
    placeholderStyle: {
        padding:6,
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    }
});