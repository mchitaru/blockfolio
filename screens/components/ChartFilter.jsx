import React, { memo } from "react";
import { Text, Pressable } from "react-native";

const ChartFilter = (props) => {
  const { days, text, selectedRange, setSelectedRange } = props;
  const isFilterSelected = (filter) => filter === selectedRange;

  return (
    <Pressable
      style={{
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: isFilterSelected(days) ? "#1e1e1e" : "transparent",
      }}
      onPress={() => setSelectedRange(days)}
    >
      <Text style={{ color: isFilterSelected(days) ? "white" : "grey" }}>{text}</Text>
    </Pressable>
  );
};

export default memo(ChartFilter);