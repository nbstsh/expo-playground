import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './components/HomeScreen';
import ProfileScreen from './components/ProfileScreen';
import MapExample from './components/MapExample';
import TextOrDelete from './components/TextOrDelete';
import Compass from './components/Compass';
import Balloon from './components/Balloon';

const MainNavigator = createStackNavigator(
	{
		Home: HomeScreen,
		Profile: ProfileScreen,
		Map: MapExample,
		TextOrDelete: TextOrDelete,
		Compass: Compass,
		Balloon: Balloon
	},
	{
		initialRouteName: 'Balloon'
	}
);

const App = createAppContainer(MainNavigator);

export default App;
