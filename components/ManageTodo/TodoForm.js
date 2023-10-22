import { View, StyleSheet, Text } from "react-native";
import { useState } from "react";
import Input from "./Input";
import Button from "../UI/Button";
import Dropdown from "../UI/Dropdown";
import DatePicker from "../UI/DatePicker";

import { GlobalStyles } from "../../constants/styles";

const TodoForm = ({ submitButtonLabel, onCancel, onSubmit, defaultValues }) => {
  const [inputs, setInputs] = useState({
    priority: {
      value: defaultValues?.priority || {label: 'None', value: 'None'},
    },
    date: {
      value: defaultValues ? defaultValues?.date : new Date(),
    },
    description: {
      value: defaultValues?.description || '',
      isValid: true,
    },
    completed: {
      value: !!defaultValues?.completed
    }
  });

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setInputs((currInput) => {
      return {
        ...currInput,
        [inputIdentifier]: { value: enteredValue, isValid: true }
      }
    });
  }

  const submitHandler = () => {
    const todoData = {
      priority: inputs.priority.value,
      date: inputs.date.value,
      description: inputs.description.value,
      completed: inputs.completed.value,
    };

    const descriptionIsValid = todoData.description.trim().length > 0;

    if (!descriptionIsValid) {
      setInputs((currInput) => {
        return {
          priority: { value: currInput.priority.value },
          date: { value: currInput.date.value },
          description: { value: currInput.description.value, isValid: descriptionIsValid },
          completed: { value: currInput.completed.value }
        }
      })
      return;
    }
    onSubmit(todoData);
  }

  const formIsInvalid = !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Todo</Text>
      <View style={styles.inputsRow}>
        <Dropdown 
          label="Priority"
          selectedOption={inputs.priority.value}
          onChangeOption={inputChangeHandler.bind(this, 'priority')}
        />
        <DatePicker 
          selectedDate={inputs.date.value}
          onChangeDate={inputChangeHandler.bind(this, 'date')}
        />
      </View>
      <Input 
        label="Description" 
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, 'description'),
          value: inputs.description.value
        }}
      />
      {formIsInvalid && 
        <Text style={styles.errorText}>
          Invalid input values, please check your entered data.
        </Text>
      }
      <View style={styles.buttons}>
        <Button
          style={styles.button}
          mode='flat' 
          onPress={onCancel}
        >
          Cancel
        </Button>
        <Button onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  )
}

export default TodoForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
