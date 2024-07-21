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
        .required('Không được để trống!'),
    HSD: Yup.string()
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