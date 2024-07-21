import { ComponentJSX, ComponentProps } from "../services/type";
import {Formik} from 'formik';
import {memo} from 'react';

interface FormikAppProps {
    initValue: any,
    validation: any,
    enableReinitialize?: boolean,
    handleSubmit: any,
    children: ComponentJSX
}

const FormikApp : ComponentProps<FormikAppProps> = ({
    initValue,
    validation,
    enableReinitialize,
    handleSubmit,
    children
    }) : ComponentJSX => {

    return (
        <Formik
            initialValues={initValue}
            validationSchema={validation}
            enableReinitialize = {enableReinitialize}
            validateOnMount
            onSubmit={handleSubmit}
        >
            {children}
        </Formik>
    )
}

export default memo(FormikApp);