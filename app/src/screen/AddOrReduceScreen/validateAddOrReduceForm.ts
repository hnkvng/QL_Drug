import * as Yup from 'yup';


const schema = Yup.object().shape({
    soLuong: Yup.string()
        .required('Không được để trống!'),
    donVi: Yup.string(),
    themBot: Yup.string(),
});


export default schema;