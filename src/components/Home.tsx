/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState, useContext, useRef} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {PhotoContext} from '../App';
import CLIENT_ID from '../../env';
import {useCallback} from 'react';

const Home = ({navigation}) => {
  interface IsSearch {
    search: string;
    api: string;
  }

  const [searchQuery, setSearchQuery] = useState<IsSearch['search']>('');
  const [photos, setPhotos] = useState([]);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedOrientation, setSelectedOrientation] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const photoContext = useContext(PhotoContext);
  const [currentPage, setCurrentPage] = useState(1);
  const apiEndPoint: IsSearch['api'] = `https://api.unsplash.com/search/photos?&query=${searchQuery}&client_id=${CLIENT_ID.CLIENT_ID}&page=${currentPage}`;

  const colorRef = useRef({});
  const orientationRef = useRef({});
  const colors = [
    {
      property: 'Black & White',
      value: 'black_and_white',
    },
    {
      property: 'Black',
      value: 'Black',
    },
    {
      property: 'White',
      value: 'white',
    },
    {
      property: 'Yellow',
      value: 'yellow',
    },
    {
      property: 'Orange',
      value: 'orange',
    },
    {
      property: 'Red',
      value: 'red',
    },
    {
      property: 'Purple',
      value: 'purple',
    },
    {
      property: 'Magenta',
      value: 'magenta',
    },
    {
      property: 'Green',
      value: 'green',
    },
    {
      property: 'Teal',
      value: 'teal',
    },
    {
      property: 'Blue',
      value: 'blue',
    },
  ];

  const orientation = [
    {
      property: 'Landscape',
      value: 'landscape',
    },
    {
      property: 'Potrait',
      value: 'portrait',
    },
    {
      property: 'Squarish',
      value: 'squarish',
    },
  ];

  const unsplashSearch = useCallback(async () => {
    setIsLoading(true);
    try {
      if (searchQuery) {
        await fetch(urlRouter())
          .then(response => response.json())
          .then(data => setPhotos([...photos, ...data.results]));
        setIsLoading(false);
      } else {
        setIsLoading(false);
        alert('Please enter a valid query');
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      alert('Sorry we are experiencing technical difficulties');
    }
  }, [currentPage, searchQuery, selectedOrientation, selectedColor]);

  const urlRouter = () => {
    switch (true) {
      case selectedColor && !selectedOrientation:
        return `https://api.unsplash.com/search/photos?&query=${searchQuery}&client_id=${CLIENT_ID.CLIENT_ID}&color=${selectedColor}&page=${currentPage}`;
      case selectedOrientation && !selectedColor:
        return `https://api.unsplash.com/search/photos?&query=${searchQuery}&client_id=${CLIENT_ID.CLIENT_ID}&=orientation=${selectedOrientation}&page=${currentPage}`;
      case !selectedColor && !selectedOrientation:
        return `https://api.unsplash.com/search/photos?&query=${searchQuery}&client_id=${CLIENT_ID.CLIENT_ID}&page=${currentPage}`;
      case selectedColor !== '' && selectedOrientation !== '':
        return `https://api.unsplash.com/search/photos?&query=${searchQuery}&client_id=${CLIENT_ID.CLIENT_ID}&page=${currentPage}&&=orientation=${selectedOrientation}&color=${selectedColor}`;
      default:
        return apiEndPoint;
    }
  };

  const clearResults = () => {
    setPhotos([]);
    setSearchQuery('');
    setSelectedColor('');
    setSelectedOrientation('');
    setCurrentPage(1);
    setIsLoading(false);
    colorRef.current.reset();
    orientationRef.current.reset();
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          onPress={() => {
            photoContext.photoDispatch({
              type: 'photoSelected',
              payload: {data: item},
            });
            navigation.navigate('Details');
          }}>
          <Image source={{uri: item.urls.thumb}} style={styles.itemThumbnail} />
        </TouchableOpacity>
      </View>
    );
  };
  const renderLoader = () => {
    return isLoading ? (
      <View style={styles.loaderStyler}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };

  const loadMoreItems = async () => {
    console.log('log more items!');
    await setCurrentPage(currentPage + 1);
    return unsplashSearch();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'default'} />
      <TextInput
        style={styles.input}
        placeholder="Search for photos.."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      <Text>Filters (optional)</Text>
      <SelectDropdown
        data={colors}
        ref={colorRef}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
          setSelectedColor(selectedItem.value);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem.property;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item.property;
        }}
      />
      <SelectDropdown
        data={orientation}
        ref={orientationRef}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
          setSelectedOrientation(selectedItem.value);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem.property;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item.property;
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity style={styles.searchButton} onPress={unsplashSearch}>
          <Text style={styles.searchText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton} onPress={clearResults}>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      </View>
      <Text>{photos.length ? photos.length + ' Results' : ''}</Text>

      <SafeAreaView style={styles.container}>
        <FlatList
          data={photos}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderLoader}
          onEndReached={loadMoreItems}
          onEndReachedThreshold={0.5}
          scrollsToTop={true}
          alwaysBounceVertical={true}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edeff2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 0.5,
    borderColor: '#050505',
    borderRadius: 5,
    width: 363.4,
    height: 60,
    paddingLeft: 10,
    marginBottom: 30,
    backgroundColor: '#fff',
    marginTop: 20,
  },
  spinner: {
    height: 100,
    width: 50,
  },
  itemContainer: {
    borderWidth: 0,
    width: 363.4,
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  itemThumbnail: {
    height: 300,
    marginBottom: 5,
    backgroundColor: '#fff',
  },
  itemDescription: {
    color: 'gray',
    fontSize: 18,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    fontStyle: 'italic',
  },
  clearButton: {
    backgroundColor: '#FBF6E9',
    width: 181.7,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  searchButton: {
    backgroundColor: '#2960df',
    width: 181.7,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 20,
  },
  clearText: {
    padding: 10,
    fontWeight: 'bold',
  },
  searchText: {
    padding: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  loaderStyler: {
    marginVertical: 16,
    alignItems: 'center',
  },
});

export default Home;
