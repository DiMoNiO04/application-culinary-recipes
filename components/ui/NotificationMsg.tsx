import React, { useEffect, useState } from 'react';
import { Animated, Text } from 'react-native';

interface INotificationMsg {
  isSuccess: boolean;
  msg: string;
  onClose: () => void;
}

const NotificationMsg: React.FC<INotificationMsg> = ({ isSuccess, msg, onClose }) => {
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(onClose);
      }, 3500);
    });
  }, [opacity, onClose]);

  return (
    <Animated.View
      className={`absolute bottom-4 right-4 px-4 py-2 rounded-lg ${isSuccess ? 'bg-green-500' : 'bg-red-500'}`}
      style={{ opacity }}
    >
      <Text className="text-white font-bold">{msg}</Text>
    </Animated.View>
  );
};

export default NotificationMsg;
