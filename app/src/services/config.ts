import { InputModeType } from "./type";

export const ADD_FORM = {
    initValue: {
        avatar: '',
        MST: '',
        tenThuoc: '',
        soDangKy: '',
        NSX: '',
        HSD: '',
        giaBan: [],
    },
    label: {
        avatar: 'Thêm ảnh',
        MST: 'Mã số thuốc',
        tenThuoc: 'Tên thuốc',
        NSX: 'Ngày sản xuất',
        HSD: 'Hạn sử dụng',
        giaBan: "Giá",
    },
    maxLength: {
        MST: 13,
        tenThuoc: 255,
    },
    inputMode: {
        MST: 'numeric' as InputModeType,
        tenThuoc: "text" as InputModeType,
        NSX: 'numeric' as InputModeType,
        HSD: 'numeric' as InputModeType,
    },
    placeholder: {
        MST: 'Nhập mã số thuốc',
        tenThuoc: 'Nhập tên thuốc',
        NSX: 'Chọn ngày sản xuất',
        HSD: 'Chọn hạn sử dụng',
    },
    iconRight: {
        MST: "barcode-scan",
        NSX: "calendar-month",
        HSD: "calendar-month",
        giaBan: "cash-multiple"
    },
    iconLeft: {
        MST: "barcode",
        tenThuoc: "medicinebox",
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
        soLuong: (name : string) => name !== '' ? `Số lượng/${name}`: "Số lượng",
    },
    inputMode: {
        giaBan: 'numeric' as InputModeType,
        donVi: "text" as InputModeType,
        soLuong: 'numeric' as InputModeType,
    },
    placeholder: {
        giaBan: 'Nhập giá bán',
        donVi: 'Nhập đơn vị',
        soLuong: (name : string) =>  name !== '' ? `Nhập số lượng trên mỗi ${name}` : "Nhập số lượng",
    },
    maxLength: {
        donVi: 255,
        soLuong: 6,
    }
}

export const STATUS = {
    susscess: {
        icon: "check",
        color: "green"
    },
    warning: {
        icon: "alert",
        color: "yellow"
    },
    error: {
        icon: "alert-circle-outline",
        color: "red",
    }
}

export const LIST_DATA = {
    title: {
        list1: "Danh sách thuốc còn hạn",
        list2: "Danh sách thuốc gần hết hạn",
        list3: "Danh sách thuốc đã hết hạn",
    }
}