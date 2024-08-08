import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ComponentJSX, ComponentProps } from "../../../services/type"
import InputApp from "../../../components/InputApp";
import { PRICE_ADD_FORM, vndMark } from "../../../services/config";
import { useFormikContext } from "formik";
import { FormPrice } from "../../../services/interface";
import { memo, useEffect } from "react";
import Button from "../../../components/Button";
import { View } from "react-native";
import { createNumberMask } from "react-native-mask-input";
import { Text, Title } from "react-native-paper";
import { numberMark } from "../../../services/config";
 
interface PriceFormProps {
    title: string,
    nameButton: string,
    valueDefault?: string,
}

const PriceForm : ComponentProps<PriceFormProps> = ({
    title,
    nameButton,
    valueDefault
    }) : ComponentJSX => {
    const {
        values,
        errors,
        handleSubmit,
        handleChange,
        setFieldValue,
        setValues
    } = useFormikContext<FormPrice>();

    useEffect(() => {
        if(valueDefault)
            setFieldValue('quyCach', valueDefault)
        if(values.quyCach && !parseInt(values.quyCach)) {
            setFieldValue('quyCach','1');
        }
    },[values.quyCach])

    return (
        <KeyboardAwareScrollView>
            <Title>{title}</Title>
            <InputApp
                label= {PRICE_ADD_FORM.label.giaBan}
                value= {values.giaBan}
                error= {errors.giaBan}
                mark= {vndMark}
                inputMode= {PRICE_ADD_FORM.inputMode.giaBan}
                placeholder= {PRICE_ADD_FORM.placeholder.giaBan}
                handleChange= {handleChange("giaBan")}
            />
            <InputApp
                label= {PRICE_ADD_FORM.label.donVi}
                value= {values.donVi}
                error= {errors.donVi}
                inputMode= {PRICE_ADD_FORM.inputMode.donVi}
                placeholder= {PRICE_ADD_FORM.placeholder.donVi}
                handleChange= {handleChange("donVi")}
                maxLength= {PRICE_ADD_FORM.maxLength.donVi}
            />
            <InputApp
                label= {PRICE_ADD_FORM.label.quyCach}
                value= {values.quyCach}
                error= {errors.quyCach}
                mark= {numberMark}
                inputMode= {PRICE_ADD_FORM.inputMode.quyCach}
                placeholder= {PRICE_ADD_FORM.placeholder.quyCach}
                handleChange= {handleChange("quyCach")}
                maxLength= {PRICE_ADD_FORM.maxLength.quyCach}
            />
            <View 
                style ={{
                    display:'flex',
                    margin: 10, 
                    justifyContent: 'space-around',
                    flexDirection: "row"
                }}
            >
                <Button
                    name="Dọn"
                    disabled= {!Object.values(values).some(text => text.length !== 0)}
                    handleClick={() => setValues(() => PRICE_ADD_FORM.initValue)}
                />
                <Button
                    name= {nameButton}
                    disabled= {Object.values(errors).some(text => text)}
                    handleClick={handleSubmit}
                />
            </View>
            <Text style = {{fontWeight: 700}}>Lưu ý: Khi thuốc được thêm, đơn vị và quy cách sẽ không chỉnh sửa được!</Text>
        </KeyboardAwareScrollView>
    )
}

export default memo(PriceForm);