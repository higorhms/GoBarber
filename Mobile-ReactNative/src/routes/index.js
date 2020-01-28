import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';

import SelectProvider from '~/pages/New/SelectProvider';
import SelectDateTime from '~/pages/New/SelectDateTime';
import Confirm from '~/pages/New/Confirm';

export default (isSigned = false) =>
    createAppContainer(
        createSwitchNavigator(
            {
                Sign: createSwitchNavigator({
                    SignIn,
                    SignUp,
                }),
                App: createBottomTabNavigator(
                    {
                        Dashboard,
                        New: {
                            screen: createStackNavigator(
                                {
                                    SelectProvider,
                                    SelectDateTime,
                                    Confirm,
                                },
                                {
                                    defaultNavigationOptions: {
                                        headerTransparent: true,
                                        headerTintColor: '#FFF',
                                        headerLeftContainerStyle: {
                                            marginLeft: 20,
                                        },
                                    },
                                }
                            ),
                            navigationOptions: {
                                tabBarVisible: false,
                                tabBarLabel: 'Agendar',
                                tabBarIcon: (
                                    <Icon
                                        name="add-circle-outline"
                                        size={20}
                                        color="#rgba(255,255,255,0.6)"
                                    />
                                ),
                            },
                        },
                        Profile,
                    },
                    {
                        tabBarOptions: {
                            keyboardHidesTabBar: true,
                            activeTintColor: '#FFF',
                            inactiveTintColor: 'rgba(255,255,255,0.6)',
                            style: {
                                backgroundColor: '#100496',
                            },
                        },
                    }
                ),
            },
            {
                initialRouteName: isSigned ? 'App' : 'Sign',
            }
        )
    );
