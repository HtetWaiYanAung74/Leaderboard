import React, { FC } from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface ErrorModalProps {
  visible: boolean;
  message: string;
  onClose: () => void;
}

const AlertModal: FC<ErrorModalProps> = ({visible, message, onClose}) => {

  return (
    <Modal
      animationType='fade'
      visible={visible}
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Image
            source={require('../assets/not_found.png')}
            style={{width: 50, height: 50, marginBottom: 24}}
          />
          <TouchableOpacity
            onPress={onClose}
            style={styles.closeIcon}>
            <Icon
              name='close'
              color='#000'
              size={24}
            />
          </TouchableOpacity>
          <Text style={styles.message}>
            {message}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    alignItems: 'center',
    margin: 40,
    paddingVertical: 16,
    paddingHorizontal: 36,
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  message: {
    color: 'black',
    lineHeight: 25,
    textAlign: 'center',
  }
});

export default AlertModal;