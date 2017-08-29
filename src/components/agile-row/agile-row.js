/* @flow */
import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import ApiHelper from '../api/api__helper';
import {arrowRightGray, arrowDownGray} from '../icon/icon';
import styles from './agile-row.styles';
import type {AgileBoardRow} from '../../flow/Agile';
import type {IssueOnList} from '../../flow/Issue';
import Cell from './agile-row-cell';
import type {IssueCardRenderer} from './agile-row-cell';

type Props = {
  style?: any,
  row: AgileBoardRow,
  collapsedColumnIds: Array<string>,
  onTapIssue: (issue: IssueOnList) => any,
  onTapCreateIssue: (columnId: string, cellId: string) => any,
  onCollapseToggle: (row: AgileBoardRow) => any,
  renderIssueCard: IssueCardRenderer
};

export default function BoardRow(props: Props) {
  const {row, style, collapsedColumnIds, onCollapseToggle, onTapIssue, onTapCreateIssue, renderIssueCard} = props;
  const isResolved = row.issue && row.issue.resolved;

  return (
    <View style={[styles.rowContainer, style]}>

      <View style={styles.rowHeader}>

        {row.issue && <TouchableOpacity onPress={() => onTapIssue(row.issue)}>
          <Text style={[styles.headerIssueId, isResolved && styles.resolvedIssueText]}>
            {ApiHelper.getIssueId(row.issue)}
          </Text>
        </TouchableOpacity>}

        <TouchableOpacity
          style={styles.collapseButton}
          onPress={() => onCollapseToggle(row)}
        >
          <Image source={row.collapsed ? arrowRightGray: arrowDownGray} style={styles.collapseIcon}/>
          <Text style={[styles.rowHeaderText, isResolved && styles.resolvedIssueText]}>
            {row.id === 'orphans' ? 'Uncategorized Cards' : (row.issue && row.issue.summary || row.name)}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        {!row.collapsed && row.cells.map((cell, index) => {
          const collapsed = collapsedColumnIds.includes(cell.column.id);
          const lastColumn = index === row.cells.length - 1;
          return (
            <Cell
              key={cell.id}
              {...{cell, collapsed, onTapCreateIssue, lastColumn, renderIssueCard}}
            />
          );
        })}
      </View>

    </View>
  );
}
