import { StackScreenProps } from "@react-navigation/stack";

export type addScreenParam =  {
    avatar?: string,
    MST?: string,
    tenThuoc?: string,
    NSX?: string,
    HSD?: string,
    giaBan?: [],
}

// export type detailScreenParam =  {
//     id: number,
// }

export type RootStackParamList = {
    layout: undefined,
    addScreen: addScreenParam | undefined,
    scanScreen: undefined,
};

export type  addScreenParamProp = StackScreenProps<RootStackParamList,'addScreen'>