import styled from 'styled-components/native';
import { TextInput } from 'react-native';

export const Container = styled.View`
    flex-direction: row;
    align-items: center;
    height: 46px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    padding: 0 15px;
`;

export const TInput = styled(TextInput).attrs({
    placeholderTextColor: 'rgba(255,255,255,0.3)',
})`
    flex: 1;
    font-size: 15px;
    margin-left: 10px;
    color: #fff;
`;
