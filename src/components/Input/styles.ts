import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;

  width: 100%;

  padding: 16px;

  background: #e8d6cb;

  color: #12130f;

  border-radius: 8px;
  border: 2px solid #12130f;

  & + div {
    margin-top: 8px;
  }

  input {
    flex: 1;

    background: transparent;

    border: 0;

    color: #12130f;

    font-size: 16px;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;
