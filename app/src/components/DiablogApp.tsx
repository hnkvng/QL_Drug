import { useState } from "react";
import { ComponentJSX, ComponentProps } from "../services/type";
import { View } from 'react-native';
import { Button, Dialog, Portal, Text } from 'react-native-paper';

interface DiablogAppProps {
    visible: boolean,
    title: string,
    text: string,
    handleAction: any,
    setVisible: any,
}

const DiablogApp : ComponentProps<DiablogAppProps> = (
    {
        visible,
        title,
        text,
        handleAction,
        setVisible,
    }
    ) : ComponentJSX => {

    const hideDialog = () => setVisible(false);

    const handleChange = () => {
        handleAction()
        hideDialog()
    }
  
    return (
        <View>
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>{title}</Dialog.Title>
              <Dialog.Content>
                <Text variant="bodyMedium">{text}</Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={handleChange}>Có</Button>
                <Button onPress={hideDialog}>Đóng</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
    );
}

export default DiablogApp;