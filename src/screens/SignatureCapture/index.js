/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Appbar, List, Searchbar } from 'react-native-paper';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import AppGrid from '@Components/organisms/AppGrid';
import Accordion from '@Components/organisms/Accordion';
import HistoryBackActionBar from '@Components/organisms/HistoryBackActionBar';
import { styles as S } from './style';
import { LogisticsKnowledgeService } from '@Services/apis';
import { debounce } from 'lodash';
import SignatureCapture from 'react-native-signature-capture';
import { MediaUpload, Warehouse, Contract } from '@Services/apis';
import base64 from 'react-native-base64';
import RNFS from 'react-native-fs';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
class SignatureCaptureScreen extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      active: 0,
      checked: true,
      checked2: false,
      activeIndex: 0,
      dutyDvCode: '',
      logisticsList: [],
      title: 'All',
      listCategory: [],
    };
    this.navigation = props.navigation;
  }

  /** when after render DOM */
  async componentDidMount() {
    this.fetchData();
    this.getListCategory();
  }
  componentDidUpdate(prevProps, prevState) {
    // console.log('prevState', prevState);
    // console.log('state', this.state);
  }
  saveSign() {
    this.refs['sign'].saveImage();
  }

  resetSign() {
    this.refs['sign'].resetImage();
  }

  // base64ToBlob = base64 => {
  //   console.log('base64', base64);
  //   let blobBin = atob(base64.split(',')[1]); // base64
  //   let array = [];
  //   for (let i = 0; i < blobBin.length; i++) {
  //     array.push(blobBin.charCodeAt(i));
  //   }
  //   let file = new Blob([new Uint8Array(array)], { type: 'image/png' }); // Blob
  //   return file;
  // };
  _onSaveEvent = result => {
    //result.encoded - for the base64 encoded png
    //result.pathName - for the file path name
    let base64Icon = `data:image/png;base64,${result.encoded}`;
    // this.base64ToBlob(result.encoded);
    // console.log('base64=====>', this.base64ToBlob(result.encoded));

    base64.decode(result.encoded);

    console.log('base64', base64);
    const data = new FormData();

    data.append('file', result.encoded);
    // data.append('warehouseRegNo', dataContractDetail[detail.type2 === 'KEEP' ? 'estmtKeeps' : 'estmtTrusts'].id.warehouseRegNo);
    // data.append('rentUserNo', detail.rentUserNo);
    // data.append('cntrYmdFrom', moment(dataContractDetail[detail.type2 === 'KEEP' ? 'estmtKeeps' : 'estmtTrusts'].id.cntrYmdFrom).format('YYYYMMDD'));
    const imageDate = '<some base64 data>';
    const imagePath = `${RNFS.TemporaryDirectoryPath}image.jpg`;

    // RNFS.writeFile(imagePath, result.encoded, 'base64').then(() =>
    //   console.log('Image converted to jpg and saved at ' + imagePath),
    // );
    // console.log('imagePath==========>', imagePath);
    // data.append('file', imagePath);

    // Contract.elctrCntr({
    //   type: 'tenant',
    //   contractType: 'RG20210111326',
    //   formData: data,
    // })
    // Warehouse.uploadImage({
    //   formData: data,
    // })
    Warehouse.upload({
      type: 'tenant',
      contractType: 'RG20210111326',
      formData: data,
    })
      .then(respon => {
        let { filename, url } = respon.data;
        console.log('respon', respon.data);
        // var pathArray = url.split('/');
        // var host = pathArray[pathArray.length - 1];
      })
      .catch(error => {
        // alert(' MediaUpload.uploadFile:' + error.reponse.data.message);
        console.log('error===>', error.response);
      });
    console.log('data=====>', data);
    console.log('result=====>', result);

    this.setState({ result });
  };
  _onDragEvent() {
    // This callback will be called when the user enters signature
    console.log('dragged');
  }

  render() {
    const { logisticsList, title, listCategory } = this.state;

    const handleQueryChange = debounce(query => {
      this.fetchData({ query: query });
    }, 200);

    const handleClickTab = (tabName, index) => {
      // console.log('tabName -> ', tabName);
      // console.log('index -> ', index);
      this.setState(
        {
          dutyDvCode: listCategory[index].stdDetailCode,
          title: tabName,
        },
        function() {
          this.fetchData();
        },
      );
    };

    return (
      <SafeAreaView style={S.container}>
        <HistoryBackActionBar
          title={'물류지식 게시판'}
          navigation={this.navigation}
        />
        <ScrollView>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <Text style={{ alignItems: 'center', justifyContent: 'center' }}>
              Signature Capture Extended{' '}
            </Text>
            <SignatureCapture
              style={[{ flex: 1 }, styles.signature]}
              ref="sign"
              onSaveEvent={this._onSaveEvent}
              onDragEvent={this._onDragEvent}
              saveImageFileInExtStorage={false}
              showNativeButtons={false}
              showTitleLabel={false}
              backgroundColor="#fafafa"
              strokeColor="#000000"
              minStrokeWidth={4}
              maxStrokeWidth={4}
              viewMode={'portrait'}
            />

            <View style={{ flex: 1, flexDirection: 'row' }}>
              <TouchableHighlight
                style={styles.buttonStyle}
                onPress={() => {
                  this.resetSign();
                }}>
                <Text style={DefaultStyle._textDF3}>Reset</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.buttonStyle}
                onPress={() => {
                  this.saveSign();
                }}>
                <Text style={DefaultStyle._textDF3}>Save</Text>
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default SignatureCaptureScreen;

const styles = StyleSheet.create({
  signature: {
    flex: 1,
    borderColor: '#000033',
    borderWidth: 1,
    height: windowHeight - 200,
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderWidth: 1,
    borderColor: '#d7d7d7',
    borderRadius: 4,
    padding: 0,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
