import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {Component} from 'react';
import store from '../store/MainStore';
import {constWidth} from '../helper/consts';

export default class CharacterName extends Component {
  constructor(props) {
    super(props);
    this.state = {name: null};
  }
  async componentDidMount() {
    const name = await store.getSelectedCharacter(
      this.props.data.slice(42, 45),
    );
    console.log('name => ', name);
    setTimeout(() => {
      this.setState({name: name});
    }, 1000);
  }

  goToCharacterDetail = async item => {
    await store.getCharacter(item);
    this.props.navigation.navigate('CharacterScreen');
  };

  renderLoading = () => {
    return (
      <View style={styles.button}>
        <ActivityIndicator />
      </View>
    );
  };

  render() {
    const {data} = this.props;
    const {name} = this.state;
    if (!name) return this.renderLoading();
    return (
      <View>
        <TouchableOpacity onPress={() => this.goToCharacterDetail(data)}>
          <View style={styles.button}>
            <Image
              source={{uri: name.image}}
              style={{width: 100, height: 100}}
              resizeMode={'contain'}
            />
            <Text style={styles.title}>{name.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: constWidth - 20,
    borderRadius: 10,
    paddingVertical: 10,
    backgroundColor: '#F0CB35',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  title: {fontFamily: 'Quicksand-Bold', fontSize: 20, textAlign: 'center'},
});
