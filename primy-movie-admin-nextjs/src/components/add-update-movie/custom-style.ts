// styles/selectStyles.ts

import { StylesConfig } from 'react-select';

interface Option {
  value: string;
  label: string;
}

export const selectStyles = (isDarkMode: boolean): StylesConfig<Option> => ({
  control: (base) => ({
    ...base,
    backgroundColor: isDarkMode ? '#2d2d2d' : '#fff',
    color: isDarkMode ? '#fff' : '#000',
    borderColor: isDarkMode ? '#444' : '#ccc',
    '&:hover': {
      borderColor: isDarkMode ? '#555' : '#007bff'
    }
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: isDarkMode ? '#2d2d2d' : '#fff'
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? (isDarkMode ? '#444' : '#f0f0f0') : 'transparent',
    color: isDarkMode ? '#fff' : '#000'
  }),
  singleValue: (base) => ({
    ...base,
    color: isDarkMode ? '#fff' : '#000'
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: isDarkMode ? '#444' : '#e0e0e0'
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: isDarkMode ? '#fff' : '#000'
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: isDarkMode ? '#fff' : '#000',
    '&:hover': {
      backgroundColor: isDarkMode ? '#555' : '#ccc',
      color: isDarkMode ? '#ddd' : '#000'
    }
  }),
  input: (base) => ({
    ...base,
    color: isDarkMode ? '#fff' : '#000'
  }),
});
