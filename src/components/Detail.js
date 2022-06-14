import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import React, {Component} from 'react';
import store from '../store/MainStore';
import Header from './Header';
import CharacterName from './CharacterName';
import {constWidth} from '../helper/consts';
import {isObservableProp} from 'mobx';
import {observer} from 'mobx-react';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {data: {}};
  }
  componentDidMount() {
    this.setState({data: store.selectEpisode});
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
  renderHeader = () => {
    const {data} = this.state;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          borderTopRightRadius: 5,
          borderTopLeftRadius: 5,
          paddingBottom: 10,
        }}>
        <View style={styles.button}>
          <Text style={styles.text}>{data.name}</Text>
        </View>
        <View style={styles.middle}>
          <Text style={styles.textFirst}>
            Episode:
            <Text style={styles.textSecond}>
              {store.selectEpisode.episode.slice(4, 6)}
            </Text>
          </Text>
          <Text style={styles.textFirst}>
            Season:
            <Text style={styles.textSecond}>
              {store.selectEpisode.episode.slice(1, 3)}
            </Text>
          </Text>
          <Text style={styles.textFirst}>
            <Text style={styles.textSecond}>
              {store.selectEpisode.air_date}
            </Text>
          </Text>
        </View>
      </View>
    );
  };
  render() {
    const {navigation} = this.props;
    const {selectEpisode} = store;
    return (
      <View style={styles.container}>
        <Header
          leftShow={true}
          left={this.renderLeft}
          actionLeft={this.goToBack}
          title={'EPISODE'}
        />
        <View style={{marginHorizontal: 10, paddingBottom: 75}}>
          <FlatList
            ListHeaderComponent={this.renderHeader}
            stickyHeaderIndices={[0]}
            showsVerticalScrollIndicator={false}
            data={selectEpisode.characters}
            renderItem={({item}) => (
              <CharacterName navigation={navigation} data={item} />
            )}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', backgroundColor: '#fff'},
  button: {
    width: constWidth - 20,
    backgroundColor: '#97ce4c',
    height: 80,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  text: {
    color: '#fff',
    fontSize: 28,
    fontFamily: 'Quicksand-Bold',
    textAlign: 'center',
  },
  middle: {
    alignItems: 'center',
    backgroundColor: '#e4a788',
    marginTop: 10,
    width: constWidth - 20,
    borderRadius: 5,
    paddingVertical: 10,
  },
  textFirst: {color: '#fff', fontSize: 20, fontFamily: 'Quicksand-Bold'},
  textSecond: {color: '#fff', fontSize: 20, fontFamily: 'Quicksand-Bold'},
});

export default observer(Detail);
