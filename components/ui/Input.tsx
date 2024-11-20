/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import { PasswordHideIcon, PasswordShowIcon } from '../icons';
import { EInputType } from '@/utils';

interface IInputProps {
  type: EInputType;
  placeholder?: string;
  icon?: React.ReactNode;
  isReadonly?: boolean;
  isRequired?: boolean;
  register: any;
  name: string;
  errors?: any;
}

const Input: React.FC<IInputProps> = ({
  type,
  placeholder,
  icon,
  register,
  name,
  errors,
  isReadonly = false,
  isRequired = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const hasError = Boolean(errors?.[name]);

  return (
    <View className={`mb-8 relative ${hasError && 'border-red-500'}`}>
      <View
        className={`
          'flex-row items-center px-3 py-2 border-b-2
          ${hasError ? 'border-red-500' : 'border-gray-300'}
        `}
      >
        {icon && <View className="mr-2">{icon}</View>}
        <TextInput
          className={`flex-1 text-base text-black ${isReadonly && 'text-gray-400'}`}
          placeholder={isRequired ? `${placeholder || ''}*` : placeholder}
          secureTextEntry={type === 'password' && !showPassword}
          editable={!isReadonly}
          {...register(name)}
        />
        {type === 'password' && (
          <TouchableOpacity onPress={togglePasswordVisibility} className="ml-2">
            {showPassword ? <PasswordHideIcon /> : <PasswordShowIcon />}
          </TouchableOpacity>
        )}
      </View>
      {hasError && <Text className="text-red-500 text-xs mt-1">{errors[name]?.message}</Text>}
    </View>
  );
};

export default Input;
