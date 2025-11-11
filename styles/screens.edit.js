import { StyleSheet } from "react-native";
import C from "./colors";

export default StyleSheet.create({
  container:{ 
    flex:1, 
    backgroundColor:C.bg, 
    padding:20 
  },
  header:{ 
    color:C.text, 
    fontSize:26, 
    fontWeight:"800", 
    marginBottom:16 
  },
  input:{ 
    backgroundColor:C.surface, 
    color:C.text, 
    borderRadius:10, 
    padding: 14, 
    marginVertical: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#CED4DA' 
  },
  area:{ 
    height: 200, 
    textAlignVertical:"top" 
  },
  btn:{ 
    backgroundColor:C.primary, 
    paddingHorizontal:16, 
    paddingVertical: 14, 
    borderRadius:10, 
    marginTop: 12,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  btnText:{ 
    color:"#FFFFFF", 
    fontWeight:"700",
    fontSize: 16
  },

  secondary:{ 
    marginTop: 16,
    alignItems: 'center',
    paddingVertical: 10,
  },
  secondaryText:{ 
    color:C.sub,
    fontSize: 16,
    fontWeight: '500'
  },
});