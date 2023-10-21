import { View, Text, StyleSheet } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';

import { GlobalStyles } from "../../constants/styles";

const DatePicker = ({ selectedDate, onChangeDate }) => {
  const today = new Date();
  const inputDate = selectedDate && new Date(selectedDate);

  const [date, setDate] = useState(today);

  const onChangeHandler = (event, selectedDate) => {
    setDate(selectedDate);
    onChangeDate(selectedDate);
  }

  return (
    <View style={styles.inputContainer}> 
      <Text style={styles.label}>Due Date</Text>
      <View style={styles.input}>
        <DateTimePicker 
          testID="dateTimePicker"
          mode={'date'}
          value={inputDate || date}
          minimumDate={today} 
          onChange={onChangeHandler}
          style={styles.datepicker}
        />
      </View>
    </View>
  )
}

export default DatePicker;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
    borderRadius: 6,
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    borderRadius: 6,
    minWidth: 100,
    padding: 6,
    height: 49,
  },
  datepicker: {
    position: 'absolute',
    right: 40,
    top: 8,
  },
});
