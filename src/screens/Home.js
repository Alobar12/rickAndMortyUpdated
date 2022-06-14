import {View, FlatList, StyleSheet, ActivityIndicator} from 'react-native';
import React, {Component} from 'react';
import store from '../store/MainStore';
import List from '../components/List';
import Header from '../components/Header';
import {observer} from 'mobx-react';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
  }
  async componentDidMount() {
    await store.getEpisodes();
    this.setState({data: store.episodes});
  }

  render() {
    const {episodes, next} = store;
    return (
      <View style={styles.container}>
        <Header leftShow={false} />
        <FlatList
          data={episodes}
          numColumns={2}
          contentContainerStyle={{alignItems: 'center'}}
          style={styles.list}
          scrollEnabled={true}
          onEndReached={() => {
            store.getNextEpisodes();
          }}
          onEndReachedThreshold={0.5}
          renderItem={({item}) => (
            <List
              key={item.id}
              data={item}
              navigation={this.props.navigation}
            />
          )}
          ListFooterComponent={() => (next ? <ActivityIndicator /> : null)}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {marginTop: 10, flex: 1},
});

export default observer(Home);
