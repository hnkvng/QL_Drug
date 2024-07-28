import { InputModeType } from './type';

export const DATABASE = {
    name: 'Medicine',
    location: '~Medicine.db',
    table: {
        Drug: {
            name: 'Drug',
            column: [
                'id',
                'avatar',
                'tenThuoc',
                'NSX',
                'HSD'
            ]
        },
        DrugDetail: {
            name: 'Drug_Detail',
            column: [
                'id',
                'soDangKy',
                'huongDanSuDung',
                'hoatChat',
                'nongDo',
                'baoChe',
                'dongGoi',
                'tuoiTho',
                'congTySx',
                'nuocSx',
                'diaChiSx',
                'congTyDk',
                'nuocDk',
                'diaChiDk',
                'nhomThuoc',
                'Drug_Id',
            ]
        },
        Price: {
            name: 'Price',
            column: [
                'id',
                'giaBan',
                'donVi',
                'soLuong',
                'trongSo',
                'Drug_Id',
            ]
        }
    }
}

export const ADD_FORM = {
    initValue: {
        avatar: '',
        MST: '',
        tenThuoc: '',
        NSX: '',
        HSD: '',
        giaBan: [],
        huongDanSuDung: '',
        soDangKy: '',
        hoatChat: '',
        nongDo: '',
        baoChe: '',
        dongGoi: '',
        tuoiTho:'',
        congTySx: '',
        nuocSx: '',
        diaChiSx: '',
        congTyDk: '',
        nuocDk: '',
        diaChiDk: '',
        nhomThuoc: '',
    },
    label: {
        avatar: 'Thêm ảnh',
        MST: 'Mã số thuốc',
        tenThuoc: 'Tên thuốc',
        NSX: 'Ngày sản xuất',
        HSD: 'Hạn sử dụng',
        giaBan: 'Giá',
        huongDanSuDung:'Hướng dẫn sử dụng',
        soDangKy: 'Số đăng ký',
        hoatChat: 'Hoạt chất',
        nongDo: 'Nồng độ',
        baoChe: 'Bào chế',
        dongGoi: 'Quy cách đống gói',
        tuoiTho:'Tuổi thọ',
        congTySx: 'Công ty sản xuất',
        nuocSx: 'Nước sản xuất',
        diaChiSx: 'Địa chỉ sản xuất',
        congTyDk: 'Công ty đăng ký',
        nuocDk: 'Nước đăng ký',
        diaChiDk: 'Địa chỉ đăng ký',
        nhomThuoc: 'Nhóm thuốc',
    },
    maxLength: {
        MST: 13,
        tenThuoc: 255,
        huongDanSuDung: 1000,
    },
    inputMode: {
        MST: 'numeric' as InputModeType,
        tenThuoc: 'text' as InputModeType,
        NSX: 'numeric' as InputModeType,
        HSD: 'numeric' as InputModeType,
        huongDanSuDung: 'text' as InputModeType,
    },
    placeholder: {
        MST: 'Nhập mã số thuốc',
        tenThuoc: 'Nhập tên thuốc',
        NSX: 'Chọn ngày sản xuất',
        HSD: 'Chọn hạn sử dụng',
        huongDanSuDung: 'Nhập hướng dẫn cho thuốc',
    },
    iconRight: {
        MST: 'barcode-scan',
        NSX: 'calendar-month',
        HSD: 'calendar-month',
        giaBan: 'cash-multiple',
    },
    iconLeft: {
        MST: 'barcode',
        tenThuoc: 'medicinebox',
        huongDanSuDung: 'tag-text'
    }
}

export const PRICE_ADD_FORM  = {
    initValue: {
        giaBan: '',
        donVi: '',
        soLuong: '',
    },
    label:  {
        giaBan: 'Giá bán',
        donVi: 'Đơn vị',
        soLuong: 'Số lượng',
    },
    inputMode: {
        giaBan: 'numeric' as InputModeType,
        donVi: 'text' as InputModeType,
        soLuong: 'numeric' as InputModeType,
    },
    placeholder: {
        giaBan: 'Nhập giá bán',
        donVi: 'Nhập đơn vị',
        soLuong: 'Nhập số lượng',
    },
    maxLength: {
        donVi: 255,
        soLuong: 4,
    }
}

export const STATUS = {
    susscess: {
        icon: 'check',
        color: 'green'
    },
    warning: {
        icon: 'alert',
        color: 'orange'
    },
    error: {
        icon: 'alert-circle-outline',
        color: 'red',
    }
}

export const LIST_DATA = {
    title: {
        list1: 'Danh sách thuốc còn hạn',
        list2: 'Danh sách thuốc gần hết hạn',
        list3: 'Danh sách thuốc đã hết hạn',
    }
}