import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {constWidth} from '../helper/consts';
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {left: this.props.leftShow};
  }
  render() {
    const {title} = this.props;
    const {left} = this.props;
    return (
      <View style={[styles.container, {backgroundColor: this.props.color}]}>
        <View>{this.state.left && left(this.props.actionLeft)}</View>
        <Image
          resizeMode="contain"
          style={{width: 150, height: 60}}
          source={{
            uri: 'https://occ-0-1722-1723.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABbZPI3GuHkwXQ6gf1rUob3iLTDBx10_6E6_L6qZCVcn6QhivB-P8dqn-wWWErynEpeyCrfnJY_GZTXAdbv2L9Sl1PcLGH8vc7S7XpYJzcc3J.png?r=871',
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    elevation: 5,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: constWidth,
    marginBottom: 5,
  },
  logo: {
    marginRight: 90,
    marginLeft: 100,
    width: 150,
  },
  text: {
    fontSize: 20,
    fontFamily: 'Quicksand-Bold',
    textAlign: 'center',
    color: '#000',
  },
});
