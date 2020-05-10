import React, {
  InputHTMLAttributes,
  useRef,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, registerField, error } = useField(name);

  const handleIsFocused = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleIsNotFocused = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({ name: fieldName, ref: inputRef.current, path: 'value' });
  }, [registerField, fieldName]);

  return (
    <Container isFocused={isFocused} isFilled={isFilled}>
      {Icon && <Icon />}
      <input
        onFocus={handleIsFocused}
        onBlur={handleIsNotFocused}
        ref={inputRef}
        {...rest}
      />
      {error}
    </Container>
  );
};

export default Input;
