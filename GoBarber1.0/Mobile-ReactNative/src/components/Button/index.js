import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import { RButton, Text } from './styles';

function Button({ children, loading, ...rest }) {
    return (
        <RButton {...rest}>
            {loading ? (
                <ActivityIndicator size="small" color="#FFF" />
            ) : (
                <Text>{children}</Text>
            )}
        </RButton>
    );
}

Button.propTypes = {
    children: PropTypes.string.isRequired,
    loading: PropTypes.bool,
};

Button.defaultProps = {
    loading: false,
};

export default Button;
