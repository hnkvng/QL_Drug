export interface FormDrug {
    avatar: string,
    MST: string,
    tenThuoc: string,
    soDangKy: string,
    NSX: string,
    HSD: string,
    giaBan: FormPrice[],
};

export interface FormPrice {
    giaBan: string,
    donVi: string,
    soLuong: string,
};

export interface DataSearchDrug {
    label: string,
    value: string,
    soDangKy: string,
}