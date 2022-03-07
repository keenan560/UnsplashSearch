/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
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

import {CLIENT_ID} from 'react-native-dotenv';

const App = () => {
  interface IsSearch {
    search: string;
    api: string;
  }

  const [searchQuery, setSearchQuery] = useState<IsSearch['search']>('');
  const apiEndPoint: IsSearch['api'] = `https://api.unsplash.com/search/photos?page=1&query=${searchQuery}&client_id=${CLIENT_ID}&page=1`;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const unsplashSearch = async () => {
    if (searchQuery) {
      setIsLoading(true);
      await fetch(apiEndPoint)
        .then(response => response.json())
        // eslint-disable-next-line @typescript-eslint/no-shadow
        .then(data => setData(data.results));
    } else {
      alert('Please enter a valid query');
    }
  };

  const clearResults = () => {
    setData([]);
    setSearchQuery('');
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={() => {}}>
          <Image source={{uri: item.urls.full}} style={styles.itemThumbnail} />
          {/* <Text style={styles.itemDescription}>
            {item.description ?? searchQuery}
          </Text> */}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <Text style={styles.header}>Unsplash Photo Search!</Text>
      <TextInput
        style={styles.input}
        placeholder="Search for photos.."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
        onSubmitEditing={unsplashSearch}
      />
      <TouchableOpacity style={styles.clearButton} onPress={clearResults}>
        <Text style={styles.clearText}>Clear</Text>
      </TouchableOpacity>
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
  header: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#2960df',
    padding: 20,
    marginTop: 50,
    marginBottom: 15,
    fontFamily: 'sans-serif-condensed',
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
    backgroundColor: '#2960df',
    width: 363.4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  clearText: {
    padding: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default App;
