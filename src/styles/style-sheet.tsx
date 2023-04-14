import {StyleSheet,Appearance} from 'react-native';
import { color } from 'react-native-elements/dist/helpers';
import Colors from './colors';
const GetStyle=()=>{
    const colorSchemeName=Appearance.getColorScheme();
    let styles=colorSchemeName === 'light' ? LightStyle:DarkStyle
    return styles;
}
const LightStyle=StyleSheet.create({
    submitButton:{
        width:'90%',
        //paddingTop:10,
        //paddingBottom:10,
        marginLeft:20,
        marginRight:20,
       backgroundColor:Colors.FrenchRose,
        borderRadius:8,
        height:40,
        marginTop:15, marginBottom:15,
        alignItems:'center',
        justifyContent:'center'
       
    },
    buttonText:{
        fontSize:16,
        color:Colors.White,
        textAlign:'center',
        fontWeight:'bold'
    },
    buttonHeaderText:{
        fontSize:16,
        color:Colors.Black,
        textAlign:'center',
        fontWeight:'bold'
    },
    buttonLink:{
        backgroundColor:Colors.White,
    },
    buttonLinkText:{
        backgroundColor:Colors.Black,
    },
    textInput:{
        width:'90%',
         marginBottom:5,
         color:Colors.Black,
         backgroundColor:Colors.White,
         borderRadius:0.3,
         borderColor:Colors.Grey,
        minHeight:30,
        height:50,
        textAlignVertical:'top',
        borderWidth:1,
        flex: 1,

    },
    modelSideContainer:{
        flex:1,
        //justifyContent:'center',
        backgroundColor:'rgba(0,0,0,0.3)',
        alignItems:'flex-end'
    },
    modelSideView:{
        backgroundColor:Colors.White,
        width:'70%',
        minHeight:'100%',
        maxHeight:'100%',
        //borderRadius:10
    },
    mediumHeaderText:{
        fontSize:16,
        fontWeight:'bold',
        color:Colors.Black
    },
    mediumText:{
        fontSize:14,
        color:Colors.Black
    },
    backgroundContainer:{
        flex:1,
        backgroundColor:Colors.White
    },
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#424242',
    },
    textInputIconContainer:{
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'grey',
        alignItems: 'center',
        width: '95%',
        borderRadius:10,
        height:40
    },  
    loginTestbox:{
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'grey',
        marginBottom: 10,
    },
     dropdown: {
        margin: 16,
        //height: 50,
        width:'50%',
        //paddingLeft:50,
        borderBottomColor: 'gray',
        borderBottomWidth:2, 
        //borderBottomColor:'#2F4F4F',
        baseColor:"rgba(255, 255, 255, 1)",
        color:"black"
      },
      hideNext:{
         width:0, height:0 
      },
      nextpreviousText:{
        color:Colors.Interaction,
        fontWeight: 'bold',
     },
     sectionCard:{
        backgroundColor:Colors.White,
        //marginLeft:12,
        //marginRight:12,
        //marginBottom:12,
        elevation:3
     },
     centered:{
        alignItems:'center',
        justifyContent:'center'
     },
     rounded:{
       borderRadius:0
     },
     viewLineStyle:{
        height:0.5,
        width:'100%',
        backgroundColor:Colors.Grey
     },
     modalButton:{
        height:40,
        width:'100%',
        backgroundColor:Colors.White,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
     },
     modalButtonText:{
        fotsize:16,
        color:Colors.Interaction,
        textAlign:'center'
     },
     circleStyle: {
        height: 50.0,
        width: 50.0,
        backgroundColor: Colors.White,
        borderRadius: 25.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom:5
    },
    topSafeArea: {
        flex: 0, 
        backgroundColor: Colors.White
    }, 
    bottomSafeArea: {
        flex: 1, 
        backgroundColor: Colors.White
    },
    horizontalScrollView:{
      borderColor:Colors.Black, 
      backgroundColor:Colors.White,
      marginLeft:10, 
      width:100,
      height:40,
      marginTop: 20,        
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 15,
      marginBottom:10
    },
    backgroundView:{
        backgroundColor:Colors.White,
        marginLeft:10,
        marginRight:10
    },
    inputSearchContainer:{
        backgroundColor:Colors.White, 
        borderWidth:1,
        borderBottomWidth:1, 
        width:'100%', 
        borderColor:Colors.Black
    },
    searchConatiner:{
        backgroundColor:'white', 
        borderBottomColor:'white', 
        borderTopColor:'white'
    },
    searchView:{
        flexDirection: 'row',
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
    },
    sectionContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:Colors.White
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
      },
      stepIndicator: {
        marginVertical: 50,
      },
      page: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
      },
      stepLabel: {
        fontSize: 12,
        textAlign: 'center',
        fontWeight: '500',
        color: '#999999',
      },
      stepLabelSelected: {
        fontSize: 12,
        textAlign: 'center',
        fontWeight: '500',
        color: '#4aae4f',
      },
});
const DarkStyle=StyleSheet.create({
    sectionContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:Colors.White
    },
    submitButton:{
        width:'100%',
        paddingTop:10,
        paddingBottom:10,
        marginLeft:20,
        marginRight:20,
        backgroundColor:Colors.Interaction,
        borderRadius:8,
        
    },
    buttonText:{
        fontSize:16,
        color:Colors.Black,
        textAlign:'center',
        fontWeight:'bold'
    },
    buttonHeaderText:{
        fontSize:16,
        color:Colors.Black,
        textAlign:'center',
        fontWeight:'bold'
    },
    textInput:{
        width:'85%',
        marginBottom:5,
        color:Colors.White,
        backgroundColor:Colors.White,
        borderRadius:0.3,
        borderColor:Colors.Grey,
        minHeight:60,
        height:80,
        textAlignVertical:'top'

    },
    modelSideContainer:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'rgba(0,0,0,0.3)',
        alignItems:'center'
    },
    modelSideView:{
        backgroundColor:Colors.White,
        width:'90%',
        minHeight:'50%',
        maxHeight:'90%',
        borderRadius:10
    },
    mediumHeaderText:{
        fontSize:16,
        fontWeight:'bold',
        color:Colors.White
    },
    mediumText:{
        fontSize:14,
        color:Colors.Black
    },
    backgroundContainer:{
        flex:1,
        backgroundColor:Colors.BackgroundGrey
    },
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#fff',
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        //paddingTop: 10,
        //paddingRight: 10,
        //paddingBottom: 10,
        paddingLeft: 0,
        width:'85%',
        marginBottom:5,
        color:Colors.White,
        backgroundColor:Colors.White,
        borderRadius:0.3,
        borderColor:Colors.Grey,
        minHeight:60,
        height:80,
        textAlignVertical:'top'
    },
    
    textInputIconContainer:{
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'grey',
        alignItems: 'center',
        width: '90%',
        borderRadius:10,
        height:40
    },
    loginTestbox:{
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'grey',
        marginBottom: 10,
    },
    dropdown: {
        margin: 16,
        //height: 50,
        //width:200,
        //paddingLeft:60,
        borderBottomColor: 'gray',
        borderBottomWidth:2, 
        //borderBottomColor:'#2F4F4F',
        baseColor:"rgba(255, 255, 255, 1)",
        color:Colors.Black
      },
      hideNext:{
        width:0, height:0 
     },
     nextpreviousText:{
        color: Colors.Grey,
        fontWeight: 'bold',
     },
     sectionCard:{
        backgroundColor:Colors.White,
        // marginLeft:12,
        // marginRight:12,
        // marginBottom:12,
        //elevation:3
     },
     centered:{
        alignItems:'center',
        justifyContent:'center'
     },
     rounded:{
       borderRadius:8
     },    viewLineStyle:{
        height:0.5,
        width:'100%',
        backgroundColor:Colors.Grey
     },
     modalButton:{
        height:40,
        width:'100%',
        backgroundColor:Colors.White,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
     },
     modalButtonText:{
        fotsize:16,
        color:Colors.Interaction,
        textAlign:'center'
     },
     circleStyle: {
        height: 50.0,
        width: 50.0,
        backgroundColor: '#F5F5F5',
        borderRadius: 25.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom:5
    },
    topSafeArea: {
        flex: 0, 
        backgroundColor: Colors.Black
    }, 
    bottomSafeArea: {
        flex: 1, 
        backgroundColor: Colors.Black
    },
    horizontalScrollView:{
        borderColor:Colors.Grey, 
        backgroundColor:Colors.White,
        // marginLeft:10, 
          width:'10%',
        // height:40,       
        // alignItems: 'center',
        // justifyContent: 'center',
        // borderRadius: 15,
        // marginBottom:10
      },
      backgroundView:{
        backgroundColor:Colors.White,
        marginLeft:10,
        marginRight:10
    },
    inputSearchContainer:{
        backgroundColor:Colors.White, 
        borderWidth:1,
        borderBottomWidth:1, 
        width:'90%', 
        borderColor:Colors.White
    },
    searchConatiner:{
        backgroundColor:'white', 
        borderBottomColor:'white', 
        borderTopColor:'white'
    },
    searchView:{
        flexDirection: 'row',
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
      },
      stepIndicator: {
        marginVertical: 50,
      },
      page: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
      },
      stepLabel: {
        fontSize: 12,
        textAlign: 'center',
        fontWeight: '500',
        color: '#999999',
      },
      stepLabelSelected: {
        fontSize: 12,
        textAlign: 'center',
        fontWeight: '500',
        color: '#4aae4f',
      },
});
export {LightStyle,DarkStyle, GetStyle}