import { PriceItem } from "../services/type";

export default function findDuplicateUnits(arr: PriceItem[]) {
    const unitCount = arr.reduce((acc:any, item) => {
      acc[item.donVi] = (acc[item.donVi] || 0) + 1;
      return acc;
    }, {});
    const duplicateUnits = Object.keys(unitCount).filter(unit => unitCount[unit] > 1);
    return duplicateUnits;
}