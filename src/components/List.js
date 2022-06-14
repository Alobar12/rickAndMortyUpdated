import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';
import store from '../store/MainStore';
import {constHeight, constWidth} from '../helper/consts';

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {id: null};
  }
  goToDetail = async () => {
    await store.getEpisode(this.props.data.id);
    this.props.navigation.navigate('DetailScreen');
  };
  render() {
    const {data} = this.props;
    return (
      <TouchableOpacity onPress={this.goToDetail} style={styles.button}>
        <View>
          <Image
            style={styles.image}
            source={{
              uri: 'https://www.justwatch.com/images/backdrop/8580211/s640/sezon-1',
            }}
          />
        </View>
        <Text style={styles.text}>Season: {data.episode.slice(2, 3)}</Text>
        <Text style={styles.text}>Episode: {data.episode.slice(4, 6)}</Text>
        <Text style={[styles.text, {marginBottom: 10}]}>{data.air_date}</Text>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#F8A39C',
    marginBottom: 15,
    alignItems: 'center',
    width: (constWidth - 50) / 2,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  image: {
    width: (constWidth - 50) / 2,
    height: constHeight / 6,
    borderRadius: 5,
  },
  text: {
    marginTop: 10,
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Quicksand-Bold',
  },
});
