import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Proptypes from 'prop-types';
import AuthLayout from '~/pages/_layouts/auth';
import DefaultLayout from '~/pages/_layouts/default';

export default function RouteWrapper({
    component: Component,
    isPrivate,
    ...rest
}) {
    const signed = true;

    if (!signed && isPrivate) {
        return <Redirect to="/" />;
    }

    if (signed && !isPrivate) {
        return <Redirect to="/dashboard" />;
    }

    const Layout = signed ? AuthLayout : DefaultLayout;

    return (
        <Route
            {...rest}
            render={props => (
                <Layout>
                    <Component {...props} />
                </Layout>
            )}
        />
    );
}

RouteWrapper.propTypes = {
    component: Proptypes.oneOf([Proptypes.element, Proptypes.func]).isRequired,
    isPrivate: Proptypes.bool,
};

RouteWrapper.defaultProps = {
    isPrivate: false,
};
