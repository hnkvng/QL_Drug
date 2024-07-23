import { StackScreenProps } from "@react-navigation/stack";

type addScreenParam =  {
    avatar?: string,
    MST?: string,
    tenThuoc?: string,
    NSX?: string,
    HSD?: string,
    giaBan?: [],
}

type scanScreenParam =  {
    setCode: (code : string) => void
}

// export type detailScreenParam =  {
//     id: number,
// }

export type RootStackParamList = {
    layout: undefined,
    addScreen: addScreenParam | undefined,
    scanScreen: scanScreenParam | undefined,
    searchScreen: undefined,
};

export type  addScreenParamProp = StackScreenProps<RootStackParamList,'addScreen'>
export type  scanScreenParamProp = StackScreenProps<RootStackParamList,'scanScreen'>