import React from "react";
import styled from "styled-components";
import Card from "./Card";
import Followers from "./Followers";
import FirebaseCRUD from "./FirebaseCRUD";
import FirebaseCRUDFee from "./FirebaseCRUDFee";
import FirebaseDashboard from "./FirebaseDashboard";
const User = () => {
  return (
    <section className="section">
      <Wrapper className="section-center">
        {/*     <Card />
        <Followers /> */}
        <FirebaseCRUD />
        <FirebaseCRUDFee />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  padding-top: 2rem;
  display: grid;
  gap: 3rem 2rem;
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
  /* align-items: start; */
`;

export default User;
