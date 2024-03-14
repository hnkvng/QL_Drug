import Realm from "realm";
import { Drug } from "./drug";

export const configDrug: Realm.Configuration = {
    schema: [Drug.schema],
    path: 'drug.realm',
    schemaVersion: 1,
};
