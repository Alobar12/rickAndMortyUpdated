import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {Component} from 'react';
import store from '../store/MainStore';
import {constHeight, constWidth} from '../helper/consts';
import Header from './Header';
import {observer} from 'mobx-react';

class CharacterDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {data: store.selectedCharacter};
  }
  goToBack = () => {
    this.props.navigation.goBack();
  };
  renderLeft = () => {
    return (
      <TouchableOpacity onPress={this.goToBack}>
        <Image source={require('../assets/backVector.png')} />
      </TouchableOpacity>
    );
  };
  goToDetail = async id => {
    console.log('id=>', id);
    await store.getEpisode(id);
    console.log('hey');
    this.props.navigation.navigate('DetailScreen');
  };
  renderHeader = () => {
    const {data} = this.state;
    return (
      <View style={styles.container}>
        <Header
          leftShow={true}
          left={this.renderLeft}
          actionLeft={this.goToBack}
        />
        <View style={styles.all}>
          <Image
            resizeMode="cover"
            style={{width: constWidth, height: constHeight / 2}}
            source={{uri: data.image}}
          />

          <View style={styles.border}>
            <Text style={styles.text}>
              <Text style={styles.first}>{data.name}</Text>
            </Text>
          </View>
          <View style={styles.buttons}>
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <View style={styles.border_2}>
                <Text style={styles.text}>
                  <Text style={styles.first}>Status: </Text>
                  {data.status}
                </Text>
              </View>
              <View style={styles.border_2}>
                <Text style={styles.text}>
                  <Text style={styles.first}>Species: </Text>
                  {data.species}
                </Text>
              </View>
            </View>
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <View style={styles.border_2}>
                <Text style={styles.text}>
                  <Text style={styles.first}>Gender: </Text>
                  {data.gender}
                </Text>
              </View>
              <View style={styles.border_2}>
                <Text style={styles.text}>
                  <Text style={styles.first}>Origin: </Text>
                  {data.origin.name}
                </Text>
              </View>
            </View>
            <View>
              <View style={styles.episodeButton}>
                <Text style={styles.text}>
                  <Text style={styles.second}>Episodes</Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };
  render() {
    const {selectedCharacter} = store;
    return (
      <View style={styles.listContainer}>
        <FlatList
          data={selectedCharacter.episode}
          ListHeaderComponent={this.renderHeader}
          numColumns={2}
          renderItem={({item}) => (
            <View
              style={{
                marginLeft: 5,
              }}>
              <View style={styles.containerEpisode}>
                <Image
                  resizeMode="cover"
                  style={styles.touchable}
                  source={{
                    uri: 'https://www.justwatch.com/images/backdrop/8580211/s640/sezon-1',
                  }}
                />
                <Text style={styles.episode}>Episode {item.slice(40, 42)}</Text>
              </View>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1},
  text: {
    fontSize: 20,
    fontFamily: 'Quicksand-Regular',
    color: '#11998e',
    marginVertical: 10,
    textAlign: 'center',
  },
  border: {
    width: constWidth - 20,
    alignSelf: 'center',
    backgroundColor: 'rgba(109, 213, 250,.45)',
    borderRadius: 10,
    marginTop: 10,
  },
  border_2: {
    width: (constWidth - 40) / 2,
    backgroundColor: 'rgba(109, 213, 250,.45)',
    borderRadius: 10,
    height: 100,
    justifyContent: 'center',
    marginTop: 10,
  },
  first: {fontFamily: 'Ouicksand-Bold', fontSize: 20, color: '#000'},
  second: {fontFamily: 'Ouicksand-Bold', fontSize: 20, color: '#fff'},
  episode: {color: '#fff', fontFamily: 'Quicksand-Regular'},
  episodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    height: 200,
  },
  episodeButton: {
    borderRadius: 10,
    backgroundColor: '#0575E6',
    width: constWidth - 20,
    marginTop: 10,
  },
  buttons: {marginHorizontal: 10},
  all: {
    alignItems: 'center',
  },
  containerEpisode: {
    width: (constWidth - 40) / 2,
    height: 150,
    borderRadius: 5,
    backgroundColor: '#e4a788',
    marginTop: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchable: {
    width: (constWidth - 40) / 2,
    height: 130,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
});
export default observer(CharacterDetail);
