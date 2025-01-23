import React, { useState, useRef, useMemo } from "react";
import {
  BackgroundImage,
  Bar,
  Book,
  BottomSheetContentContainer,
  BottomSheetRow,
  BottomSheetTitle,
  CancelButton,
  CancelButtonText,
  Check,
  Clock,
  Close,
  Coins,
  CoinsContainer,
  CoinsText,
  Contents,
  Description,
  IconsContainer,
  Label,
  LocationPin,
  Name,
  NotificationsBackground,
  NotificationsIcon,
  PageContainer,
  Row,
  Title,
  UpperRow,
} from "./Upcoming.styles";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { createToast } from "../../components/Toast.component";

export const Upcoming = () => {
  const [people, setPeople] = useState([
    "Olivia Rodrigo",
    "Matt Damon",
    "Taylor Swift",
    "Harry Styles",
    "Adele",
    "Washington",
  ]);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["60%"], []);

  const handleSheetChange = (index) => {
    if (index === -1) {
      bottomSheetRef.current?.close();
    }
  };

  const removePerson = (name, status) => {
    setPeople((prevPeople) => prevPeople.filter((person) => person !== name));
    createToast(
      "success",
      status == "accept"
        ? `Accepted ${name}'s request`
        : `Rejected ${name}'s request`,
      status == "accept" ? `Sharing your number` : "Not sharing your number"
    );
  };

  return (
    <PageContainer>
      <UpperRow>
        <CoinsContainer>
          <CoinsText>50</CoinsText>
          <Coins />
        </CoinsContainer>
        <NotificationsBackground
          onPress={() => {
            bottomSheetRef.current.expand();
          }}
        >
          <NotificationsIcon />
        </NotificationsBackground>
      </UpperRow>

      <BackgroundImage />
      <Contents>
        <Title>Brian, your seat is confirmed!</Title>
        <Row>
          <LocationPin />
          <Description>Juju, 737 9th St</Description>
        </Row>
        <Row>
          <Clock />
          <Description>5:00pm, Wednesday January 29th</Description>
        </Row>
        <Row>
          <Book />
          <Description>
            Computer Science, Biology, Art History, Music Theory, Anthropology,
            Math
          </Description>
        </Row>

        {/* <Bar /> */}
        {/* {people.map((person) => (
          <BottomSheetRow key={person}>
            <Name>Request {person}'s number?</Name>
            <IconsContainer>
              <Check onPress={() => removePerson(person, "accept")} />
              <Close onPress={() => removePerson(person, "reject")} />
            </IconsContainer>
          </BottomSheetRow>
        ))} */}
      </Contents>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onChange={handleSheetChange}
        handleStyle={{
          backgroundColor: "#f5f5f5",
        }}
      >
        <BottomSheetView
          style={{
            backgroundColor: "#f5f5f5",
          }}
        >
          <BottomSheetContentContainer>
            <BottomSheetTitle>Notifications</BottomSheetTitle>

            {people.map((person) => (
              <BottomSheetRow key={person}>
                <Name>{person} wants to connect</Name>
                <IconsContainer>
                  <Check onPress={() => removePerson(person, "accept")} />
                  <Close onPress={() => removePerson(person, "reject")} />
                </IconsContainer>
              </BottomSheetRow>
            ))}
          </BottomSheetContentContainer>
        </BottomSheetView>
      </BottomSheet>
    </PageContainer>
  );
};
