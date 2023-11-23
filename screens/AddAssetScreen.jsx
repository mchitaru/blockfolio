import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import SearchableDropDown from "react-native-searchable-dropdown";

const AddAssetScreen = () => {
  const [quantity, setQuantity] = useState("");
  return ( 
      <View style={{flex: 1}}>
        <SearchableDropDown
          items={[]}
          onItemSelect={(item) => (console.log(item))}
          containerStyle={styles.dropdownContainer}
          itemStyle={styles.item}
          itemTextStyle={{color: "white"}}
          resetValue={false}
          placeholder={"Select a coin..."}
          placeholderTextColor="white"
          textInputProps={{
            underlineColorAndroid: "transparent",
            style: {
              padding: 12,
              borderWidth: 1.5,
              borderColor: "#444444",
              borderRadius: 5,
              backgroundColor: "#1e1e1e",
              color: "white"
            }
          }}
        />
        <View style={styles.quantityContainer}>
          <View style={styles.inputContainer}>
            <TextInput 
              value={quantity} 
              placeholder="0"
              keyboardType="numeric"
              style={styles.input}
              onChangeText={setQuantity}
            />
            <Text style={styles.symbol}>BTC</Text>
          </View>
          <Text style={styles.pricePerCoin}>$40000 per coin</Text>
        </View>
        <Pressable 
          style={styles.buttonContainer}
          onPress={() => (navigator.navigate("AddAsset"))}
        >
          <Text style={styles.buttonText}>Add new asset</Text>
        </Pressable>
      </View>
   );
}
 
const styles = StyleSheet.create({
  dropdownContainer: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  item: {
    padding: 10,
    marginTop: 2,
    backgroundColor: "#1e1e1e",
    borderWidth: 1,
    borderColor: "#444444",
    borderRadius: 5
  },
  input: {
    color: "white",
    fontSize: 90,
  },
  symbol: {
    color: "grey",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 25,
    marginLeft: 5

  },
  inputContainer: {
    flexDirection: "row"
  },
  quantityContainer: {
    alignItems: "center",
    marginTop: 50,
    flex: 1
  },
  buttonContainer: {
    backgroundColor: "#4169E1",
    padding: 10,
    alignItems: "center",
    marginVertical: 30,
    marginHorizontal: 20,
    borderRadius: 5
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    fontWight: "600"
  },
  pricePerCoin: {
    color: "grey",
    fontWeight: "600",
    fontSize: 17
  }
});

export default AddAssetScreen;