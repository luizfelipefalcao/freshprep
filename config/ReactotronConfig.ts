import AsyncStorage from "@react-native-async-storage/async-storage";
import Reactotron from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux";

if (__DEV__) {
  Reactotron.setAsyncStorageHandler(AsyncStorage).configure({ name: "Fresh Prep App" }).useReactNative().use(reactotronRedux()).connect();
}
export default Reactotron;
