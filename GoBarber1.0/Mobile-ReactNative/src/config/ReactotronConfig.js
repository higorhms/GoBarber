import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';

if (__DEV__) {
    const tron = Reactotron.configure({ host: '192.168.1.8' })
        .useReactNative()
        .use(reactotronSaga())
        .use(reactotronRedux())
        .connect();

    console.tron = tron;

    tron.clear();
}
