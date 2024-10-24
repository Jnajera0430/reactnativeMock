import { Picker } from "@react-native-picker/picker";

const Select = ({ valueSelect, handleSelectFilter }) => {
  return (
    <Picker selectedValue={valueSelect} onValueChange={handleSelectFilter}>
      <Picker.Item label='Latest repositories' value='latestRepositories' />
      <Picker.Item
        label='Highest rated repositories'
        value='highestRatedRepositories'
      />
      <Picker.Item
        label='Lowest rated repositories'
        value='lowestRatedRepositories'
      />
    </Picker>
  );
};

export default Select;
