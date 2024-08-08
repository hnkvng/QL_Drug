import * as Yup from 'yup';
// import moment from 'moment';

const regexVN = /[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìĩỉíòóôõùúăđĩũơẰẮẴẲẶĐĨ̀Ĩ́Ĩ̃Ĩ̉Ị̃ỒỐỖỔỘỜỚỠỞỢÙ̀Ù́Ù̃Ù̉Ụ̀ỲỴÝỶỸỊ\ ]+$/

const schema = Yup.object().shape({
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
    donVi: Yup.string()
        .trim()
        .matches(regexVN, "Đơn vị không hợp lệ")
        .required('Không được để trống!'),
    quyCach: Yup.string()
        .required('Không được để trống!'),
});


export default schema;