import { StyleSheet } from "react-native";
import C from "./colors";

export default StyleSheet.create({
  card: { 
    backgroundColor: C.surface, 
    marginHorizontal: 16, 
    marginVertical: 8, 
    borderRadius: 12, 
    padding: 16,
    borderWidth: 1, 
    borderColor: '#E9ECEF',
  },
  cardCompact: { 
    paddingVertical: 12 
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  cardTitle: { 
    color: C.text, 
    fontSize: 18, 
    fontWeight: "600",
    flex: 1, 
    marginRight: 10, 
  },
  chevron: {
    color: C.sub,
    fontSize: 20,
    fontWeight: '600',
  },
  cardBody: { 
    color: C.sub, 
    marginTop: 8, 
    lineHeight: 20 
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  metaAuthor: {
    color: C.sub,
    fontSize: 12,
    fontWeight: '600',
  },
  metaDate: { 
    color: C.sub, 
    fontSize: 12 
  },

  searchBox: { 
    paddingHorizontal: 0, 
    paddingTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#E9ECEF",
    borderRadius: 10,
  },

  searchInput: { 
    flex: 1,
    color: C.text,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 15,
  },
  searchClear: {
    padding: 10,
  },
  searchClearText: {
    color: C.sub,
    fontSize: 20,
    fontWeight: '700',
  },

  badge: { 
    paddingHorizontal: 10, 
    paddingVertical: 4, 
    borderRadius: 20,
    borderWidth: 1.5,
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFFFFF',
  },
  badgeIcon: {
    marginRight: 6, 
    fontWeight: '700',
    fontSize: 12,
  },
  badgeText: { 
    fontWeight: "700", 
    fontSize: 11,
    textTransform: 'uppercase',
  },
});