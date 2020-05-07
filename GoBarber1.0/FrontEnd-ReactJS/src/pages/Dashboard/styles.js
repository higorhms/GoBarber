import styled from 'styled-components';

export const Container = styled.div`
    max-width: 600px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;

    header {
        display: flex;
        align-self: center;
        align-items: center;

        strong {
            color: #fff;
            margin: 0 15px;
            font-size: 24px;
        }

        button {
            border: none;
            background: none;
        }
    }

    ul {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 15px;
        margin-top: 30px;
    }
`;

export const Time = styled.li`
    background: #fff;
    padding: 20px;
    border-radius: 4px;

    opacity: ${props => (props.past ? 0.6 : 1)} ;

    strong {
        display: block;
        color: ${props => (props.available ? '#999' : '#301199')};
        font-size: 20px;
        font-weight: normal;
    }

    span {
        display: block;
        margin-top: 3px;
        color: ${props => (props.available ? '#999' : '#301199')};
    }
`;
