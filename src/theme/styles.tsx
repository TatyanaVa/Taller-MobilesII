import { StyleSheet } from "react-native";

export const styles=StyleSheet.create({
    root:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        gap:10
    },
    inputs:{
        width:"90%"
    },
    text:{
        fontSize:20,
        fontWeight:'bold',
        
    },
    button:{
        width:"90%"
    },
    textRedirect:{
        marginTop:15,
        fontSize:17,
        fontWeight:'bold',
        color:'c94a9f'
    },
    rootHome:{
        flex:1,
        marginVertical:55,
        marginHorizontal:25,
        backgroundColor:'#334155'
    },
    header:{
        flexDirection:'row',
        alignItems:'center',
        gap:15,
        
    },
    iconEnd:{
        flex:1,
        alignItems:'flex-end'
    },
    modalProfile:{
        paddingHorizontal:20,
        paddingVertical:20,
        marginHorizontal:20,
        borderRadius:10,
        backgroundColor:"#fff",
        gap:10
    },
    rootMessage:{
        flexDirection:'row',
        paddingHorizontal:12,
        paddingVertical:20,
        alignItems:'center'
    },
    fabMessage:{
        position:'absolute',
        bottom:20,
        margin: 16,
        right:15
    },
    container:{
        flex:1,
        backgroundColor:'#0F172a',
        alignItems:'center',
        justifyContent:'center'
    },
    title:{
        fontSize:22,
        color:'white',
        fontWeight:'700'
    },
    cardUp: {
        width:100,
        height:100,
        margin:10,
        borderWidth:10,
        borderColor:"#334155",
        backgroundColor:"#1e293b",
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25
      },
      textCard:{
        fontSize:46,
        color:"#ffff",
        
      },
      cardDown: {
        width:100,
        height:100,
        margin:10,
        borderWidth:10,
        borderColor:"#334155",
        backgroundColor:"#1e293b",
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25
      },
      board:{
        flexDirection:"row",
        flexWrap:"wrap",
        justifyContent:"center"
      },
      modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 10,
      },
      modalText: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
      },
      iconSignOut:{
        marginTop:25,
        alignItems:'center'
    },
    backaction:{
        backgroundColor: 'white',
        
    }

})
