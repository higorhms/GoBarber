import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
    width: 600px;
    margin: 30px auto;

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

        hr {
            border: 0;
            height: 1px;
            background: rgba(255, 255, 255, 0.2);
            margin: 10px 0 20px;
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
                background: ${darken(0.05, '#3b9eff')};
            }
        }
    }
    > button {
        width: 100%;
        margin: 10px 0 0;
        background: #953249;
        height: 44px;
        font-weight: bold;
        color: #eee;
        border: 0px;
        border-radius: 4px;
        font-size: 16px;

        &:hover {
            background: ${darken(0.05, '#953249')};
        }
    }
`;
