import { useEffect, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { GetStyle } from "../styles/style-sheet";

export const visible = {
    isVisible: true
}
function YearModal() {
    const isVisible: boolean = true;
    const currentYear = new Date().getFullYear();
    const [yearList, setyear] = useState([]);
    const yeardata : number[] = [];
    const styles: any = GetStyle();
    useEffect(() => {
        for(let year=2000;year <= currentYear; year++){
            yeardata.push(year)
        }
        //setyear(yeardata)
    }, []);
    return (
        <Modal  visible={isVisible} transparent={true}> 
          <View  style={{ flex: 1,justifyContent: "center",alignItems: "center",borderBottomWidth:1,borderColor:'grey'}}>
                        <View style={[{height:400, width:'80%', backgroundColor:'white',borderBottomWidth:1,borderColor:'grey'}]}>
                            <View style={{borderBottomColor:'white', borderBottomWidth:1,width:300, alignItems:'center' }}>
                                <Text style={[styles.mediumHeaderText,{color:'black'}]}> {"Select Year"}</Text>
                            </View>
                            <View >
                               
                                {
                                    
                                    yearList.map((item, index)=>(
                                        <View key={index} style={{height: 50, borderColor: 'grey'}}>
                                        <TouchableOpacity
                                          activeOpacity={0.9}
                                        //   onPress={() => {
                                        //     setCurrentPage(currentPostion + 1);
                                        //   }}
                                          style={{marginTop: 10, alignItems: 'flex-end', marginRight: 20}}>
                                          <Text
                                            style={[
                                              styles.mediumHeaderText,
                                              styles.buttonText,
                                              {color: 'black'},
                                            ]}>
                                            {item}
                                          </Text>
                                        </TouchableOpacity>
                                      </View>
                                    ))
                                }
                            </View>
                            </View>
                            </View>
        </Modal>)
}
export default YearModal;