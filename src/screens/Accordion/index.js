/**
 * Sample Screen
 * 샘플 화면 입니다.
 * 2020.06.05 Deokin.
 *
 * @format
 * @flow strict-local
 * */
// Global Imports
import React, {Component} from 'react';
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import {List} from 'react-native-paper';
import DefaultStyle from '../../styles/default';

export default class Accordion extends Component {
  constructor(props) {
    super(props);
    this.state = {expanded: 'true'};
  }
  handlePress = e => {
    this.setState({expanded: !this.state.expanded});
  };
  accordionPress = e => {
    console.log('e :>> ', e);
  };
  render() {
    return (
      <ScrollView>
        <List.Section title="Accordions">
          <List.Accordion
            onAccordionPress={expandedId => this.accordionPress(expandedId)}
            title="Expansion Panel 1"
            left={props => <List.Icon {...props} icon="folder" />}>
            <List.Item title="First item" />
            <List.Item title="Second item" />
          </List.Accordion>

          <List.Accordion
            title="Expansion Panel 2"
            left={props => <List.Icon {...props} icon="folder" />}
            expanded={this.state.expanded}
            onPress={this.handlePress}>
            <List.Item
              title="First Item"
              left={() => <List.Icon icon="equal" />}
            />
            <List.Item
              title="Second Item"
              left={() => <List.Icon color="#000" icon="calendar" />}
            />
          </List.Accordion>
        </List.Section>

        <Text>Group</Text>
        <List.AccordionGroup>
          <List.Accordion
            style={DefaultStyle._titleAccordion}
            title="Expansion Panel1"
            titleStyle={DefaultStyle._contentAccordion}
            id="1">
            <List.Item title="Item 1" />
          </List.Accordion>
          <List.Accordion
            title="Expansion Panel 2"
            id="2"
            titleStyle={DefaultStyle._contentAccordion}
            style={DefaultStyle._titleAccordion}>
            <List.Item title="Item 2" />
          </List.Accordion>

          <List.Accordion
            title="Expansion Panel 3"
            id="3"
            style={DefaultStyle._titleAccordion}
            titleStyle={DefaultStyle._contentAccordion}>
            <List.Item title="Item 3" />
          </List.Accordion>
        </List.AccordionGroup>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  top: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
});
