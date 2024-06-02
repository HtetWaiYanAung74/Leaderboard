import React, { FC, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { DataTable, Icon } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { sortByLowestRankedUser, sortByName } from './stores/actions';
import { AppState } from './stores/store';

const UserList: FC = () => {

  const dispatch = useDispatch();
  const userData = useSelector((state: AppState) => state.user.searchedUserList);
  const nearestUser = useSelector((state: AppState) => state.user.mostPossibleSearchRes);
  
  const [isSortByLowest, setIsSortByLowest] = useState(false);
  const [isSortByName, setIsSortByName] = useState(false);

  const handleSortByName = () => {
    setIsSortByLowest(false);
    setIsSortByName(true);
    dispatch(sortByName());
  }

  const handleSortByRank = () => {
    setIsSortByLowest(true);
    setIsSortByName(false);
    dispatch(sortByLowestRankedUser());
  }

  return (
    <DataTable>
      <DataTable.Header style={styles.tableHeader}>
        <DataTable.Title
          style={{flex: 2, alignItems: 'center'}}>
          <TouchableOpacity
            onPress={handleSortByName}
            style={styles.flexRow}>
            <Text style={isSortByName ? styles.highlight : styles.textStyle}>
              Name
            </Text>
            <Icon
              source={'alpha-a-circle'}
              color={isSortByName ? '#0085ff' : 'black'}
              size={24}
            />
          </TouchableOpacity>
        </DataTable.Title>
        <DataTable.Title
          style={{alignItems: 'center'}}>
          <TouchableOpacity
            onPress={handleSortByRank}
            style={styles.flexRow}>
            <Text style={isSortByLowest ? styles.highlight : styles.textStyle}>
              Rank
            </Text>
            <Icon
              source={'rhombus-medium'}
              color={isSortByLowest ? '#0085ff' : 'black'}
              size={30}
            />
          </TouchableOpacity>
        </DataTable.Title>
        <DataTable.Title
          numberOfLines={2}
          style={{justifyContent: 'center'}}
          textStyle={styles.textStyle}>
          Number of bananas
        </DataTable.Title>
      </DataTable.Header>

      {userData?.map((user, index) => (
        <DataTable.Row
          key={index}
          style={[
            styles.tableRow,
            {
              borderBottomStartRadius: index == 9 ? 20 : 0,
              borderBottomEndRadius: index == 9 ? 20 : 0
            }
          ]}>
          <DataTable.Cell
            textStyle={nearestUser?.item.uid == user.item.uid ? styles.highlight : styles.textStyle}
            style={{flex: 2}}>
            {user.item.name}
          </DataTable.Cell>
          <DataTable.Cell
            style={{justifyContent: 'center'}}
            textStyle={styles.textStyle}>
            {user.item.rank}
          </DataTable.Cell>
          <DataTable.Cell
            style={{justifyContent: 'center'}}
            textStyle={styles.textStyle}>
            {user.item.bananas}
          </DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  );
};

const styles = StyleSheet.create({
  tableHeader: {
    backgroundColor: '#fdd14c',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  tableRow: {
    backgroundColor: '#fff',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle: {
    color: 'black',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  highlight: {
    color: '#0085ff',
  },
});

export default UserList;