import React, { forwardRef } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import { Container, TInput } from './styles';

function Input({ style, icon, ...rest }, ref) {
    return (
        <Container style={style}>
            {icon && (
                <Icon name={icon} size={20} color="rgba(255, 255, 255, 0.6)" />
            )}
            <TInput {...rest} ref={ref} />
        </Container>
    );
}

Input.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    color: PropTypes.string,
    icon: PropTypes.string,
};

Input.defaultProps = {
    style: {},
    color: null,
    icon: null,
};

export default forwardRef(Input);
