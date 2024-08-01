import { StackScreenProps } from "@react-navigation/stack";
import { addScreenParam, detailScreenParam } from "./type";

export type RootStackParamList = {
    homeScreen: undefined,
    addScreen: addScreenParam,
    scanScreen: undefined,
    impactScreen: undefined,
    drugScreen: undefined,
    detailScreen: detailScreenParam,
    sellScreen: undefined,
};

export type  addScreenParamProp = StackScreenProps<RootStackParamList,'addScreen'>
export type  scanScreenParamProp = StackScreenProps<RootStackParamList,'scanScreen'>