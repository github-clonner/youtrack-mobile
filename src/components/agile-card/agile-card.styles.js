import {StyleSheet} from 'react-native';
import {UNIT, COLOR_FONT} from '../variables/variables';

export default StyleSheet.create({
  card: {
    flexDirection: 'column',
    padding: UNIT,
    height: 131
  },
  draggingCard: {
    backgroundColor: '#FFF',

    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: UNIT,

    transform: [
      {rotate: '-7deg'}
    ],
    zIndex: 9999
  },
  summary: {
    color: COLOR_FONT,
    fontSize: 13,
    paddingTop: UNIT/2,
    paddingBottom: UNIT/2
  },
  colorFieldContainer: {
    flexDirection: 'row'
  },
  issueIdColorField: {
    paddingLeft: UNIT/2,
    paddingRight: UNIT/2,
    width: null, //Removes fixed width of usual color field
  },
  assignees: {
    flexDirection: 'row',
    height: 40
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20
  }
});
