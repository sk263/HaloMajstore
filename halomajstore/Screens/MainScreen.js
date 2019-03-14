import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import geolib from "geolib";
import { checkIfLocationSaved, setLocation, getMajstors, setLocalMajstor, updateLocal } from "../actions";
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage, ScrollView, Image } from 'react-native';
import {
    Location,
    Permissions,
  } from "expo";

class MainScreen extends React.Component {
   state = {
       category: null,
       localMajstor: [],
   }

    componentWillReceiveProps(nextProps) {
        if(nextProps.majstori.majstori != this.props.majstori && nextProps.majstori.majstori || nextProps.location) {
            let tmp = [];
            let localLocation = JSON.parse(nextProps.location);
            let temp =  _.map(nextProps.majstori.majstori, (val, key) => {
                return { ...val, key };
            });
            for (var i = 0; i < temp.length; i++) {
                if (geolib.isPointInCircle(
                    {latitude: parseInt(localLocation.latitude), longitude: parseInt(localLocation.longitude)},
                    {latitude: parseInt(temp[i]['location'].latitude),
                        longitude: parseInt(temp[i]['location'].longitude)},
                        parseInt(temp[i]['location'].distance))) 
                    tmp.push(temp[i]);
            }
            this.setState({ localMajstor: tmp });
            console.log(this.state);
        }
    }
    

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);       
        if (status !== 'granted') {
            this.props.setLocation("DENIED");
        }
        let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true })

        await AsyncStorage.setItem("LOCATION", JSON.stringify(location.coords) )
            .then( ()=>{
                this.props.setLocation(location);
            } )
            .catch( (error) => {
                console.log(error);
            } );
        
      };

      pickCategory(category) {
          this.props.updateLocal(category, this.state.localMajstor);
      }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: '#ED2939', width: '100%', height: 120, alignItems: 'center', justifyConten:'center' }}>
            <Text style={{ fontSize: 21, color: '#fff', marginTop: 48, fontWeight: 'bold' }}>HALO MAJSTORE</Text>
            <Text style={{ fontSize: 15, color: '#fff', marginTop: 12, fontWeight: 'bold' }}>Odaberite kategoriju</Text>
        </View>

        <ScrollView>
        <View style={{ paddingHorizontal: 21, flex: 1, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", alignItems: "flex-start" }}>
        <TouchableOpacity 
            onPress={()=>{this.setState({ category: 'ADAPTACIJA' })}} 
            style={{ zIndex: 1, marginTop: 21, width: 90, backgroundColor: "#80ED2939", flexDirection: 'column', justifyContent:'center' }}>
            <Image
            style={{ maxWidth: 90, maxHeight: 90, zIndex: -5 }}
            resizeMode="cover"
            source={require("../assets/adaptacija.jpg")}
          />
          <Text style={{ textAlign: 'center', color: '#ED2939' }}>Adaptacija doma</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={()=>{this.setState({ category: 'INSTALACIJE' })}} 
            style={{ zIndex: 1, marginTop: 21, width: 90, backgroundColor: "#80ED2939", flexDirection: 'column', justifyContent:'center' }}>
            <Image
            style={{ maxWidth: 90, maxHeight: 90, zIndex: -5 }}
            resizeMode="cover"
            source={require("../assets/instalacije.jpg")}
          />
          <Text style={{ textAlign: 'center', color: '#ED2939' }}>
          Instalacije
          </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={()=>{this.pickCategory('GRAĐEVINA')}} 
            style={{ zIndex: 1, marginTop: 21, width: 90, backgroundColor: "#80ED2939", flexDirection: 'column', justifyContent:'center' }}>
            <Image
            style={{ maxWidth: 90, maxHeight: 90, zIndex: -5 }}
            resizeMode="cover"
            source={require("../assets/gradevina.jpg")}
          />
          <Text style={{ textAlign: 'center', color: '#ED2939' }}>
          Građevina
          </Text>
          </TouchableOpacity>

          {
            this.state.category === 'ADAPTACIJA'
            ?
            <View style = { { width: '100%', flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", alignItems: "flex-start" } }>
            
            <TouchableOpacity 
                onPress={()=>{this.pickCategory('RENOVIRANJE')}} 
                style={{ zIndex: 1, marginTop: 21, width: 90, backgroundColor: "#ED2939", flexDirection: 'column', justifyContent:'center' }}>
            <Image
            style={{ maxWidth: 90, maxHeight: 90, zIndex: -5 }}
            resizeMode="cover"
            source={require("../assets/renoviranje.jpg")}
          />
          <Text style={{ textAlign: 'center', color: '#fff' }}>
          Renoviranje
          </Text>
          </TouchableOpacity>
            
          <TouchableOpacity 
                onPress={()=>{this.pickCategory('KNAUF')}} 
                style={{ zIndex: 1, marginTop: 21, width: 90, backgroundColor: "#ED2939", flexDirection: 'column', justifyContent:'center' }}>
            <Image
            style={{ maxWidth: 90, maxHeight: 90, zIndex: -5 }}
            resizeMode="cover"
            source={require("../assets/knauf.jpg")}
          />
            <Text style={{ textAlign: 'center', color: '#fff' }}>
            Knauf
            </Text>
          </TouchableOpacity>

            </View>
            :
            null
        }


        {
            this.state.category === 'INSTALACIJE'
            ?
            <View style = { { width: '100%', flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", alignItems: "flex-start" } }>
            
            <TouchableOpacity 
                onPress={()=>{this.pickCategory('ELEKTROINSTALACIJE')}} 
                style={{ zIndex: 1, marginTop: 21, width: 90, backgroundColor: "#ED2939", flexDirection: 'column', justifyContent:'center' }}>
            <Image
            style={{ maxWidth: 90, maxHeight: 90, zIndex: -5 }}
            resizeMode="cover"
            source={require("../assets/elektro.jpg")}
          />
          <Text style={{ textAlign: 'center', color: '#fff' }}>
          Elektroinstalacije
          </Text>
          </TouchableOpacity>
            
          <TouchableOpacity 
                onPress={()=>{this.pickCategory('PLIN')}} 
                style={{ zIndex: 1, marginTop: 21, width: 90, backgroundColor: "#ED2939", flexDirection: 'column', justifyContent:'center' }}>
            <Image
            style={{ maxWidth: 90, maxHeight: 90, zIndex: -5 }}
            resizeMode="cover"
            source={require("../assets/plin.jpg")}
          />
            <Text style={{ textAlign: 'center', color: '#fff' }}>
            Plin
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
                onPress={()=>{this.pickCategory('VODOINSTALACIJE')}} 
                style={{ zIndex: 1, marginTop: 21, width: 90, backgroundColor: "#ED2939", flexDirection: 'column', justifyContent:'center' }}>
            <Image
            style={{ maxWidth: 90, maxHeight: 90, zIndex: -5 }}
            resizeMode="cover"
            source={require("../assets/vodo.jpg")}
          />
            <Text style={{ textAlign: 'center', color: '#fff' }}>
            Vodoinstalacije
            </Text>
          </TouchableOpacity>
            
          <TouchableOpacity 
                onPress={()=>{this.pickCategory('KLIME')}} 
                style={{ zIndex: 1, marginTop: 21, width: 90, backgroundColor: "#ED2939", flexDirection: 'column', justifyContent:'center' }}>
            <Image
            style={{ maxWidth: 90, maxHeight: 90, zIndex: -5 }}
            resizeMode="cover"
            source={require("../assets/klime.jpg")}
          />
            <Text style={{ textAlign: 'center', color: '#fff' }}>
            Klime
            </Text>
          </TouchableOpacity>

            </View>
            :
            null
        }
       


       <TouchableOpacity 
            onPress={()=>{this.pickCategory('KROV')}} 
            style={{ zIndex: 1, marginTop: 21, width: 90, backgroundColor: "#80ED2939", flexDirection: 'column', justifyContent:'center' }}>
            <Image
            style={{ maxWidth: 90, maxHeight: 90, zIndex: -5 }}
            resizeMode="cover"
            source={require("../assets/krov.jpg")}
          />
          <Text style={{ textAlign: 'center', color: '#ED2939' }}>
          Krov
          </Text>
          </TouchableOpacity>

        
          <TouchableOpacity 
            onPress={()=>{this.pickCategory('PODOVI')}} 
            style={{ zIndex: 1, marginTop: 21, width: 90, backgroundColor: "#80ED2939", flexDirection: 'column', justifyContent:'center' }}>
            <Image
            style={{ maxWidth: 90, maxHeight: 90, zIndex: -5 }}
            resizeMode="cover"
            source={require("../assets/potovi.jpg")}
          />
          <Text style={{ textAlign: 'center', color: '#ED2939' }}>
          Podovi
          </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={()=>{this.pickCategory('PROZORI')}} 
            style={{ zIndex: 1, marginTop: 21, width: 90, backgroundColor: "#80ED2939", flexDirection: 'column', justifyContent:'center' }}>
            <Image
            style={{ maxWidth: 90, maxHeight: 90, zIndex: -5 }}
            resizeMode="cover"
            source={require("../assets/prozori.jpg")}
          />
          <Text style={{ textAlign: 'center', color: '#ED2939' }}>
          Prozori
          </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={()=>{this.pickCategory('FASADE')}} 
            style={{ zIndex: 1, marginTop: 21, width: 90, backgroundColor: "#80ED2939", flexDirection: 'column', justifyContent:'center' }}>
            <Image
            style={{ maxWidth: 90, maxHeight: 90, zIndex: -5 }}
            resizeMode="cover"
            source={require("../assets/fasade.jpg")}
          />
          <Text style={{ textAlign: 'center', color: '#ED2939' }}>
          Fasade
          </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={()=>{this.pickCategory('ALARMNI SISTEMI')}} 
            style={{ zIndex: 1, marginTop: 21, width: 90, backgroundColor: "#80ED2939", flexDirection: 'column', justifyContent:'center' }}>
            <Image
            style={{ maxWidth: 90, maxHeight: 90, zIndex: -5 }}
            resizeMode="cover"
            source={require("../assets/alarmi.jpg")}
          />
          <Text style={{ textAlign: 'center', color: '#ED2939' }}>
            Alarmni sistemi
          </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={()=>{this.pickCategory('PAMETNE KUĆE')}} 
            style={{ zIndex: 1, marginTop: 21, width: 90, backgroundColor: "#80ED2939", flexDirection: 'column', justifyContent:'center' }}>
            <Image
            style={{ maxWidth: 90, maxHeight: 90, zIndex: -5 }}
            resizeMode="cover"
            source={require("../assets/smart.jpg")}
          />
          <Text style={{ textAlign: 'center', color: '#ED2939' }}>
            Pametne kuće
          </Text>
          </TouchableOpacity>
        </View>
        </ScrollView>

        {
            !this.props.location
            ?
            <View style={styles.introContainer}>
                <Text>LOCATION</Text>
                <TouchableOpacity onPress = { () => this._getLocationAsync() } style={styles.continueButton}>
                    <Text>GET LOCATION</Text>
                </TouchableOpacity>
            </View>
            :
            null
        }
      </View>
    );
  }
}

const mapStateToProps = state => {
    const { location } = state.location;
    const majstori = state.majstori;
    return {location,majstori};
  };
  
  export default connect(
    mapStateToProps,
    {
        checkIfLocationSaved,
        setLocation,
        getMajstors,
        setLocalMajstor,
        updateLocal
    }
  )(MainScreen);
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  introContainer: {
    position: "absolute",
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  continueButton: {
      backgroundColor: '#800000',
      marginTop: 21,
  }
});
