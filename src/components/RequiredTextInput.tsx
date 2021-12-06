import { TextField, TextFieldProps } from '@mui/material';
import { useField } from 'react-final-form';
import { FC } from 'react';

type Props = {
  id: string;
} & Omit<TextFieldProps, 'value' | 'onChange' | 'onBlur' | 'error'>;

const RequiredTextInput: FC<Props> = ({ id, helperText, ...props }) => {
  const { input, meta } = useField(id, {
    subscription: { value: true, touched: true, error: true },
    validate: (value) => (value ? undefined : 'This field is required'),
  });
  const hasError = !!(meta.touched && meta.error);
  return <TextField {...props} {...input} helperText={hasError ? meta.error : helperText} error={hasError} />;
};

export default RequiredTextInput;
