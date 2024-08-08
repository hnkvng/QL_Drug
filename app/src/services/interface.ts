export interface FormDrug {
    avatar: string,
    MST: string,
    tenThuoc: string,
    NSX: string,
    HSD: string,
    giaBan: FormPrice[],
    huongDanSuDung: string,
    soDangKy: string,
    hoatChat: string,
    nongDo: string,
    baoChe: string,
    dongGoi: string,
    tuoiTho:string,
    congTySx: string,
    nuocSx: string,
    diaChiSx: string,
    congTyDk: string,
    nuocDk: string,
    diaChiDk: string,
    nhomThuoc: string,
};

export interface FormPrice {
    giaBan: string,
    donVi: string,
    quyCach: string,
};

export interface FormAddOrReduce {
    soLuong: string,
    donVi: string,
    themBot: string,
}

export interface DataSearchDrug {
    label: string,
    value: string,
    soDangKy: string,
}

