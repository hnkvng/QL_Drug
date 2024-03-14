const searchDrug = (text : string) => `https://drugbank.vn/services/drugbank/api/public/thuoc?size=12&tenThuoc=${text}`
const detailsSearchDrug = () => 'https://api.nhathuoclongchau.com.vn/lccus/search-product-service/api/products/ecom/product/search/list'
// 'https://drugbank.vn/services/drugbank/api/public/thuoc?page=0&size=12&tenThuoc=panadol&sort=rate,desc&sort=tenThuoc,asc'
// 'https://drugbank.vn/api/public/gridfs/box-panadol-extra-optizobaddvi-thuoc100190do-chinh-dien-15236089259031797856781.jpg'
export {
    searchDrug,
    detailsSearchDrug
}