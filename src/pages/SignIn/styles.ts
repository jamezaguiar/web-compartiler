import styled from 'styled-components';

export const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.img`
  height: 75vh;
`;

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CardContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 75vh;

  background-color: #fff;

  border: 4px solid #e6e6e6;
  border-radius: 16px;

  margin: 0 96px 0 96px;
  padding: 16px;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  span {
    cursor: pointer;
    font-weight: 600;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  h1 {
    font-size: 40px;
    font-family: 'Merienda One', cursive;
  }
  p {
    font-size: 18px;
    margin-top: 2px;

    span {
      font-size: 12px;
      cursor: pointer;
    }
  }
`;

const OtherColors = styled.div`
  /* background-color: #8093f1;
  background-color: #ea7317;
  background-color: #ff3c38; */
`;
