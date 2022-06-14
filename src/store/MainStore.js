import {makeAutoObservable} from 'mobx';
import axios from 'axios';
const URL = 'https://rickandmortyapi.com/api/episode';
class MainStore {
  episodes = [];
  selectEpisode = {};
  selectedCharacter = {};
  next = '';
  current = '';
  constructor() {
    makeAutoObservable(this);
  }

  getEpisodes = async () => {
    return new Promise(async (resolve, reject) => {
      await axios
        .get(`${URL}`)
        .then(res => {
          this.episodes = res.data.results;
          this.next = res.data.info.next;
          console.log('2', res.data);
        })
        .catch(e => console.log(e));
      resolve(true);
    });
  };
  getNextEpisodes = async () => {
    if (this.next === this.current || !this.next) return null;
    this.current = this.next;
    return new Promise(async (resolve, reject) => {
      await axios
        .get(`${this.next}`)
        .then(res => {
          this.episodes = [...this.episodes, ...res.data.results];
          this.next = res.data.info.next;
          console.log('2', res.data);
        })
        .catch(e => console.log(e));
      resolve(true);
    });
  };
  getEpisode = async id => {
    return new Promise(async (resolve, reject) => {
      await axios
        .get(`${URL}/${id}`)
        .then(res => {
          if (res.data) {
            this.selectEpisode = res.data;
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(e => {
          console.log(e);
          resolve(false);
        });
    });
  };
  getCharacter = async character => {
    return new Promise(async (resolve, reject) => {
      await axios
        .get(`${character}`)
        .then(res => {
          this.selectedCharacter = res.data;
        })
        .catch(e => console.log(e));
      resolve(true);
    });
  };
  getSelectedCharacter = async id => {
    return new Promise(async (resolve, reject) => {
      await axios
        .get(`https://rickandmortyapi.com/api/character/${id}`)
        .then(res => {
          console.log('resss => ', res);
          resolve(res.data);
        })
        .catch(e => console.log(e));
    });
  };
}

const store = new MainStore();

export default store;
