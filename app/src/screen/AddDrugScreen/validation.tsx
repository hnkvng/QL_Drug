import * as Yup from 'yup';
import moment from 'moment';

export const AddSchema = Yup.object().shape({
    MSSP: Yup.string()
        .min(13, 'Mã số sản phẩm phải có 13 chữ số')
        .required('Không được để trống!'),
    name: Yup.string()
        .required('Không được để trống!'),
    priceSell: Yup.string()
        .required('Không được để trống!'),
    quantity: Yup.string()
        .required('Không được để trống!'),
    unit: Yup.string()
        .test('unitIvalid', 'Đơn vị không hợp lệ',(value) => {
            if(value) {
                return !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value)
            }   
            return false;
        })
        .required('Không được để trống!'),
    NSX: Yup.string()
        .test('dateIvalid','Ngày sản xuất không hợp lệ',(value) => {
            if(value) {
                return moment(value, 'DD-MM-YYYY', true).isValid();
            }
            return false;
        })
    .required('Không được để trống!'),
    HSD: Yup.string()
    .test('dateIvalid','Hạn sử dụng không hợp lệ',(value) => {
        if(value) {
            return moment(value, 'DD-MM-YYYY', true).isValid();
        }
        return false;
    })
    // .when('NSX',{
    //     is: (date : string) => date.length > 0,
    //     then:'hehe',
    // })
    .required('Không được để trống!'),
});

