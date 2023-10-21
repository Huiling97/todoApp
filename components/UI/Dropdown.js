import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

import { GlobalStyles } from "../../constants/styles";

const DROPDOWN_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'High', value: 'high' },
  { label: 'Medium', value: 'medium' },
  { label: 'Low', value: 'low' },
];

const Dropdown = ({ selectedOption, label, onChangeOption }) => {
  const [option, setOption] = useState(selectedOption.value);
  const [open, setOpen] = useState(false);

  const setOptionHandler = (option) => {
    setOption(option);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.dropdownContainer}>
        <DropDownPicker
          value={option}
          items={DROPDOWN_OPTIONS}
          setValue={setOptionHandler}
          onSelectItem={onChangeOption}
          setOpen={setOpen}
          open={open}
          placeholder={option}
          style={styles.dropdown}
          listItemContainerStyle={styles.listItemContainerStyle}
          textStyle={styles.dropdownText}
        />
      </View>
    </View>
  )
}

export default Dropdown;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    marginVertical: 8,
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  dropdownContainer: {
    height: 40,
  },
  dropdown: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    borderRadius: 6,
    minWidth: 100,
    padding: 6,
  },
  dropdownText: {
    fontSize: 18,
  },
  listItemContainerStyle: {
    zIndex: 1,
    position: 'relative',
    backgroundColor: GlobalStyles.colors.primary50,
  }
});
