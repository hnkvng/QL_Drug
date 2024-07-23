import * as Yup from 'yup';
import findDuplicateUnits from '../../utils/sameUnit';
// import moment from 'moment';


const regexMST = /[0-9]+$/

const schema = Yup.object().shape({
    MST: Yup.string()
        .matches(regexMST,"Mã số không hợp lệ")
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
        .required('Không được để trống!')
        .test('sameUnit','Không được trùng đơn vị',(value) => {
            if(value.length > 1) {
                return !(findDuplicateUnits(value).length > 0);
            }
            return true;
        })
        .test("length",'Không được để trống', (value) => {
            if(value?.length === 0) {
                return false;
            } else {
                return true;
            }
           
        }),
});


export default schema;