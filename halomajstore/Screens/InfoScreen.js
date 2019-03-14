import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Icon } from 'expo';
import { Actions } from 'react-native-router-flux';
import Communications from 'react-native-communications';
import { StyleSheet, Text, View, Image, TouchableOpacity, AsyncStorage, ScrollView } from 'react-native';

class InfoScreen extends React.Component {

  render() {
      console.log(this.props);
    return (
      <View style={styles.container}>
      <TouchableOpacity
            style={{ position: "absolute", zIndex: 1, marginLeft: 16, top: 45 }}
            onPress={() => Actions.pop()}
          >
            <Icon.Ionicons
              name="md-arrow-back"
              size={24}
              style={{ zIndex: 1, marginTop: 3 }}
              color="#fff"
            />
      </TouchableOpacity>
      <View style={{ backgroundColor: '#ED2939', width: '100%', height: 120, alignItems: 'center', justifyConten:'center' }}>
      <Image
            style={styles.imageStyle}
            source={{ uri: this.props.majstor.logo }}
          />
      </View>
      <ScrollView>
        <View  style={{ padding: 24 }}>
        <Text style={{ fontSize: 21, borderBottomWidth: 1, fontWeight: 'bold' }}>{this.props.majstor.name}</Text>

            <Text style={{ fontSize: 18, marginTop: 24, color: '#ED2939' }}>Opis</Text>
            <Text style={{ marginTop: 15 }}>{this.props.majstor.desctription}</Text>
            <TouchableOpacity style={ { flexDirection: 'row', backgroundColor: '#ED2939', alignItems: "center", justifyContent: "space-between",  paddingHorizontal: 12,paddingVertical: 12, marginTop: 24 } } onPress={()=>Communications.phonecall(this.props.majstor.phone.toString(), true)} >
            <Text style={ { color: '#fff' } }>HALO MAJSTORE 
            </Text> 
            <Icon.Ionicons
              name={"ios-call"}
              size={24}
              color='#fff'
            />
            </TouchableOpacity>
            <TouchableOpacity style={ { flexDirection: 'row', backgroundColor: '#ED2939', alignItems: "center", justifyContent: "space-between",  paddingHorizontal: 12,paddingVertical: 12, marginTop: 24 } } onPress={()=>Communications.text(this.props.majstor.phone.toString())} >
            <Text style={ { color: '#fff' } }>POŠALJI PORUKU 
            </Text> 
            <Icon.Ionicons
              name={"md-text"}
              size={24}
              color='#fff'
            />
            </TouchableOpacity>
            <TouchableOpacity style={ { flexDirection: 'row', backgroundColor: '#ED2939', alignItems: "center", justifyContent: "space-between",  paddingHorizontal: 12,paddingVertical: 12, marginTop: 24 } } onPress={()=>Communications.email([this.props.majstor.email],null,null,null,'Pozdrav ' + this.props.majstor.name + ', ')} >
            <Text style={ { color: '#fff' } }>POŠALJI PONUDU 
            </Text> 
            <Icon.Ionicons
              name={"ios-mail"}
              size={24}
              color='#fff'
            />
            </TouchableOpacity>
          </View>
      </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
    const { majstor } = state.majstor;
    return {majstor};
  };
  
  export default connect(
    mapStateToProps,
    null,
  )(InfoScreen);
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageStyle: {
    width: 90,
    height: 90,
    marginTop: 30,
  },
});
