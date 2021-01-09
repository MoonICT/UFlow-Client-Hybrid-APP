import React from 'react';
import { StyleSheet, View, processColor } from 'react-native';
import update from 'immutability-helper';
import Appbars from '@Components/organisms/AppBar';

import { Appbar, Text } from 'react-native-paper';
import DefaultStyle from '@Styles/default';
import { RadarChart } from 'react-native-charts-wrapper';

class RadarChartScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      data: {},
      legend: {
        enabled: true,
        // textSize: 200,
        // form: 'CIRCLE',
        // wordWrapEnabled: true,
      },
    };
  }

  componentDidMount() {
    this.setState(
      update(this.state, {
        data: {
          $set: {
            dataSets: [
              {
                values: [
                  { value: 8 },
                  { value: 6 },
                  { value: 9 },
                  { value: 6 },
                  // { value: 110 },
                ],
                label: '',
                config: {
                  color: processColor('000000'),

                  drawFilled: true,
                  fillColor: processColor('red'),
                  fillAlpha: 100,
                  lineWidth: 5,
                },
              },
              {
                values: [
                  { value: 15 },
                  { value: 15 },
                  { value: 13 },
                  { value: 12 },
                  // { value: 120 },
                ],
                label: '',
                config: {
                  color: processColor('#fd6d00'),

                  drawFilled: true,
                  fillColor: processColor('rgba(255, 109, 0, 0.2)'),
                  fillAlpha: 150,
                  lineWidth: 5,
                },
              },
              // {
              //   values: [
              //     { value: 105 },
              //     { value: 115 },
              //     { value: 121 },
              //     { value: 110 },
              //     { value: 105 },
              //   ],
              //   label: '',
              //   config: {
              //     color: processColor('#8CEAFF'),

              //     drawFilled: true,
              //     fillColor: processColor('#8CEAFF'),
              //   },
              // },
            ],
          },
        },
        // xAxis: {
        //   $set: {
        //     valueFormatter: ['A', 'B', 'C'],
        //   },
        // },
      }),
    );
  }

  handleSelect(event) {
    let entry = event.nativeEvent;
    if (entry == null) {
      this.setState({ ...this.state, selectedEntry: null });
    } else {
      this.setState({ ...this.state, selectedEntry: JSON.stringify(entry) });
    }

    console.log(event.nativeEvent);
  }

  render() {
    // const data = {
    //   labels: ['전략', '운영', '관리', '시스템'],
    //   datasets: [
    //     {
    //       backgroundColor: 'rgba(117,117,117,0.2)',
    //       borderColor: 'rgba(117,117,117,1)',
    //       data: [8, 6, 6, 9],
    //     },
    //   ],
    // };
    return (
      <View style={{ flex: 1 }}>
        <Appbars
          customStyle={{
            borderBottomColor: '#d7d7d7',
            backgroundColor: 'white',
          }}>
          <Appbar.Action
            icon="arrow-left"
            // color="white"
            onPress={() => this.handleNavigation()}
          />
          <Appbar.Content
            title="물류컨설팅"
            titleStyle={DefaultStyle.headerTitle}
          />
        </Appbars>

        <View style={styles.container}>
          <RadarChart
            style={styles.chart}
            data={this.state.data}
            // xAxis={this.state.xAxis}
            // yAxis={{ drawLabels: true }}
            // chartDescription={{ text: '' }}
            legend={this.state.legend}
            // drawWeb={true}
            // webLineWidth={5}
            // webLineWidthInner={5}
            // webAlpha={255}
            // webColor={processColor('red')}
            // webColorInner={processColor('green')}
            // skipWebLineCount={1}
            // onSelect={this.handleSelect.bind(this)}
            // onChange={event => console.log(event.nativeEvent)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  chart: {
    flex: 1,
  },
});

export default RadarChartScreen;
