import axios from "axios";
import { searchDrug } from "./url";

const searhNameDrug = (text : string) => axios.get(searchDrug(text))


export {
    searhNameDrug,
}