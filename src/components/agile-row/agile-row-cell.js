import React, {PureComponent} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {getPriotityField} from '../issue-formatter/issue-formatter';
import {addGray} from '../icon/icon';

import type {BoardCell} from '../../flow/Agile';

import styles from './agile-row.styles';

export type IssueCardRenderer = (issue: IssueOnList) => any;

type Props = {
  cell: BoardCell,
  collapsed: boolean,
  onTapCreateIssue: any => any,
  lastColumn: boolean,
  renderIssueCard: IssueCardRenderer
}

type State = {

};

function renderIssueSquare(issue: IssueOnList) {
  const priorityField = getPriotityField(issue);

  const color = priorityField ? priorityField.value.color : null;
  return <View
    key={issue.id}
    style={[styles.issueSquare, color && {backgroundColor: color.background}]}
  />;
}

export default class Cell extends PureComponent<void, Props, State> {
  render() {
    const {cell, collapsed, onTapCreateIssue, lastColumn, renderIssueCard} = this.props;

    return (
      <View
        style={[
          styles.column,
          collapsed && styles.columnCollapsed,
          lastColumn && styles.columnWithoutBorder
        ]}
      >
        {cell.issues.map(collapsed ? renderIssueSquare : renderIssueCard)}

        {!collapsed &&
          <TouchableOpacity
            onPress={() => onTapCreateIssue(cell.column.id, cell.id)}
            style={styles.addCardButton}
          >
            <Image style={styles.addCardIcon} source={addGray} />
          </TouchableOpacity>}
      </View>
    );
  }
}
