import { StyleSheet } from "react-native";
import C from "./colors";

export default StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: C.bg 
  },

  topBar: {
    paddingHorizontal: 16,
    paddingTop: 12, 
    paddingBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between", 
    alignItems: "center",
    backgroundColor: C.bg,
    borderBottomWidth: 1,
    borderBottomColor: "#E9ECEF"
  },
  title: { 
    color: C.text, 
    fontSize: 24, 
    fontWeight: "800" 
  },

  rightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12, 
  },

  conflictBtn: {
    backgroundColor: C.warning,
    height: 36,
    width: 36,
    borderRadius: 18, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  conflictBtnText: {
    fontSize: 18,
    color: '#FFFFFF'
  },

  newPostBtn: {
    backgroundColor: C.primary,
    height: 36, 
    width: 36,  
    borderRadius: 18, 
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  newPostBtnText: { 
    color: "#FFFFFF", 
    fontWeight: "700",
    fontSize: 22, 
    lineHeight: 26, 
  },

  controls: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  
  syncBadgeContainer: {
    alignItems: 'center', 
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF'
  },

  empty: { 
    color: C.sub, 
    textAlign: "center", 
    marginTop: 50,
    fontSize: 16
  },
  offline: { 
    color: "#856404", 
    textAlign: "center", 
    padding: 10,
    backgroundColor: '#FFF3CD', 
    borderTopWidth: 1,
    borderTopColor: '#FFEEBA'
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 16,
  },
  modalCard: {
    backgroundColor: C.surface,
    borderRadius: 16,
    padding: 16,
    maxHeight: "80%",
  },
  modalTitle: { 
    color: C.text, 
    fontSize: 20, 
    fontWeight: "700", 
    marginBottom: 12 
  },
  conflictItem: {
    backgroundColor: C.bg,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E9ECEF'
  },
  conflictId: { 
    color: C.sub, 
    marginBottom: 6,
    fontSize: 12,
    fontWeight: '700'
  },
  conflictLabel: { 
    color: C.sub, 
    fontSize: 12, 
    marginTop: 6,
    textTransform: 'uppercase'
  },
  conflictText: { 
    color: C.text,
    fontSize: 14
  },
  conflictWinner: { 
    color: C.success, 
    fontWeight: "700",
    fontSize: 14
  },
  modalBtn: {
    backgroundColor: C.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  modalBtnText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16
  }
});