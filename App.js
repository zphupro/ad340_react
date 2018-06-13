import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, Image, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

/*
<Text
  onPress= { () => navigate("Cameras") }>Click
</Text>
*/

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 20, color: 'black'}}>
          Seattle Cameras App
        </Text>
        <Button
          onPress= { () => navigate("Cameras") }
          title="See Cameras"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
          />
      </View>
    );
  }
}


class CameraScreen extends Component {

  static navigationOptions = {
    title: 'Cameras',
  };

  state = {
    data: []
  };

  // called whenever component is mounted and can fetch data here
  componentWillMount() {
    this.fetchData();
  }

  //
  fetchData = async () => {
    const response = await fetch('https://web6.seattle.gov/Travelers/api/Map/Data?zoomId=18&type=2');
    const json = await response.json();
    this.setState({ data: json.Features });
  };

  cameraType(camera) {
      if(camera.Type == 'sdot'){
            return  "http://www.seattle.gov/trafficcams/images/"+camera.ImageUrl;
      }else{
            return "http://images.wsdot.wa.gov/nw/"+camera.ImageUrl;
      }
  }

//source = {{ uri: 'http://www.seattle.gov/trafficcams/images/' + item.Cameras[0].ImageUrl }}

  render() {
    const { navigate } = this.props.navigation;
    return (

      <View style={styles.container}>

        <FlatList
          data={this.state.data}
          // x is the object and i is the index
          keyExtractor={(x, i) => i.toString()}
          renderItem={ ({item}) =>
            //url = cameraType(item.Cameras[0]);
            <View style={styles.textM}>
             <Image
                source = {{ uri: this.cameraType(item.Cameras[0]) }}
                style = {{height: 250, margin: 3}}
                />

              <Text style={{fontSize: 20, color: 'black'}}>
                {`${item.Cameras[0].Description}`}
              </Text>
            </View>

          }
         />
      </View>

    );
  }

}



const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textM: {
    marginBottom: 30
  },
});

export default class App extends Component {
  render () {
    return <NavigationApp />;
  }
}

const NavigationApp = StackNavigator({
    Home: { screen: HomeScreen },
    Cameras: { screen: CameraScreen },
});
