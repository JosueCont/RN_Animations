import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CircularCarousel from './src/Screens/CircularCarousel';
import Dropdown from './src/Screens/Dropdown';


export default function App() {

  const data = [
    require('./assets/images/00.jpg'),
    require('./assets/images/01.jpg'),
    require('./assets/images/02.jpg'),
    require('./assets/images/03.jpg'),
    require('./assets/images/04.jpg'),
    require('./assets/images/05.jpg'),
    require('./assets/images/06.jpg'),
    require('./assets/images/07.jpg'),
    require('./assets/images/08.jpg'),
  ];

  const options = [
    { label: 'Charts', iconName: 'barschart' },
    { label: 'Book', iconName: 'book' },
    { label: 'Calendar', iconName: 'calendar' },
    { label: 'Camera', iconName: 'camera' },
  ];
  
  const header = {
    label: 'Header',
    iconName: 'ellipsis1',
  };
  return (
    <View style={styles.container}>
      {/*<CircularCarousel  data={data}/> */}
      <Dropdown options={options} header={header}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
