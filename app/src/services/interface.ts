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

export type DrugItem = {
    avatar: string,
    soDangKy: string,
    MST: number;
    tenThuoc: string;
    NSX: string,
    HSD: string,
}

export type PriceItem = {
    giaBan: string,
    donVi: string,
    soLuong: number,
}

export type Error = {
    message: string
}