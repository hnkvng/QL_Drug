export const EXTERNAL_API_BASE_URLS = {
    DRUG_BANK_API: 'https://drugbank.vn/services/drugbank/api/public',
    DRUG_BANK_URL: 'https://drugbank.vn',
};

export const EXTERNAL_API_ENDPOINTS = {
    DRUG_BANK: {
        SEARCH_MEDICINE: (name: string) => `/thuoc?size=12&tenThuoc=${name}`,
        DETAIL_MEDICINE: (name: string, soDangKy: string) => `/thuoc/${name}&${soDangKy}`
    }
}
