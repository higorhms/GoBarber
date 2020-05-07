// import storage from 'redux-persist/lib/storage'; (V5)
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage'; // V6

export default reducers => {
    const persistedReducer = persistReducer(
        {
            key: 'gobarber',
            // storage, V5
            storage: AsyncStorage, // V6
            whitelist: ['auth', 'user'],
        },
        reducers
    );
    return persistedReducer;
};
