import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, Image, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

class Camerachannel extends Component {
  static navigationOptions = {
    title: 'This is live Cameras',
  };state = {
    data: []
  };componentWillMount() {
    this.fetchData();
  }

// get image from json
  fetchData = async () => {
    const response = await fetch('https://web6.seattle.gov/Travelers/api/Map/Data?zoomId=18&type=2');
    const json = await response.json();
    this.setState({ data: json.Features });
  };

//process image return 
  cameraType(camera) {
      if(camera.Type == 'sdot'){
            return  "http://www.seattle.gov/trafficcams/images/"+camera.ImageUrl;
      }else{
            return "http://images.wsdot.wa.gov/nw/"+camera.ImageUrl;
      }
  }
 
  //proess image and style for layout of camera live 
 render() {
    const { navigate } = this.props.navigation;
    return (
<View style={styles.container}>
  <FlatList
    data={this.state.data}
    keyExtractor={(x, i) => i.toString()}
    renderItem={ ({item}) =>
    <View style={styles.textM}>
    <Text style={{fontSize: 20, color: 'blue'}}>
  {`${item.Cameras[0].Description}`}
      </Text>
      <Image
            source = {{ uri: this.cameraType(item.Cameras[0]) }}
            style = {{height: 250, margin: 3}}
                />

          </View>

          }
         />
      </View>

    );
  }

}
 // this is Homepage for camera
 class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Homepage',
     };
  render() {
  const { navigate } = this.props.navigation;
  return (
  <View style={styles.container}>
  <Text style={{fontSize: 24, color: 'black'}}>Welcome to Seattle live Camera </Text>
  <Button
    onPress= { () => navigate("Cameras") }
    title="Live Seattle Camera"
    color="#000000"
          
          />
      
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {marginTop: 0,flex: 1,justifyContent: 'center',alignItems: 'center',
backgroundColor: '#FFEFD5',
  },
  textM: {
    marginBottom: 30
  },
});export default class App extends Component {
  render () {
    return <NavigationApp />;
  }
}const NavigationApp = StackNavigator({
    Home: { screen: HomeScreen },
    Cameras: { screen: Camerachannel },
});
