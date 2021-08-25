import React from 'react'
import styled from "styled-components";

function DefaultChat() {
    return (
       <DefaultPage>
           <Container>
              <h2>Please Click on Any Chat to view The Chat</h2>
           </Container>
       </DefaultPage>
    )
}

const DefaultPage = styled.div`
 width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Container = styled.div`
 margin-left: 15%;
  
  margin-right: 15%;
  flex-direction: column;
  padding: 100px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
`;

export default DefaultChat
