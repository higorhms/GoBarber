import styled from 'styled-components';
import { shade } from 'polished';

import imgBackground from '../../assets/sign-in-background.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  align-items: center;
  width: 100%;
  max-width: 700px;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    input {
      background: #232129;
      border-radius: 10px;
      border: 2px solid #232129;
      padding: 16px;
      width: 100%;
      color: #f4ede8;

      &::placeholder {
        color: #f4ede8;
      }

      & + input {
        margin-top: 10px;
      }
    }

    button {
      background: #ff9000;
      height: 56px;
      border: none;
      border-radius: 10px;
      padding: 0 16px;
      width: 100%;
      color: #312e38;
      font-weight: 500;
      margin-top: 16px;
      transition: background-color 0.2s;

      &:hover {
        background: ${shade(0.2, '#ff9000')};
      }
    }

    > a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    display: flex;
    color: #ff9000;
    margin-top: 24px;
    text-decoration: none;
    align-items: center;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }

    svg {
      margin-right: 15px;
    }
  }
`;

export const ImageBackground = styled.div`
  flex: 1;
  background: url(${imgBackground}) no-repeat center;
  background-size: cover;
`;
