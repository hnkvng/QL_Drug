
interface InputOption {
    values: string,
    errors: string,
}


interface  FormOption {
    MSSP: InputOption,
    name: InputOption,
    priceSell: InputOption,
    quantity: InputOption,
    unit: InputOption,
    NSX: InputOption,
    HSD: InputOption,
}

const FORM_OPTION :  FormOption= {
    MSSP: {
        values: '',
        errors: 'Không được để trống!',
    },
    name: {
        values: '',
        errors: 'Không được để trống!',
    },
    priceSell: {
        values: '',
        errors: 'Không được để trống!',
    },
    quantity: {
        values: '',
        errors: 'Không được để trống!',
    },
    unit: {
        values: '',
        errors: 'Không được để trống!',
    },
    NSX: {
        values: '',
        errors: 'Không được để trống!',
    },
    HSD: {
        values: '',
        errors: 'Không được để trống!',
    }
}

export default FORM_OPTION