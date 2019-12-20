import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
    background: #fff;
    padding: 0 30px;
`;

export const Content = styled.div`
    height: 64px;
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    nav {
        display: flex;
        align-items: center;

        img {
            margin-right: 20px;
            padding-right: 20px;
            border-right: 1px solid #eee;
        }

        a {
            font-weight: bold;
            color: #301199;

            :hover {
                color: ${lighten(0.3, '#301199')};
            }
        }
    }

    aside {
        display: flex;
        align-items: center;
    }
`;

export const Profile = styled.div`
    display: flex;
    margin-left: 20px;
    padding-left: 20px;
    border-left: 1px solid #eee;

    div {
        text-align: right;
        margin-right: 10px;

        strong {
            display: block;
            color: #333;
        }

        a {
            display: block;
            font-size: 12px;
            margin-top: 2px;
            color: #301199;

            :hover {
                color: ${lighten(0.3, '#301199')};
            }
        }
    }

    img {
        height: 32px;
        border-radius: 50%;
    }
`;
