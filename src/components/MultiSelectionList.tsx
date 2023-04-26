import React from 'react';
import {TouchableOpacity, Text, View, Modal, ScrollView} from 'react-native';
import {ListDropDownDto} from '../services/MatchesService';
import {GetStyle} from '../styles/style-sheet';
import AppButton from './AppButton';
import Colors from '../styles/colors';
type WizardProps = {
  modaldatalist: ListDropDownDto[];
  showReligious: boolean;
  cancelModel: any;
  //option:any;
  onpress: any;
  title: any;
  selectedItem: string[];
};
export const MultiSelectionList = ({
  modaldatalist,
  showReligious,
  cancelModel,
  onpress,
  title,
  selectedItem,
}: WizardProps) => {
  const styles = GetStyle();
  return (
    <Modal animationType="slide" visible={showReligious} transparent={true}>
      <View style={styles.modelSideContainer}>
        <View style={styles.modelSideView}>
          <View
            style={{
              paddingTop: 20,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                ...styles.mediumHeaderText,
                fontSize: 16,
                paddingBottom: 5,
              }}>
              {title}
            </Text>
          </View>
          <ScrollView>
            <View>
              {modaldatalist.map((item: ListDropDownDto, index) => (
                <View
                  key={index}
                  style={{
                    justifyContent: 'center',
                    marginBottom: 10,
                    marginTop: 10,
                    borderBottomColor: 'grey',
                    borderBottomWidth: 1,
                  }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingLeft: 10,
                      marginBottom: 10,
                      backgroundColor:selectedItem.includes(item.name)?Colors.FrenchRose:Colors.White
                    }}
                    onPress={() => {
                      onpress(item.name, title);
                    }}>
                    <View>
                      <Text style={{...styles.mediumText}}>{item.name}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>

          <View style={{marginTop: 10}}>
            <AppButton onPress={cancelModel} title={'Close'} disabled={false} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MultiSelectionList;
