/* @flow */
import {View, Image, Text, PanResponder, Animated} from 'react-native';
import React, {PureComponent} from 'react';
import ColorField from '../color-field/color-field';
import ApiHelper from '../api/api__helper';
import type {IssueOnList} from '../../flow/Issue';
import type {CustomFieldValue} from '../../flow/CustomFields';
import {getPriotityField, getAssigneeField} from '../issue-formatter/issue-formatter';
import styles from './agile-card.styles';

const ACTIVATE_TIMEOUT = 600;

type Props = {
  style?: any,
  issue: IssueOnList,
  onDragStart: () => any,
  onDragStop: () => any
};

type State = {
  position: Animated.ValueXY,
  isDragging: boolean
}

export default class AgileCard extends PureComponent<void, Props, State> {
  panResponder: Object;
  activateDragTimeOut: number;

  state = {
    position: new Animated.ValueXY(),
    isDragging: false
  };

  constructor() {
    super();

    this.panResponder = PanResponder.create({
      onPanResponderGrant: this.activateDragOnLongPress,
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: this.onPanResponderMove,
      onPanResponderTerminationRequest: () => false,
      onPanResponderRelease: this.onPanResponderRelease,
      onPanResponderTerminate: this.onPanResponderRelease
    });
  }

  activateDragOnLongPress = (e: Event, gestureState: Object) => {
    this.activateDragTimeOut = setTimeout(this.enterDragMode, ACTIVATE_TIMEOUT);
  };

  onPanResponderMove = (e: Event, gestureState: Object) => {
    clearTimeout(this.activateDragTimeOut);
    if (!this.state.isDragging) {
      return;
    }
    this.state.position.setValue({x: gestureState.dx, y: gestureState.dy});
  };

  onPanResponderRelease = (e: Event, gesture: Object) => {
    clearTimeout(this.activateDragTimeOut);
    this.exitDragMode();
  }

  enterDragMode = () => {
    this.setState({isDragging: true});
    this.props.onDragStart();
  };

  exitDragMode() {
    this.setState({isDragging: false});

    Animated.spring(this.state.position, {
      toValue: {x: 0, y: 0}
    }).start();

    this.props.onDragStop();
  }

  render() {
    const {issue, style} = this.props;
    const {isDragging} = this.state;
    const priorityField = getPriotityField(issue);

    const issueId = priorityField
      ? <View style={styles.colorFieldContainer}>
          <ColorField
            fullText
            style={styles.issueIdColorField}
            text={ApiHelper.getIssueId(issue)}
            color={priorityField.value.color}
          />
        </View>
      : <Text testID="card-simple-issue-id">
          {ApiHelper.getIssueId(issue)}
        </Text>;

    const assigneeField = getAssigneeField(issue);
    const assignees = []
      .concat(assigneeField ? assigneeField.value : null)
      .filter(item => item);

    return (
      <Animated.View
        style={[
          this.state.position.getLayout(),
          styles.card,
          isDragging && styles.draggingCard,
          style
        ]}
        {...this.panResponder.panHandlers}
      >
        {issueId}
        <Text numberOfLines={3} style={styles.summary} testID="card-summary">
          {issue.summary}
        </Text>
        <View style={styles.assignees}>
          {assignees.map((assignee: CustomFieldValue) => {
            return (
              <Image
                key={assignee.id}
                style={styles.avatar}
                source={{ uri: assignee.avatarUrl }}
                testID="card-avatar"
              />
            );
          })}
        </View>
      </Animated.View>
    );
  }
}
