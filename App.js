import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './components/HomeScreen';
import ProfileScreen from './components/ProfileScreen';
import MapExample from './components/MapExample';
import TextOrDelete from './components/TextOrDelete';

const MainNavigator = createStackNavigator(
	{
		Home: HomeScreen,
		Profile: ProfileScreen,
		Map: MapExample,
		TextOrDelete: TextOrDelete
	},
	{
		initialRouteName: 'TextOrDelete'
	}
);

const App = createAppContainer(MainNavigator);

export default App;
