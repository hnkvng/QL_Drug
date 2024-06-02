import { StackScreenProps } from "@react-navigation/stack";

export type addScreenParam =  {
    code: string,
}

// export type detailScreenParam =  {
//     id: number,
// }

export type RootStackParamList = {
    main: undefined,
    // searchScreen: undefined,
    addScreen: addScreenParam | undefined,
    // trashScreen: undefined,
    scanScreen: undefined,
    // detailScreen: detailScreenParam,
};

export type  addScreenParamProp = StackScreenProps<RootStackParamList,'addScreen'>