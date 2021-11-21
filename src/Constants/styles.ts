import {StyleSheet} from 'react-native';
import {calcSize} from '../Utils';

export const newsStyles = StyleSheet.create({
  container: {
    marginBottom: calcSize(30),
    paddingHorizontal: calcSize(20),
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    paddingHorizontal: calcSize(20),
    backgroundColor: 'transparent',
    paddingBottom: calcSize(10),
  },
  category: {
    fontSize: calcSize(22),
    fontFamily: 'Rubik-Bold',
  },
  viewAll: {
    fontSize: calcSize(15),
    fontFamily: 'Rubik-Medium',
    color: 'orange',
  },
});

export const categoryNews = StyleSheet.create({
  container: {
    marginTop: calcSize(30),
  },
  itemStyle: {
    width: '100%',
    marginBottom: calcSize(30),
  },
  footer: {
    height: calcSize(30),
  },
});

export const load = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
