/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';


interface Prop {
  visible: boolean;
}

export default function Loader({visible}: Prop) {
  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ActivityIndicator size={48} color={"#a91d3a"} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(23, 27, 44, 0.6)',
    flex: 1,
    flexDirection: 'column-reverse',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    borderRadius: 16,
    width: 80,
    height: 80,
    padding: 17,
    backgroundColor: "#fff",
  },
});
