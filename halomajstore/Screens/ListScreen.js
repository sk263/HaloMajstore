import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Icon } from 'expo';
import { Actions } from 'react-native-router-flux';
import { setMajstor } from "../actions";
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ActivityIndicator, AsyncStorage, ScrollView } from 'react-native';

class ListScreen extends React.Component {
   state = {
       localMajstor: [],
   }

   componentWillMount() {
    let tmp = [];
    for (var i = 0; i < this.props.local.length; i++) {
        if (this.props.local[i][this.props.category]) 
            tmp.push(this.props.local[i]);
    }
    this.setState({ localMajstor: tmp }, function () {
        console.log(this.state.localMajstor);
    });
    console.log(tmp);
   }

   setMajstor(item) {
       this.props.setMajstor(item);
   }

   _renderItem = ({item}) => (
       <TouchableOpacity style={ { flexDirection: 'row' , justifyConten: 'space-between', alignItems: 'center', flex: 1, height: 120, bottomBorderWidth: 1, bottomBorderColor: '#ED2939' } } onPress = { () => this.setMajstor(item)}>
           <Image
            style={styles.imageStyle}
            source={{ uri: item.logo }}
          />
          
        <Text style={{ marginLeft: 48, fontSize: 21}}>{item.name}</Text>
       </TouchableOpacity>
  );

  _listEmptyComponent = () => {
    return (
    <View style={{flex: 1, alignItems: 'center', justifyContent:'center', marginTop: 30}}>
        <Text>Ne brini, pronaći ćemo majstora uskoro :)</Text>
    </View>
    );
}   

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
      <Text style={{ fontSize: 21, color: '#fff', marginTop: 48, fontWeight: 'bold' }}>{ this.props.category }</Text>
      </View>
        <View style={{ flex: 1 }}>
            {
                this.props.loading
                ?
                <View style={{ flex: 1, alignItems: 'center', justifyContent:'center' }} > 
                    <ActivityIndicator size={"large"} />
                </View>
                :
                <FlatList
                    data={this.state.localMajstor} 
                    keyExtractor={item => item.key}
                    renderItem={this._renderItem}
                    ListEmptyComponent={this._listEmptyComponent}
                    />
            }
          </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
    const { local, category } = state.majstor;
    const { loading } = state.majstori;
    return {local,category,loading};
  };
  
  export default connect(
    mapStateToProps,
    {
        setMajstor,
    }
  )(ListScreen);
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageStyle: {
    width: 90,
    height: 90,
  },
});
