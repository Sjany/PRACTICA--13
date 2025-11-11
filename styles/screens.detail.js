import { StyleSheet } from "react-native";
import C from "./colors";

export default StyleSheet.create({
  container:{ 
    flex:1, 
    backgroundColor:C.bg, 
    padding: 0
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF'
  },
  backButton: {
    paddingVertical: 4,
  },
  backButtonText: {
    color: C.primary,
    fontSize: 16,
    fontWeight: '600'
  },
  contentPadding: { 
    paddingHorizontal: 20, 
  },
  title:{ 
    color:C.text, 
    fontSize: 28, 
    fontWeight:"800",
    marginBottom: 4,
    marginTop: 16,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 12,
  },
  authorBadge: {
  
    color: C.sub, 
    fontSize: 14,
    fontWeight: '600',
  },
  metaDate:{ 
    color:C.sub, 
    fontSize: 14
  },
  body:{ 
    color: C.text, 
    marginTop: 16, 
    lineHeight: 24,
    fontSize: 16
  },


  footer: {

    marginTop: 32, 
    marginBottom: 48, 
  },
  row:{ 
    flexDirection:"row", 
    gap: 12, 
  },
  btn:{ 
    backgroundColor:C.primary, 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    borderRadius: 10,
    flex: 1, 
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  btnDanger:{ 
    backgroundColor:C.danger 
  },
  btnText:{ 
    color: "#FFFFFF", 
    fontWeight:"700",
    fontSize: 16
  },
});