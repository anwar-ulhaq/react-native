import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {PropTypes} from 'prop-types';
import React, {useState} from 'react';

const ListItem = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={() => setModalVisible(true)}>
        <Image
          style={styles.touchableImage}
          source={{uri: props.singleMedia.thumbnails.w160}}
        />
        <View style={styles.touchableText}>
          <Text style={styles.textTitle}>{props.singleMedia.title}</Text>
          <Text style={styles.textDescription}>{props.singleMedia.description}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalView}>
            <Image
              style={styles.modalImage}
              source={{uri: props.singleMedia.filename}}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide</Text>
            </Pressable>
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  touchableOpacity: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#b6b6b6',
    marginTop: 4,
    marginBottom: 4,
  },
  touchableImage: {
    flex: 1,
    padding: 30,
    flexWrap: 'wrap',
  },
  touchableText: {
    flex: 2,
    padding: 10,
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  textDescription: {},
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    marginTop: 200,
    backgroundColor: 'white',
    borderRadius: 20,
    //padding: 35,
    alignItems: "stretch",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalImage: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 30,
    height: 300,
  },
  button: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  thumbnailImage: {},
});

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ListItem;
