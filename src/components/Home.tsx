/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState, useContext} from 'react';
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
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {PhotoContext} from '../App';
import {CLIENT_ID} from 'react-native-dotenv';

const Home = ({navigation}) => {
  interface IsSearch {
    search: string;
    api: string;
  }

  const [searchQuery, setSearchQuery] = useState<IsSearch['search']>('');
  const [data, setData] = useState([]);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedOrientation, setSelectedOrientation] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const photoContext = useContext(PhotoContext);
  const apiEndPoint: IsSearch['api'] = `https://api.unsplash.com/search/photos?page=1&query=${searchQuery}&client_id=${CLIENT_ID}&page=1`;

  const unsplashSearch = async () => {
    if (searchQuery) {
      setIsLoading(true);
      await fetch(urlRouter())
        .then(response => response.json())
        // eslint-disable-next-line @typescript-eslint/no-shadow
        .then(data => setData(data.results));
    } else {
      alert('Please enter a valid query');
    }
  };

  const urlRouter = () => {
    switch (true) {
      case selectedColor && !selectedOrientation:
        return `https://api.unsplash.com/search/photos?page=1&query=${searchQuery}&client_id=${CLIENT_ID}&page=1&color=${selectedColor}`;
      case selectedOrientation && !selectedColor:
        return `https://api.unsplash.com/search/photos?page=1&query=${searchQuery}&client_id=${CLIENT_ID}&page=1&=orientation=${selectedOrientation}`;
      case !selectedColor && !selectedOrientation:
        return `https://api.unsplash.com/search/photos?page=1&query=${searchQuery}&client_id=${CLIENT_ID}&page=1`;
      default:
        return apiEndPoint;
    }
  };

  const clearResults = () => {
    setData([]);
    setSearchQuery('');
    setSelectedColor('');
    setSelectedOrientation('');
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
      <Picker
        selectedValue={selectedColor}
        style={{height: 50, width: '100%'}}
        onValueChange={(itemValue, itemIndex) => setSelectedColor(itemValue)}>
        <Picker.Item label="By color" value="" />
        <Picker.Item label="Black & White" value="black_and_white" />
        <Picker.Item label="Black" value="black" />
        <Picker.Item label="White" value="white" />
        <Picker.Item label="Yellow" value="yellow" />
        <Picker.Item label="Orange" value="orange" />
        <Picker.Item label="Red" value="red" />
        <Picker.Item label="Purple" value="purple" />
        <Picker.Item label="Magenta" value="magenta" />
        <Picker.Item label="Green" value="green" />
        <Picker.Item label="Teal" value="teal" />
        <Picker.Item label="Blue" value="blue" />
      </Picker>
      <Picker
        selectedValue={selectedOrientation}
        style={{height: 50, width: '100%'}}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedOrientation(itemValue)
        }>
        <Picker.Item label="By orientation" value="" />
        <Picker.Item label="Landscape" value="landscape" />
        <Picker.Item label="Potrait" value="portrait" />
        <Picker.Item label="Squarish" value="squarish" />
      </Picker>
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

      <SafeAreaView style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
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
    borderWidth: 0.5,
    width: 363.4,
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  itemThumbnail: {
    height: 300,
    borderWidth: 10,
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
});

export default Home;
