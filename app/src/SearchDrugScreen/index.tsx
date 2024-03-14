import * as React from 'react';
import { Searchbar } from 'react-native-paper';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = (query : string) => setSearchQuery(query);

  return (
    <Searchbar
      placeholder="Search"
      style = {{margin:10,}}
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );
};

export default SearchScreen;