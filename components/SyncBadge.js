import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import s from "../styles/widgets";
import C from "../styles/colors";

export default function SyncBadge({ state }) {
  
  let label, icon, color;

  if (state === "syncing") {
    label = "Sincronizando…";
    color = C.info;
    icon = <ActivityIndicator size="small" color={C.info} style={s.badgeIcon} />;
  } else if (state === "pending") {
    label = "Pendiente";
    color = C.warning;
    icon = <Text style={[s.badgeIcon, { color: C.warning }]}>!</Text>;
  } else {
    label = "Sincronizado";
    color = C.success;
    icon = <Text style={[s.badgeIcon, { color: C.success }]}>✓</Text>;
  }

  return (
    <View style={[s.badge, { borderColor: color }]}>
      {/*4*/}
      {icon} 
      <Text style={[s.badgeText, { color: color }]}>{label}</Text>
    </View>
  );
}