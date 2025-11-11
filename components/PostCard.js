import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import s from "../styles/widgets";
import C from "../styles/colors"; 

export default function PostCard({ item, compact, onPress }) {
  
  const authorColor = C.sub; 

  return (
    <TouchableOpacity onPress={() => onPress?.(item)}>
      <View style={[s.card, compact && s.cardCompact]}>
        
        <View style={s.cardHeader}>
          <Text style={s.cardTitle} numberOfLines={compact ? 1 : 2}>{item.title}</Text>
          <Text style={s.chevron}>›</Text>
        </View>

        {/*1*/}
        {compact ? null : (
          <Text style={s.cardBody} numberOfLines={3}>{item.body}</Text>
        )}
        
        <View style={s.metaContainer}>
          <Text style={[s.metaAuthor, { color: authorColor }]} numberOfLines={1}>
            {item.author}
          </Text>
          <Text style={s.metaDate}>· {new Date(item.updatedAt).toLocaleDateString()}</Text>
        </View>

      </View>
    </TouchableOpacity>
  );
}