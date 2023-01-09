import React, {useEffect} from 'react';

import {
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Appearance,
  Modal,
} from 'react-native';

//import Modal from 'react-native-modal';

import Colors from '../styles/colors';

import {useAppDispatch, useAppSelector} from '../redux/hooks';

import {GetStyle} from '../styles/style-sheet';

import {ModalData, resetData} from '../redux/slices/appData';

import {ScrollView} from 'react-native-gesture-handler';

export const RetryMessage = {
  isVisible: true,

  title: 'Connection Error',

  message: 'A connection issue was encountered.\r\nRetrying...',

  btnText: 'Continue',

  canClose: false,

  showLoading: true,
};

function GlobalModal() {
  const dispatch: any = useAppDispatch();

  const isVisible: boolean = useAppSelector(
    state => state.appData.modalData.isVisible,
  );

  const modalData: ModalData = useAppSelector(state => state.appData.modalData);

  const styles: any = GetStyle();

  const isLightMode = Appearance.getColorScheme() === 'light' ? true : false;

  const closeModal = () => {
    dispatch(resetData());
  };

  return (
    <Modal animationType="slide" visible={isVisible} transparent={true}>
      <View style={styles.modelSideContainer}>
        <View style={[styles.sectionCard, {width: '100%'}]}>
          <Text
            style={[
              styles.mediumHeaderText,
              {
                fontWeight: 'bold',

                paddingBottom: 15,

                fontSize: 16,

                color: isLightMode ? Colors.Black : Colors.White,
              },
            ]}>
            {modalData?.title}
          </Text>

          <ScrollView>
            <Text
              style={[
                styles.mediumText,

                {
                  paddingLeft: 5,

                  paddingRight: 5,

                  lineHeight: 20,

                  color: isLightMode ? Colors.Black : Colors.White,
                },
              ]}>
              {modalData?.message}
            </Text>
          </ScrollView>

          {modalData.showLoading && (
            <>
              <ActivityIndicator
                size="small"
                color={Colors.Brand}
                style={{paddingTop: 10, paddingBottom: 10}}
              />
            </>
          )}

          {modalData.canClose && (
            <>
              <View style={[styles.viewLineStyle, {marginTop: 15}]} />

              <TouchableOpacity
                style={[styles.modalButton, styles.rounded]}
                onPress={closeModal}>
                <Text style={styles.modalButtonText}>{modalData.btnText}</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
    // <Modal
    //   style={{width:'100%', marginLeft:0, marginTop:0}}
    //   isVisible={isVisible}
    //   backdropOpacity={0.5}
    //   onBackdropPress={closeModal}>
    //   <View
    //     style={[
    //       styles.sectionCard,{width:'100%'}

    //     ]}>
    //     <Text
    //       style={[
    //         styles.mediumHeaderText,

    //         {
    //           fontWeight: 'bold',

    //           paddingBottom: 15,

    //           fontSize: 16,

    //           color: isLightMode ? Colors.Black : Colors.White,
    //         },
    //       ]}>
    //       {modalData?.title}
    //     </Text>

    //     <ScrollView>
    //       <Text
    //         style={[
    //           styles.mediumText,

    //           {
    //             paddingLeft: 5,

    //             paddingRight: 5,

    //             lineHeight: 20,

    //             color: isLightMode ? Colors.Black : Colors.White,
    //           },
    //         ]}>
    //         {modalData?.message}
    //       </Text>
    //     </ScrollView>

    //     {modalData.showLoading && (
    //       <>
    //         <ActivityIndicator
    //           size="small"
    //           color={Colors.Brand}
    //           style={{paddingTop: 10, paddingBottom: 10}}
    //         />
    //       </>
    //     )}

    //     {modalData.canClose && (
    //       <>
    //         <View style={[styles.viewLineStyle, {marginTop: 15}]} />

    //         <TouchableOpacity
    //           style={[styles.modalButton, styles.rounded]}
    //           onPress={closeModal}>
    //           <Text style={styles.modalButtonText}>{modalData.btnText}</Text>
    //         </TouchableOpacity>
    //       </>
    //     )}
    //   </View>
    // </Modal>
  );
}

export default GlobalModal;
