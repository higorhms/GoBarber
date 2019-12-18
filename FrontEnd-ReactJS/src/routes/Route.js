import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Proptypes from 'prop-types';

export default function RouteWrapper({
    component: Component,
    isPrivate,
    ...rest
}) {
    const signed = false;

    if (!signed && isPrivate) {
        return <Redirect to="/" />;
    }

    if (signed && !isPrivate) {
        return <Redirect to="/dashboard" />;
    }

    return <Route {...rest} component={Component} />;
}

RouteWrapper.propTypes = {
    component: Proptypes.oneOf([Proptypes.element, Proptypes.func]).isRequired,
    isPrivate: Proptypes.bool,
};

RouteWrapper.defaultProps = {
    isPrivate: false,
};
