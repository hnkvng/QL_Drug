import { useEffect, useState, memo, ChangeEvent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-searchable-dropdown-kj';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ComponentJSX, ComponentProps } from '../services/type';
import { HelperText } from 'react-native-paper';
import { TextInput } from 'react-native-gesture-handler';
import { theme } from '../services/theme';
import { FormikErrors } from 'formik';
import { FormDrug } from '../services/interface';

interface AutoDropdownProps {
  label: string,
  value?: string,
  values?: any,
  error?: string,
  searchText: string,
  setSearchText: any,
  data:  object[],
  setData: any,
  placeholder?: string,
  iconL: string,
  handleChange: (e: string | ChangeEvent<any>) => void,
  setValues: (values: React.SetStateAction<FormDrug>, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<FormDrug>>,
}

const AutoDropdown : ComponentProps<AutoDropdownProps> = ({
  label,
  data,
  setData,
  value,
  error,
  setSearchText,
  placeholder,
  iconL,
  handleChange,
  setValues
  }) : ComponentJSX => {
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text 
          style={[styles.label, error ? { color: 'red' } :isFocus && { color: theme.colors.mainColor }]}
          numberOfLines={1}
          ellipsizeMode= "middle"
        >
          {label}
        </Text>
      );
    }
    return null;
  };

  useEffect(() => {
    if(!value) {
      setData([])
    } else {
      setSearchText(value)
    }
  },[value, isFocus])
  return (
    <>
      <View style={styles.container}>
        {renderLabel()}
        <Dropdown
          style={[
            styles.dropdown, 
            error ? { borderColor: 'red', borderWidth: 2} 
            : isFocus && { borderColor: theme.colors.mainColor }
          ]}
          placeholderStyle={[styles.placeholderStyle, error ? {color: 'red'} : {}]}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? label : placeholder}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValues((values) => ({
              ...values,
              tenThuoc: item.value,
              soDangKy: item.soDangKy,
              hoatChat: item.hoatChat,
              nongDo: item.nongDo,
              baoChe: item.baoChe,
              dongGoi: item.dongGoi,
              tuoiTho:item.tuoiTho,
              congTySx: item.congTySx,
              nuocSx: item.nuocSx,
              diaChiSx: item.diaChiSx,
              congTyDk: item.congTyDk,
              nuocDk: item.nuocDk,
              diaChiDk: item.diaChiDk,
              nhomThuoc: item.nhomThuoc,
            }))
          }}
          renderInputSearch={() => (
            <TextInput
              style={styles.inputSearchStyle}
              placeholderTextColor= "black"
              placeholder="Search..."
              onChangeText={(text) => {
                setSearchText(text)
              }}
            />
          )}
          renderRightIcon={() => {
            if(value)
              return (
                <AntDesign
                  style={{marginRight:5,}}
                  color= 'black'
                  name= "close"
                  size={20}
                  onPress={() => {
                    setValues((values) => ({
                      ...values,
                      tenThuoc: '',
                      soDangKy: '',
                      hoatChat:'',
                      nongDo: '',
                      baoChe: '',
                      dongGoi: '',
                      tuoiTho:'',
                      congTySx: '',
                      nuocSx: '',
                      diaChiSx: '',
                      congTyDk: '',
                      nuocDk: '',
                      diaChiDk: '',
                      nhomThuoc: '',
                    }))
                  }}
                />
              )
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={error ? 'red' : isFocus ? theme.colors.mainColor : 'black'}
              name= {iconL}
              size={20}
            />
          )}
          
        />
        
      </View>
      <HelperText type="error" visible={error ? true : false}>
        {error}
      </HelperText>
    </>
  );
};

export default memo(AutoDropdown);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding:10,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 15,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    color: 'black',
    left: 22,
    top: 0,
    zIndex: 999,
    paddingHorizontal: 6,
    fontSize: 12,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: 16,
    
    color: 'black'
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    color: 'black',
    fontSize: 16,
  },
});