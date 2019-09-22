import { createAppContainer } from "react-navigation"
import { createStackNavigator } from 'react-navigation-stack';
import MainScreen from "./MainScreen";
import SecondScreen from "./SecondScreen";

const stackNavigation = createStackNavigator({
    Main: MainScreen,
    Second: SecondScreen
})

export default  appContainer = createAppContainer(stackNavigation);
