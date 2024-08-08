import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { addOrReduceScreenParam, detailScreenParam, updateScreenParam } from "./type";

export type RootStackParamList = {
    homeScreen: undefined,
    addScreen: undefined,
    updateScreen: updateScreenParam,
    scanScreen: undefined,
    impactScreen: undefined,
    addOrReduceScreen: addOrReduceScreenParam,
    drugScreen: undefined,
    storageScreen: undefined,
    detailScreen: detailScreenParam,
    sellScreen: undefined,
};

export type PropsNavigation = StackNavigationProp<RootStackParamList>;