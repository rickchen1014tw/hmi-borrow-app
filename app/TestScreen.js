import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";

export default function TestScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, textAlign: "center", marginTop: 50 }}>
        This is a test screen.
      </Text>
      <Text style={{ fontSize: 18, textAlign: "center", marginTop: 20 }}>
        You can add your test components here.
      </Text>
      <Text style={{ fontSize: 16, textAlign: "center", marginTop: 10 }}>
        Navigate back to the home screen to continue.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  resultBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  resultText: {
    fontSize: 14,
    color: "#333",
  },
});
