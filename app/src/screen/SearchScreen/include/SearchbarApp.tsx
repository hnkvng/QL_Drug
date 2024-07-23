import { Searchbar } from 'react-native-paper';
import { ComponentJSX, ComponentProps } from '../../../services/type';
import { useEffect, useState } from 'react';
import { theme } from '../../../services/theme';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../services/stackNavigate';
import { useSelector } from 'react-redux';
import { getCodeScanScreen } from '../../../redux/selection';

interface SearchbarAppProps {
  searchQuery: string,
  setSearchQuery: any,
}

type PropsNavigation = StackNavigationProp<RootStackParamList,
    'scanScreen'
>;

const SearchbarApp : ComponentProps<SearchbarAppProps> = ({
  searchQuery,
  setSearchQuery,
  }) : ComponentJSX => {
  
  const navigation = useNavigation<PropsNavigation>();
  // const barCode =  useSelector(getCodeScanScreen);

  // useEffect(() => {
  //   if(barCode) {
  //     setSearchQuery(barCode)
  //   }
  // },[barCode])
  
  return (
    <Searchbar
      style = {{
        backgroundColor: theme.colors.mainColor,
        margin: 10,
      }}
      inputStyle= {{color: 'white'}}
      placeholderTextColor= "white"
      
      cursorColor="white"
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}
    />
  );
};

export default SearchbarApp;