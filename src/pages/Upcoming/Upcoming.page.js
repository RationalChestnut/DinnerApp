import React from "react";
import {
  BackgroundImage,
  Book,
  CancelButton,
  CancelButtonText,
  Clock,
  Contents,
  Description,
  Label,
  LocationPin,
  PageContainer,
  Row,
  Title,
} from "./Upcoming.styles";

export const Upcoming = () => {
  return (
    <PageContainer>
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
      </Contents>
      <CancelButton>
        <CancelButtonText>Cancel Reservation</CancelButtonText>
      </CancelButton>
    </PageContainer>
  );
};
