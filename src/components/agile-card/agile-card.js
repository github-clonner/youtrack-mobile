/* @flow */
import {View, Image, Text, Animated} from 'react-native';
import React, {PureComponent} from 'react';
import ColorField from '../color-field/color-field';
import ApiHelper from '../api/api__helper';
import type {IssueOnList} from '../../flow/Issue';
import type {CustomFieldValue} from '../../flow/CustomFields';
import {getPriotityField, getAssigneeField} from '../issue-formatter/issue-formatter';
import styles from './agile-card.styles';

type Props = {
  style?: any,
  issue: IssueOnList,
  isDragging: boolean
};

export default class AgileCard extends PureComponent<void, Props, void> {
  render() {
    const {issue, style, isDragging} = this.props;
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
          styles.card,
          isDragging && styles.draggingCard,
          style
        ]}
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
