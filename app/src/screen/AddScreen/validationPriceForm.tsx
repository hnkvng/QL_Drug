import * as Yup from 'yup';
// import moment from 'moment';

const regexVN = /[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơẰẮẴẲẶĐĨ̀Ĩ́Ĩ̃Ĩ̉Ị̃ỒỐỖỔỘỜỚỠỞỢÙ̀Ù́Ù̃Ù̉Ụ̀ỲỴÝỶỸỊ\ ]+$/
const regexAmount = /[0-9]+$/

const schema = Yup.object().shape({
    giaBan: Yup.string()
        .test('maxValue','Số tiền nằm trong khoảng (1 - 999999999)', (value) => {
            if(value) {
                const price = parseInt(value?.replaceAll('.',''));
                if(price > 0 && price < 1000000000) {
                    return true;
                }
            }
        })
        .required('Không được để trống!'),
    donVi: Yup.string()
        .matches(regexVN, "Đơn vị không hợp lệ")
        .required('Không được để trống!'),
    soLuong: Yup.string()
        .matches(regexAmount, "Số lượng không hợp lệ")
        .required('Không được để trống!'),
});


export default schema;