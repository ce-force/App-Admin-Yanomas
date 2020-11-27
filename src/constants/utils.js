import { Platform, StatusBar } from "react-native";
import { theme } from "galio-framework";

export const StatusHeight = StatusBar.currentHeight;
export const HeaderHeight = theme.SIZES.BASE * 3.5 + (StatusHeight || 0);
export const iPhoneX = () =>
    Platform.OS === "ios" && (height === 812 || width === 812);
export const baseURL = "http://54806e5938f6.ngrok.io";

export const AppVersion = "1.0.0";
export const TeamName = "YaNoMás";
