
import { StyleSheet, View } from "react-native";
import { ComponentJSX, ComponentProps} from "../services/type";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SelectDropdown from 'react-native-select-dropdown';
import { Text } from "react-native-paper";


interface ComboBoxProps {
    placeholder : string, 
    options: {
      label: string,
      value: string,
    }[],
    handleChange : any, 
}

const ComboBox : ComponentProps<ComboBoxProps> = ({
    placeholder, 
    options,
    handleChange,
}) : ComponentJSX => {
    
    return (
      <SelectDropdown
        data={options}
        onSelect={(selectedItem) => {
          handleChange(selectedItem.value)
        }}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View style={styles.dropdownButtonStyle}>
              <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem && selectedItem.label) || placeholder}
              </Text>
              <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
            </View>
          );
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
              <Text style={styles.dropdownItemTxtStyle}>{item.label}</Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
      />
    );
}

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: "100%",
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
    color: 'black'
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
    color: 'black'
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
    
  },
});

export default ComboBox;

