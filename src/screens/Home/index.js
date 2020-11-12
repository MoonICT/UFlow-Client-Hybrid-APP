/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
// Global Imports
import React, {Component} from 'react';
import {SafeAreaView, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';

// Local Imports
import DefaultStyle from '../../styles/default';
import ActionCreator from '../../actions';
import Carousel from '@Components/organisms/Carousel';

// import VersionCheckService from '../../services/VersionCheckService';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;

class Home extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      temp: 'Temp Data',
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentWillUnmount() {
    console.log('::componentWillUnmount::');
  }

  render() {
    const {showPopup} = this.props;

    return (
      <SafeAreaView style={DefaultStyle.container}>
        <Text style={{textAlign: 'center', marginTop: 40}}>UFLOW</Text>
        <ScrollView>
          <Card>
            <Card.Title
              title="Card Title"
              subtitle="Card Subtitle"
              left={LeftContent}
            />
            <Card.Content>
              <Title>Card title</Title>
              <Paragraph>Card content</Paragraph>
            </Card.Content>
            <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
            <Card.Actions>
              <Button onPress={() => showPopup()}>Cancel</Button>
              <Button>Ok</Button>
            </Card.Actions>
          </Card>
          <Card>
            <Card.Title
              title="Card Title"
              subtitle="Card Subtitle"
              left={LeftContent}
            />
            <Card.Content>
              <Title>Card title</Title>
              <Paragraph>Card content</Paragraph>
            </Card.Content>
            <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
            <Card.Actions>
              <Button onPress={() => showPopup()}>Cancel</Button>
              <Button>Ok</Button>
            </Card.Actions>
          </Card>
        </ScrollView>
      </SafeAreaView>
    );
  }

  async componentDidMount() {
    console.log('::componentDidMount::');
    /** App Version Check (배포시 활성.) */
    // await VersionCheckService.init();
    /** Complete Initialize. */
    SplashScreen.hide();
  }

  // 컴포넌트 업데이트 직후 호출.
  componentDidUpdate(prevProps, prevState) {
    console.log('::componentDidUpdate::');
  }
}

// store의 state를 component에 필요한 state만 선별하여 제공하는 역할.
function mapStateToProps(state) {
  // console.log('++++++mapStateToProps: ', state);
  return {
    count: state.home.count,
  };
}

// store에 action을 dispatch 하는 역할.
function mapDispatchToProps(dispatch) {
  return {
    showPopup: status => {
      dispatch(
        ActionCreator.show({
          title: '문의 완료',
          content:
            '답변 내용은 [마이페이지 > 문의내역[ 혹은 등록하신 이메일에서 확인해 주세요.',
        }),
      );
    },
    hidePopup: status => {
      dispatch(ActionCreator.hide(status));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
