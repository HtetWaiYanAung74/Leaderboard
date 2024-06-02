import React, { FC, useEffect, useState } from 'react';
import { Keyboard, ScrollView, StyleSheet, View } from 'react-native';
import { Button, PaperProvider, Searchbar } from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import { Provider as StoreProvider, useDispatch, useSelector } from 'react-redux';
import UserList from './UserList';
import AlertModal from './components/AlertModal';
import { setNoResultFound, setSearchedUser, setUsers } from './stores/actions';
import { AppState, store } from './stores/store';
import usersData from './utils/leaderboard.json';
import { UserInfoList } from './utils/type/type';

const userInfo: UserInfoList = usersData;

const App: FC = () => {

  const dispatch = useDispatch();
  const resultVisible = useSelector((state: AppState) => state.user.searchedUserList && state.user.searchedUserList.length > 0);
  const isNoResultFound = useSelector((state: AppState) => state.user.isNoResultFound);

  const [username, setUsername] = useState('');

  useEffect(() => {
    const usersArray = Object.keys(userInfo).map((userKey: string) => userInfo[userKey]);
    dispatch(setUsers(usersArray));
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, [dispatch]);

  const handleSearch = () => {
    if (!username.trim()) return;
    Keyboard.dismiss();
    dispatch(setSearchedUser(username));
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps='handled'>
      <View style={styles.flexRow}>
        <Searchbar
          value={username}
          placeholder='User name..'
          onChangeText={setUsername}
          style={styles.input}
        />
        <View style={{marginVertical: 8}}>
          <Button
            contentStyle={styles.searchBtn}
            mode='contained'
            onPress={handleSearch}
            style={{marginLeft: 8, borderRadius: 30}}
            testID='searchButton'>
            Search
          </Button>
        </View>
      </View>
      { resultVisible ? <UserList /> : <></> }
      <AlertModal
        visible={isNoResultFound}
        message='This user name does not exist! Please specify an existing user name!'
        onClose={() => dispatch(setNoResultFound(false))}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff5d1',
    justifyContent: 'center',
    padding: 16,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    width: '70%',
    backgroundColor: '#fbf2d2',
    marginVertical: 8,
    borderColor: '#744d45',
    borderWidth: 1,
  },
  searchBtn: {
    backgroundColor: '#744d45',
    height: 55,
    justifyContent: 'center',
  },
});

const RootApp: FC = () => (
  <StoreProvider store={store}>
    <PaperProvider>
      <App />
    </PaperProvider>
  </StoreProvider>
);

export default RootApp;