import { StackScreenProps } from "@react-navigation/stack";
import { addScreenParam } from "./type";

export type RootStackParamList = {
    layout: undefined,
    addScreen: addScreenParam,
    scanScreen: undefined,
    searchScreen: undefined,
};

export type  addScreenParamProp = StackScreenProps<RootStackParamList,'addScreen'>
export type  scanScreenParamProp = StackScreenProps<RootStackParamList,'scanScreen'>