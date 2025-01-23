import styled from "styled-components/native";
import { RFPercentage } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export const PageContainer = styled(ScrollView)`
  background-color: white;
  flex: 1;
`;

export const BackgroundImage = styled(Image).attrs({
  source: require("../../../assets/duke.jpeg"),
})`
  width: 100%;
  height: ${hp("30%")}px;
`;

export const Contents = styled(View)`
  padding: ${hp("1%")}px ${wp("4%")}px;
`;

export const Title = styled(Text)`
  font-size: ${RFPercentage(3)}px;
  margin-top: ${hp("2%")}px;
`;

export const Label = styled(Text)`
  font-size: ${RFPercentage(2.25)}px;
  margin-top: ${hp("2%")}px;
  font-weight: 600;
`;

export const Row = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-top: ${hp("2%")}px;
`;

export const LocationPin = styled(Entypo).attrs({
  name: "location-pin",
  size: RFPercentage(4),
})``;

export const Clock = styled(AntDesign).attrs({
  name: "clockcircleo",
  size: RFPercentage(4),
})``;

export const Description = styled(Text)`
  font-size: ${RFPercentage(2)}px;
  margin-left: ${wp("4%")}px;
`;

export const Book = styled(Entypo).attrs({
  name: "open-book",
  size: RFPercentage(4),
})``;

export const NotificationsIcon = styled(Ionicons).attrs({
  name: "notifications",
  size: RFPercentage(4),
})``;

export const NotificationsBackground = styled(TouchableOpacity)`
  background-color: white;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  height: ${hp("6%")}px;
  width: ${hp("6%")}px;
`;

export const BottomSheetContentContainer = styled(View)`
  border-radius: ${wp("10%")}px;
  padding: ${hp("2%")}px;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const BottomSheetTitle = styled(Text)`
  font-size: ${RFPercentage(3)}px;
  font-weight: 600;
`;

export const BottomSheetRow = styled(View)`
  flex-direction: row;
  margin-top: ${hp("2%")}px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const Name = styled(Text)`
  font-size: ${RFPercentage(2)}px;
`;

export const IconsContainer = styled(View)`
  flex-direction: row;
`;

export const Check = styled(Feather).attrs({
  name: "check",
  size: RFPercentage(4),
})`
  margin-right: ${wp("4%")}px;
`;

export const Close = styled(Ionicons).attrs({
  name: "close",
  size: RFPercentage(4),
})``;

export const Bar = styled(View)`
  width: ${wp("90%")}px;
  height: ${hp("0.2%")}px;
  background-color: black;
  margin-top: ${hp("4%")}px;
  align-self: center;
`;

export const Coins = styled(FontAwesome5).attrs({
  name: "coins",
  size: RFPercentage(4),
})``;

export const CoinsText = styled(Text)`
  font-size: ${RFPercentage(3)}px;
  margin-right: ${wp(2)}px;
  font-weight: 600;
`;

export const CoinsContainer = styled(View)`
  background-color: white;
  padding: 0 ${wp(4)}px;
  border-radius: 50px;
  flex-direction: row;
  align-items: center;
`;

export const UpperRow = styled(View)`
  position: absolute;
  top: ${hp(7.5)}px;
  z-index: 1;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 ${wp(4)}px;
  width: 100%;
`;
