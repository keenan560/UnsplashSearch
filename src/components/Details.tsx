import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  Pressable,
  Alert,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {PhotoContext} from '../App';

function Details({}) {
  const photoContext = useContext(PhotoContext);
  const [modalVisible, setModalVisible] = useState(false);
  console.log(photoContext.photoState.data);

  const checkPermission = async () => {
    if (Platform.OS === 'ios') {
      downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'Unsplash needs access to your storage to download Photo',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Storage Permission Granted');
          downloadImage();
        } else {
          alert('Storage Permission Denied');
        }
      } catch (error) {
        console.warn(error.message);
      }
    }
  };

  const downloadImage = () => {
    let date = new Date();
    let image_url = photoContext.photoState.data.urls.regular;
    let ext = getExtension(image_url);
    ext = '.' + ext[0];
    // Get config and fs from RNFetchBlob
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // Related to Android only
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_url)
      .then(response => {
        // Allert success after download
        console.log('response', JSON.stringify(response));
        alert('Photo downloaded successfully');
      });
  };

  const getExtension = filename => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Posted by: {photoContext.photoState.data.user.name}
            </Text>
            <Text style={styles.modalText}>
              {' '}
              Likes:{photoContext.photoState.data.likes}
            </Text>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Learn more</Text>
      </Pressable>
      <Image
        source={{uri: photoContext.photoState.data.urls.full}}
        style={styles.itemThumbnail}
      />
      <TouchableOpacity style={styles.download} onPress={checkPermission}>
        <Text style={styles.downloadText}>Download</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edeff2',
    alignItems: 'center',
  },
  itemThumbnail: {
    width: '100%',
    height: '75%',
    borderWidth: 10,
    backgroundColor: '#edeff2',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    width: '100%',
  },
  buttonOpen: {
    backgroundColor: '#edeff2',
  },
  buttonClose: {
    backgroundColor: '#2960df',
  },
  textStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  download: {
    width: '100%',
    backgroundColor: '#2960df',
    padding: 10,
  },
  downloadText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
});
