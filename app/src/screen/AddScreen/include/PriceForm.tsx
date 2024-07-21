import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ComponentJSX, ComponentProps } from "../../../services/type"
import InputApp from "../../../components/InputApp";
import { PRICE_ADD_FORM } from "../../../services/config";
import { useFormikContext } from "formik";
import { FormPrice } from "../../../services/interface";
import { memo } from "react";
import Button from "../../../components/Button";
import { View } from "react-native";
import { createNumberMask } from "react-native-mask-input";
 
interface PriceFormProps {
    nameItem: string,
}

const vndMark = createNumberMask({
    delimiter: '.',
    separator: '',
    precision: 0,
})
  

const PriceForm : ComponentProps<PriceFormProps> = ({
    nameItem,
    }) : ComponentJSX => {
    const {
        values,
        errors,
        handleSubmit,
        handleChange,
        setValues
    } = useFormikContext<FormPrice>();

    return (
        <KeyboardAwareScrollView>
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
            />
            <InputApp
                label= {PRICE_ADD_FORM.label.soLuong(nameItem)}
                value= {values.soLuong}
                error= {errors.soLuong}
                inputMode= {PRICE_ADD_FORM.inputMode.soLuong}
                placeholder= {PRICE_ADD_FORM.placeholder.soLuong(nameItem)}
                handleChange= {handleChange("soLuong")}
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
                    name="Thêm"
                    disabled= {Object.values(errors).some(text => text)}
                    handleClick={handleSubmit}
                />
            </View>
        </KeyboardAwareScrollView>
    )
}

export default memo(PriceForm);