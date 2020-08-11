import styled, { css } from 'styled-components';

import Tooltip from '../../components/Tooltip';

interface ContainerProps {
  isErrored: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
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

  ${props =>
    props.isErrored &&
    !props.isFilled &&
    css`
      border-color: #c53030;
    `}

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

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;
    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
