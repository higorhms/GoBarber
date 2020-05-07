import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
    height: 100%;
    background: linear-gradient(-10deg, #301199, #100496);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Content = styled.div`
    width: 315px;
    text-align: center;

    form {
        margin-top: 30px;
        display: flex;
        flex-direction: column;

        input {
            background: rgba(0, 0, 0, 0.1);
            border: 0;
            border-radius: 4px;
            height: 44px;
            padding: 0 15px;
            color: #fff;
            margin: 0 0 10px;

            &::placeholder {
                color: rgba(255, 255, 255, 0.7);
            }
        }

        span {
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            margin-bottom: 10px;
            color: #953249;
            font-weight: bold;
        }

        button {
            margin: 5px 0 0;
            background: #3b9eff;
            height: 44px;
            font-weight: bold;
            color: #fff;
            border: 0px;
            border-radius: 4px;
            font-size: 16px;

            &:hover {
                background: ${darken(0.03, '#3b9eff')};
            }
        }

        a {
            margin-top: 10px;
            color: rgba(255, 255, 255, 0.7);

            :hover {
                color: #fff;
            }
        }
    }
`;
