import { PriceItem } from "../services/interface";

export default function findDuplicateUnits(arr: PriceItem[]) {
    const unitCount = arr.reduce((acc, item) => {
      acc[item.unit] = (acc[item.unit] || 0) + 1;
      return acc;
    }, {});
  
    const duplicateUnits = Object.keys(unitCount).filter(unit => unitCount[unit] > 1);
    return duplicateUnits;
}