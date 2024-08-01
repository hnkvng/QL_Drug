import { Modal, Portal } from "react-native-paper"
import { ComponentJSX, ComponentProps } from "../services/type"
import { StyleProp, ViewStyle } from "react-native"
import { memo } from "react"

interface ModalAppProps {
    style?: StyleProp<ViewStyle>,
    visible: boolean,
    setVisible: any,
    children: any
}

const ModalApp : ComponentProps<ModalAppProps> = ({
    style,
    visible,
    setVisible,
    children
    }) : ComponentJSX => {

    return (   
        <Portal >
            <Modal
                dismissable
                style = {style}
                visible = {visible}
                onDismiss= {() => setVisible(false)}
                children = {children}
            >
            </Modal>
        </Portal>
    )
}

export default memo(ModalApp);