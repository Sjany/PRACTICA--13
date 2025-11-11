import { StyleSheet } from "react-native";
import C from "./colors";

export default StyleSheet.create({
  h1: { 
    color: C.text, 
    fontSize: 26, 
    fontWeight: "800" 
  },
  p: { 
    color: C.text, 
    fontSize: 16, 
    lineHeight: 24 
  },
  subtle: {
    color: C.sub,
    fontSize: 14
  }
});