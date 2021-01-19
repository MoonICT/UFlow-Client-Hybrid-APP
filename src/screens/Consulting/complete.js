import React from 'react';
import {
  StyleSheet,
  View,
  processColor,
  Dimensions,
  ScrollView,
} from 'react-native';
import update from 'immutability-helper';
import Appbars from '@Components/organisms/AppBar';

import { Appbar, Text, Button } from 'react-native-paper';
import DefaultStyle from '@Styles/default';
import { RadarChart } from 'react-native-charts-wrapper';
import HistoryBackActionBar from '@Components/organisms/HistoryBackActionBar';
import { ConsultingApi } from '@Services/apis';
import { styles as S } from './style';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
class RadarChartScreen extends React.Component {
  constructor(props) {
    super(props);

    this.navigation = props.navigation;
    this.state = {
      data: {},
      legend: {
        // enabled: true,
        textSize: 200,
        // form: 'CIRCLE',
        // wordWrapEnabled: true,
      },
    };
  }
  async componentDidMount() {
    let resultAdvisory = await ConsultingApi.result({
      email: 'test@logisall.com',
    });

    console.log('resultAdvisory', resultAdvisory);

    let _label = resultAdvisory.data.labels;
    let _dataSets = resultAdvisory.data.datasets;
    let __dataSets1 = await _dataSets[0].data.map(item => {
      return { value: item };
    });
    let __dataSets2 = await _dataSets[1].data.map(item => {
      return { value: item };
    });
    // console.log('__dataSets1', __dataSets1);
    // console.log('__dataSets2', __dataSets2);
    // let datas = [...__dataSets1,...__dataSets2];
    if (resultAdvisory) {
      console.log('__dataSets1', __dataSets1);
      console.log('__dataSets2', __dataSets2);
      // console.log('datas', datas);
      // const dataFake = [{value:8},{value:6},{value:9},{value:6}];
      // const dataFake = [{value:15},{value:15},{value:13},{value:12}];
      await this.setState(
        update(this.state, {
          data: {
            $set: {
              dataSets: [
                {
                  values: __dataSets1,
                  // values: dataFake1,
                  label: '',
                  config: {
                    color: processColor('black'),
                    drawFilled: true,
                    fillColor: processColor('black'),
                    fillAlpha: 100,
                    lineWidth: 1.5,
                  },
                },
                {
                  values: __dataSets2,
                  // values: dataFake2,
                  label: '',
                  config: {
                    color: processColor('#ff6d00'),
                    drawFilled: true,
                    fillColor: processColor('rgba(255, 109, 0, 0.2)'),
                    fillAlpha: 50,
                    lineWidth: 5,
                  },
                },
              ],
            },
          },
          xAxis: {
            $set: {
              valueFormatter: _label,
            },
          },
        }),
      );
    } else {
      this.setState({ data: 0 });
    }
  }

  render() {
    console.log('data', this.state.data);
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
            onPress={() => this.navigation.goBack()}
          />
          <Appbar.Content
            title="물류컨설팅"
            titleStyle={DefaultStyle.headerTitle}
          />
        </Appbars>
        {/* <HistoryBackActionBar
          title={'물류컨설팅'}
          navigation={this.navigation}
        /> */}
        <ScrollView>
          <View style={styles.container}>
            <View pointerEvents="none">
              <RadarChart
                style={styles.chart}
                data={this.state.data}
                xAxis={this.state.xAxis}
                yAxis={{ drawLabels: true }}
                chartDescription={{ text: '' }}
                legend={this.state.legend}
                drawWeb={true}
                // webLineWidth={5}
                // webLineWidthInner={5}
                // webAlpha={255}

                // webColor={processColor('red')}
                // webColorInner={processColor('green')}
                // skipWebLineCount={1}
                // onSelect={this.handleSelect.bind(this)}
                // onChange={event => console.log(event.nativeEvent)}
              />
              <View
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: 'white',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                }}
              />
            </View>
            <Text style={{ fontSize: 20 }}>물류 컨성팅이 완료되었습니다.</Text>
            <Text style={{ fontSize: 16, lineHeight: 24, marginTop: 20 }}>
              컨설팅 결과 설명{'\n'}컨설팅 결과 설명
            </Text>

            <Button
              mode="contained"
              style={[S.styleButton, { marginTop: 30 }]}
              onPress={() => this.navigation.replace('Home')}>
              <Text style={[S.textButton, { width: 175 }]}>
                메인페이지로 이동
              </Text>
            </Button>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingBottom: 100,
    minHeight: windowHeight + 100,
  },
  chart: {
    flex: 1,
    maxHeight: 400,
    width: windowWidth - 80,
    alignItems: 'flex-start',
    marginTop: 50,
  },
});

export default RadarChartScreen;
