import React from "react";
import styled from "styled-components";
import { themes } from "../../styles/ColorStyles";
import { MediumText, LinkCard } from "../../styles/TextStyles";

interface AboutMeCardRowProps {
  title: string;
  value: string | number;
}

const AboutMeCardRow = (props: AboutMeCardRowProps) => {

    const formatDate = (value: string | number): string => {
      if(typeof value === "number") {
        let date = new Date(value);
        return date.toLocaleDateString();
      } else {
        return value;
      }
  }

  return (
    <InfoDetailBox>
      <InfoKey>{props.title}</InfoKey>
      <InfoValueWrapper>
          {typeof props.value === 'string' && ( props.value.toString().includes("http") || props.value.toString().includes("https")) ?
          <LinkValue href={props.value}>{props.value}</LinkValue>
          :
          <InfoValue>{
            formatDate(props.value)
          }</InfoValue>}
      </InfoValueWrapper>
    </InfoDetailBox>
  );
};

const InfoDetailBox = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: start;
  column-gap: 6px;
`;

const InfoValueWrapper = styled.div`
    
`;

const InfoKey = styled(MediumText)`
  font-weight: bold;
  color: ${themes.light.text1};

  @media (prefers-color-scheme: dark) {
    color: ${themes.dark.text1};
  }
  
`;

const InfoValue = styled(LinkCard)`
  color: ${themes.light.text1};
  margin-bottom: 8px;

  @media (prefers-color-scheme: dark) {
    color: ${themes.dark.text1};
  }
`;

const LinkValue = styled(LinkCard)`
  color: ${themes.light.primary};
  margin-bottom: 8px;

  @media (prefers-color-scheme: dark) {
    color: ${themes.dark.primary};
  }
`;
export default AboutMeCardRow
;
