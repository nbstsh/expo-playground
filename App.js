import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './components/HomeScreen';
import ProfileScreen from './components/ProfileScreen';
import MapExample from './components/MapExample';
import TextOrDelete from './components/TextOrDelete';
import Compass from './components/Compass';
import Balloon from './components/Balloon';
import MultiMedia from './components/MultiMedia';
import PhoneEditor from './components/PhoneEditor';
import CustomCamera from './components/CustomCamera';

const MainNavigator = createStackNavigator(
	{
		Home: HomeScreen,
		Profile: ProfileScreen,
		Map: MapExample,
		TextOrDelete: TextOrDelete,
		Compass: Compass,
		Balloon: Balloon,
		MultiMedia: MultiMedia,
		PhoneEditor: PhoneEditor,
		CustomCamera: CustomCamera
	},
	{
		initialRouteName: 'CustomCamera'
	}
);

const App = createAppContainer(MainNavigator);

export default App;
