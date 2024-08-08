import * as Yup from 'yup';
import { isValidEAN } from '../../utils/testBarcode';

const schema = Yup.object().shape({
    MST: Yup.string()
        .test('barcodeIvalid', 'Barcode không hợp lệ', (value) => {
            if(value)
            if(isValidEAN(value)) {
                return true;
            }
            return false;
        })
        .min(13, 'Mã số sản phẩm phải có 13 chữ số')
        .required('Không được để trống!'),
    tenThuoc: Yup.string()
        .required('Không được để trống!'),
    NSX: Yup.string()
        .test('maxDate', "Ngày sản xuất không được lớn hơn ngày hiện tại", (value) => {
            if(value && (new Date() < new Date(value))) {
                return false;
            }
            return true;
        }) 
        .required('Không được để trống!'),
    HSD: Yup.string()
        .test('minDate', "Hạn sử dụng không được nhỏ hơn hoặc bằng ngày sản xuất", (value, form) => {
            if(form.options.context) 
            if( value && 
                form.options.context.NSX && 
                (new Date(form.options.context.NSX) >= new Date(value))
            ) {
                return false;
            }
            return true;
        }) 
        .required('Không được để trống!'),
    giaBan: Yup.array()
        .of(
            Yup.object().shape({
            giaBan: Yup.string()
                .test('maxValue','Số tiền nằm trong khoảng (1 - 999.999.999)', (value) => {
                    if(value) {
                        const price = parseInt(value?.replaceAll('.',''));
                        if(price > 0 && price < 1000000000) {
                            return true;
                        }
                    }
                })
                .required('Không được để trống!'),
            donVi: Yup.string(),
        }))
        .required('Không được để trống!')
});


export default schema;