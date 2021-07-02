/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    TextInput,
    Dimensions,
    KeyboardAvoidingView, Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { Dialog, Appbar, Text, Button, Portal, Searchbar, } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';


// Local Imports
import Select from '@Components/organisms/Select';
import Bgr from '@Assets/images/bgr-consulting.png';
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import Postcode from 'react-native-daum-postcode';
import TextField from '@Components/organisms/TextField';
import { styles as S } from '../../Consulting/style';
import { styles as SS } from './style';
import { getMsg } from '@Utils/langUtils'; // TODO Require Lang
import { Warehouse } from '@Services/apis';
import { toSquareMeter, toPyeong } from '@Services/utils/unit';
import { stdToNumber, numberToStd } from '@Services/utils/StringUtils';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class RegisterSimple extends Component {
    constructor(props) {
        super(props);
        this.webView = null;
        this.state = {
            visible: false,
            idWH: null,         // 새로 생성된 창고 ID

            step: 0,
            limitIndex: 0,
            listQuest: [],
            listAnswer: [],

            shareTypeCodes: [],         //공유방법(임대/위수탁)
            rentalTypeCodes: [],        //임대유형
            unitsTypeCodes: [],         //정산단위
            unitsTypeCodesKeep: [],     //정산단위(임대)
            unitsTypeCodesTrust: [],    //정산단위(수탁)
            calcTypeCodes: [],          //산정기준
            calcTypeCodesKeep: [],      //산정기준(임대)
            calcTypeCodesTrust: [],     //산정기준(수탁)

            name: '',               //창고명
            address: {              //창고주소
                zipNo: '',
                sidoName: '',
                skkCd: '',
                skkName: '',
                bjdongCd: '',
                bjdongName: '',
                hjdongCd: '',
                hjdongName: '',
                roadNmCd: '',
                address: '',
                detail: '',
            },
            roadAddr:               //도로명주소
            {
                zipNo: '',
                address: '',
                detail: '',
            },
            gps:                    //주소 좌표
            {
                latitude: 0,
                longitude: 0,
            },
            shareType: '',          //공유방법
            rentalType: '',         //임대유형  
            unitsType: '',          //정산단위
            calcType: '',           //산정기준
            usablePy: '',           //가용면적(평)
            usableM: '',            //가용면적(m2)
            usableStartDay: '',     //가용일자(시작)
            usableEndDay: '',       //가용일자(종료)
            description: '',        //창고소개

            from: new Date(),
            showFrom: false,
            to: new Date(),
            showTo: false,

        };
        this.navigation = props.navigation;
    }

    async componentDidMount() {

        this.state.shareTypeCodes = await this.getCodeData('CNTR0002')         /*공유방법 (임대/수탁)*/
        this.state.rentalTypeCodes = await this.getCodeData('WHRG0001')        /*임대유형*/
        this.state.unitsTypeCodesKeep = await this.getCodeData('WHRG0013')     /*정산단위(임대)*/
        this.state.unitsTypeCodesTrust = await this.getCodeData('WHRG0113')    /*정산단위(수탁)*/
        this.state.calcTypeCodesKeep = await this.getCodeData('WHRG0014')      /*산정기준(임대)*/
        this.state.calcTypeCodesTrust = await this.getCodeData('WHRG0114')     /*산정기준(수탁)*/

    }

    /**
     * 창고등록 콤보박스 기초 코드 조회
     * @param {*} code 요청할 기초코드 리스트의 root 코드
     * @returns 기초코드
     */
    async getCodeData(code) {
        let Codes
        await Warehouse.listStdDetailCode(code)
            .then(res => {
                let data = res;
                Codes =
                    data &&
                    data.map((item, index) => {
                        return {
                            label: item.stdDetailCodeName,
                            value: item.stdDetailCode,
                        };
                    });
            });
        return Codes;
    }

    // navigation topbar
    handleNavigation = () => {
        console.log('go back')
        const { step } = this.state;
        if (step > 0) {
            this.setState({ step: step - 1 });
        } else {
            this.navigation.goBack();
        }
    };

    _showDialog = () => this.setState({ visible: true });

    _hideDialog = () => this.setState({ visible: false });

    onChangeLocation = e => {
        let addressUpdate = this.state.address;
        let roadUpdate = this.state.roadAddr;
        addressUpdate.detail = e ? e : '';
        roadUpdate.detail = e ? e : '';
        this.setState({ address: addressUpdate, roadAddr: roadUpdate });
    };
    searchAddress = data => {
        let firstQuery = data.address;
        let address = {
            zipNo: data.zonecode,
            sidoName: data.sido,
            skkCd: '',
            skkName: data.sigungu,
            bjdongCd: data.sigunguCode,
            bjdongName: data.bname,
            hjdongCd: '',
            hjdongName: data.bname2,
            roadNmCd: data.roadnameCode,
            address: data.address,
        };
        let roadAddr = {
            zipNo: data.zonecode,
            address: data.address,
        };
        this.setState({
            firstQuery: firstQuery,
            address,
            roadAddr,
        });
    };

    showDatepicker = () => {
        this.setState({ showFrom: true });
    };

    showDatepickerTo = () => {
        this.setState({ showTo: true });
    };
    onChangeTo = selectedDate => {
        const currentDate = selectedDate || this.state.to;
        this.setState({ to: currentDate, showTo: false });
        let d = selectedDate
            ? new Date(selectedDate).getTime()
            : new Date().getTime();
        let dataF = this.props.formData;
        dataF.usblYmdTo = d;
        this.props.valueForm && this.props.valueForm(dataF);
    };

    render() {
        const {
            step,

            name,
            address,
            shareType,
            rentalType,
            unitsType,
            calcType,
            usablePy,
            description,

            from,
            showFrom,
            to,
            showTo,

        } = this.state;

        let timeCheck = false;
        if (
            typeof from !== 'string' &&
            typeof to !== 'string' &&
            to.toLocaleDateString() >= from.toLocaleDateString() &&
            from.toLocaleDateString() >= new Date().toLocaleDateString()
        ) {
            timeCheck = true;
        }

        return (
            <View style={S.container}>
                <View>
                    <Image source={Bgr} style={S.bgrImage} />
                </View>
                <Appbars customStyle={{ borderBottomColor: '#d7d7d7' }}>
                    <Appbar.Action
                        icon="arrow-left"
                        color="white"
                        // onPress={() => this.handleNavigation()}
                        onPress={() => this.navigation.goBack()}
                    />
                    <Appbar.Content
                        title={getMsg(this.props.lang, 'ML0658', '간편 창고 등록')}
                        titleStyle={DefaultStyle.headerTitleWhite}
                    />
                </Appbars>

                {/* step 0 */}
                {step === 0 && (
                    <View style={S.contentCenter}>
                        <Text style={S.styleH3}>{getMsg(this.props.lang, 'ML0659', '(필수)창고명을 입력해주세요.')}</Text>
                        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                            <View style={SS.inputArea}>
                                <TextInput
                                    placeholderTextColor="#979797"
                                    style={S.inputNomarl}
                                    value={name}
                                    placeholder={getMsg(this.props.lang, 'ML0662', '창고명')}
                                    onChangeText={e => this.setState({ name: e })}
                                />
                            </View>
                        </KeyboardAvoidingView>

                        <Button
                            mode="contained"
                            pointerEvents={
                                name !== ''
                                    ? 'auto'
                                    : 'none'
                            }
                            style={[
                                S.styleButton,
                                {
                                    margin: 'auto',
                                    backgroundColor: `${name !== ''
                                        ? '#ff6d00'
                                        : '#cccccc'
                                        }`,
                                },
                            ]}
                            onPress={() => { this.setState({ step: 1 }) }}>
                            <Text style={[S.textButton]}>{getMsg(this.props.lang, 'ML0663', '다음')}</Text>
                        </Button>
                    </View>
                )}
                {/* step 1 */}
                {step === 1 && (
                    <View style={S.contentCenter}>
                        <Text style={S.styleH3}>{getMsg(this.props.lang, 'ML0660', '(필수)창고위치를 입력해주세요.')}</Text>
                        <Text style={S.styleTextNomarl}>
                            {getMsg(this.props.lang, 'ML0509', '(오픈형인경우 위치를 등록하시면, 조회시 시군면 까지만 보여집니다.)')}
                        </Text>
                        <View style={SS.inputArea}>
                            <TouchableOpacity onPress={this._showDialog}>
                                <Searchbar
                                    inputStyle={S.searchRegister}
                                    placeholder={getMsg(this.props.lang, 'ML0510', '예)번동10-1, 강북구 번동')}
                                    editable={false}
                                    selectTextOnFocus={false}
                                    onChangeText={query => {
                                        this.setState({ firstQuery: query });
                                    }}
                                    value={address.address && address.zipNo}
                                />
                            </TouchableOpacity>

                            <TextInput
                                editable={false}
                                placeholderTextColor="#979797"
                                style={S.inputNomarl}
                                onChangeText={text => {
                                    this.onChangeLocation(text)
                                }}
                                value={address.address}
                                placeholder={getMsg(this.props.lang, 'ML0206', '도로명 주소')}
                            />
                            <TextInput
                                placeholderTextColor="#979797"
                                style={S.inputNomarl}
                                onChangeText={text => {
                                    this.onChangeLocation(text)
                                }}
                                value={address.detail}
                                placeholder={getMsg(this.props.lang, 'ML0241', '상세 주소')}
                            />
                        </View>
                        <Button
                            mode="contained"
                            pointerEvents={
                                address.address !== ''
                                    ? 'auto'
                                    : 'none'
                            }
                            style={[
                                S.styleButton,
                                {
                                    margin: 'auto',
                                    backgroundColor: `${address.address !== ''
                                        ? '#ff6d00'
                                        : '#cccccc'
                                        }`,
                                },
                            ]}
                            onPress={() => { this.setState({ step: 2 }) }}>
                            <Text style={[S.textButton]}>{getMsg(this.props.lang, 'ML0663', '다음')}</Text>
                        </Button>
                    </View>
                )}
                {/* step 2 */}
                {step === 2 && (
                    <View style={S.contentCenter}>
                        <Text style={S.styleH3}>{getMsg(this.props.lang, 'ML0661', '(필수) 공유방법(임대/위수탁)을 선택해주세요.')}</Text>
                        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                            <View style={SS.inputArea}>
                                <Select
                                    data={this.state.shareTypeCodes}
                                    color={'#cccccc'}
                                    valueSelected={
                                        this.state.shareTypeCodes.find(item => item.value === shareType) !== undefined ?
                                            this.state.shareTypeCodes.find(item => item.value === shareType).label : '선택하세요.'
                                    }
                                    valueProps={e => {
                                        this.setState({ shareType: e })
                                        this.setState({
                                            unitsTypeCodes:
                                                e === '1100' ?
                                                    this.state.unitsTypeCodesKeep :
                                                    e === '2100' ?
                                                        this.state.unitsTypeCodesTrust : null
                                        })
                                        this.setState({
                                            calcTypeCodes:
                                                e === '1100' ?
                                                    this.state.calcTypeCodesKeep :
                                                    e === '2100' ?
                                                        this.state.calcTypeCodesTrust : null
                                        })
                                    }}
                                />
                            </View>
                        </KeyboardAvoidingView>

                        <Button
                            mode="contained"
                            pointerEvents={
                                shareType !== ''
                                    ? 'auto'
                                    : 'none'
                            }
                            style={[
                                S.styleButton,
                                {
                                    margin: 'auto',
                                    backgroundColor: `${shareType !== ''
                                        ? '#ff6d00'
                                        : '#cccccc'
                                        }`,
                                },
                            ]}
                            onPress={() => { this.setState({ step: 3 }), this.getCodeData() }}>
                            <Text style={[S.textButton]}>{getMsg(this.props.lang, 'ML0663', '다음')}</Text>
                        </Button>
                    </View>
                )}
                {/* step 3 */}
                {step === 3 && (
                    <View style={S.contentCenter}>
                        <Text style={S.styleH3}>{getMsg(this.props.lang, 'ML0664', '(필수) 임대유형을 선택해주세요.')}</Text>
                        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                            <View style={SS.inputArea}>
                                <Select
                                    data={this.state.rentalTypeCodes}
                                    color={'#cccccc'}
                                    valueSelected={
                                        this.state.rentalTypeCodes.find(item => item.value === rentalType) !== undefined ?
                                            this.state.rentalTypeCodes.find(item => item.value === rentalType).label : '선택하세요.'
                                    }
                                    valueProps={e => {
                                        this.setState({ rentalType: e })
                                    }}
                                />
                            </View>
                        </KeyboardAvoidingView>

                        <Button
                            mode="contained"
                            pointerEvents={
                                rentalType !== ''
                                    ? 'auto'
                                    : 'none'
                            }
                            style={[
                                S.styleButton,
                                {
                                    margin: 'auto',
                                    backgroundColor: `${rentalType !== ''
                                        ? '#ff6d00'
                                        : '#cccccc'
                                        }`,
                                },
                            ]}
                            onPress={() => { this.setState({ step: 4 }), this.getCodeData() }}>
                            <Text style={[S.textButton]}>{getMsg(this.props.lang, 'ML0663', '다음')}</Text>
                        </Button>
                    </View>
                )}
                {/* step 4 */}
                {step === 4 && (
                    <View style={S.contentCenter}>
                        <Text style={S.styleH3}>{getMsg(this.props.lang, 'ML0665', '(필수) 정산단위를 선택해주세요.')}</Text>
                        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                            <View style={SS.inputArea}>
                                <Select
                                    data={
                                        this.state.unitsTypeCodes
                                    }
                                    color={'#cccccc'}
                                    valueSelected={
                                        this.state.unitsTypeCodes.find(item => item.value === unitsType) !== undefined ?
                                            this.state.unitsTypeCodes.find(item => item.value === unitsType).label : '선택하세요.'
                                    }
                                    valueProps={e => {
                                        this.setState({ unitsType: e })
                                    }}
                                />
                            </View>
                        </KeyboardAvoidingView>

                        <Button
                            mode="contained"
                            pointerEvents={
                                unitsType !== ''
                                    ? 'auto'
                                    : 'none'
                            }
                            style={[
                                S.styleButton,
                                {
                                    margin: 'auto',
                                    backgroundColor: `${unitsType !== ''
                                        ? '#ff6d00'
                                        : '#cccccc'
                                        }`,
                                },
                            ]}
                            onPress={() => { this.setState({ step: 5 }), this.getCodeData() }}>
                            <Text style={[S.textButton]}>{getMsg(this.props.lang, 'ML0663', '다음')}</Text>
                        </Button>
                    </View>
                )}
                {/* step 5 */}
                {step === 5 && (
                    <View style={S.contentCenter}>
                        <Text style={S.styleH3}>{getMsg(this.props.lang, 'ML0666', '(필수) 산정기준을 선택해주세요.')}</Text>
                        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                            <View style={SS.inputArea}>
                                <Select
                                    data={
                                        this.state.calcTypeCodes
                                    }
                                    color={'#cccccc'}
                                    valueSelected={
                                        this.state.calcTypeCodes.find(item => item.value === calcType) !== undefined ?
                                            this.state.calcTypeCodes.find(item => item.value === calcType).label : '선택하세요.'
                                    }
                                    valueProps={e => {
                                        this.setState({ calcType: e })
                                    }}
                                />
                            </View>
                        </KeyboardAvoidingView>

                        <Button
                            mode="contained"
                            pointerEvents={
                                calcType !== ''
                                    ? 'auto'
                                    : 'none'
                            }
                            style={[
                                S.styleButton,
                                {
                                    margin: 'auto',
                                    backgroundColor: `${calcType !== ''
                                        ? '#ff6d00'
                                        : '#cccccc'
                                        }`,
                                },
                            ]}
                            onPress={() => { this.setState({ step: 6 }), this.getCodeData() }}>
                            <Text style={[S.textButton]}>{getMsg(this.props.lang, 'ML0663', '다음')}</Text>
                        </Button>
                    </View>
                )}
                {/* step 6 */}
                {step === 6 && (
                    <View style={S.contentCenter}>
                        <Text style={S.styleH3}>{getMsg(this.props.lang, 'ML0667', '(필수) 가용면적 또는 가용수량을 입력해주세요.')}</Text>
                        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                            <View style={SS.inputArea}>
                                <View style={DefaultStyle._listElement}>
                                    <View style={[DefaultStyle._element, { marginRight: 12 }]}>
                                        <TextField
                                            borderColor={'#cccccc'}
                                            color={'#cccccc'}
                                            textRight={getMsg(this.props.lang, 'ML0487', '평')}
                                            styleRight={[{ color: '#cccccc' }]}
                                            //isRequired={true}
                                            maxLength={7}
                                            defaultValue={
                                                this.state.usablePy
                                                    ? numberToStd(this.state.usablePy)
                                                    : ''
                                            }
                                            valueProps={e => {
                                                const value = parseInt(e.replace(/[^0-9]/g, ''));
                                                let valueCover = toSquareMeter(value);
                                                this.setState({ usablePy: e.replace(/[^0-9]/g, '') });
                                                this.setState({ usableM: stdToNumber(valueCover) });
                                            }}
                                            value={numberToStd(this.state.usablePy) === '' ?
                                                '' : numberToStd(this.state.usablePy)}
                                            keyboardType="numeric"
                                        />
                                    </View>
                                    <View style={DefaultStyle._element}>
                                        <TextField
                                            borderColor={'#cccccc'}
                                            color={'#cccccc'}
                                            textRight={getMsg(this.props.lang, 'ML0671', 'm2')}
                                            styleRight={[{ color: '#cccccc' }]}
                                            maxLength={7}
                                            defaultValue={
                                                this.state.usableM ? numberToStd(this.state.usableM) : ''
                                            }
                                            valueProps={e => {
                                                let text = e.replace(/[^0-9]/g, '');
                                                let value = parseInt(text);
                                                let valueCover = toPyeong(value);
                                                this.setState({ usablePy: valueCover });
                                                this.setState({ usableM: text });
                                            }}
                                            value={numberToStd(this.state.usableM) === '' ?
                                                '' : numberToStd(this.state.usableM)}
                                            keyboardType="numeric"
                                        />
                                    </View>
                                </View>
                            </View>

                        </KeyboardAvoidingView>

                        <Button
                            mode="contained"
                            pointerEvents={
                                usablePy !== ''
                                    ? 'auto'
                                    : 'none'
                            }
                            style={[
                                S.styleButton,
                                {
                                    margin: 'auto',
                                    backgroundColor: `${usablePy !== ''
                                        ? '#ff6d00'
                                        : '#cccccc'
                                        }`,
                                },
                            ]}
                            onPress={() => { this.setState({ step: 7 }), this.getCodeData() }}>
                            <Text style={[S.textButton]}>{getMsg(this.props.lang, 'ML0663', '다음')}</Text>
                        </Button>
                    </View>
                )}
                {/* step 7 */}
                {step === 7 && (
                    <View style={S.contentCenter}>
                        <Text style={S.styleH3}>{getMsg(this.props.lang, 'ML0668', '(필수) 가용일자를 입력해주세요.')}</Text>
                        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                            <View style={SS.dateInputArea}>
                                <View>
                                    <TouchableOpacity
                                        onPress={this.showDatepicker}
                                        style={[
                                            DefaultStyle._btnDate,
                                            timeCheck === false ? DefaultStyle._errorText : '',
                                            { borderColor: '#cccccc', },
                                        ]}>
                                        <Text style={[DefaultStyle._textDate, { color: '#cccccc' }]}>
                                            {typeof from === 'string' ? from : from.toLocaleDateString()}
                                        </Text>
                                        <DateTimePickerModal
                                            mode="date"
                                            isVisible={showFrom}
                                            date={from ? from : new Date()}
                                            onConfirm={date => this.onChangeFrom(date)}
                                            onCancel={() => {
                                                this.setState({
                                                    showFrom: false,
                                                });
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <Text style={SS.dateDv}>
                                    ~
                                </Text>
                                <View >
                                    <TouchableOpacity
                                        onPress={this.showDatepickerTo}
                                        style={[
                                            DefaultStyle._btnDate,
                                            timeCheck === false ? DefaultStyle._errorText : '',
                                            { borderColor: '#cccccc', },
                                        ]}>
                                        <Text style={[DefaultStyle._textDate, { color: '#cccccc' }]}>
                                            {typeof to === 'string' ? to : to.toLocaleDateString()}
                                        </Text>
                                        <DateTimePickerModal
                                            mode="date"
                                            isVisible={showTo}
                                            date={to ? to : new Date()}
                                            onConfirm={date => this.onChangeTo(date)}
                                            onCancel={() => {
                                                this.setState({
                                                    showTo: false,
                                                });
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </KeyboardAvoidingView>

                        <Button
                            mode="contained"
                            pointerEvents={
                                shareType !== ''
                                    ? 'auto'
                                    : 'none'
                            }
                            style={[
                                S.styleButton,
                                {
                                    margin: 'auto',
                                    backgroundColor: `${shareType !== ''
                                        ? '#ff6d00'
                                        : '#cccccc'
                                        }`,
                                },
                            ]}
                            onPress={() => { this.setState({ step: 8 }) }}>
                            <Text style={[S.textButton]}>{getMsg(this.props.lang, 'ML0663', '다음')}</Text>
                        </Button>
                    </View>
                )}
                {/* step 8 */}
                {step === 8 && (
                    <View style={S.contentCenter}>
                        <Text style={S.styleH3}>{getMsg(this.props.lang, 'ML0669', '(선택) 창고소개정보를 입력해주세요.')}</Text>
                        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                            <View style={SS.inputArea}>
                                <TextInput
                                    style={[SS.inputIntro, { height: 300 }]}
                                    multiline={true}
                                    numberOfLines={4}
                                    placeholderTextColor="#979797"
                                    value={description}
                                    placeholder={getMsg(this.props.lang, 'ML0508', '상세 설명 작성 주의사항\n- 창고 정보와 관련없는 홍보성 정보는 입력하실 수 없습니다. (홈페이지 주소, 블로그, SNS, 메신저ID, 전화번호, 이메일 등)\n- 중개수수료를 언급한 내용은 입력할 수 없습니다. (중개수수료 무료, 공짜, 반값 등)\n\n* 주의사항 위반시 허위정보로 간주되어 게시물 삭제 및 이용의 제한이 있을 수 있습니다.\n* 유플로우의 창고 등록 규정에 위반되는 금칙어는 등록이 블가합니다.')}
                                    onChangeText={e => this.setState({ description: e })}
                                />
                            </View>
                        </KeyboardAvoidingView>

                        <Button
                            mode="contained"
                            pointerEvents={'auto'}
                            style={[
                                S.styleButton,
                                {
                                    margin: 'auto',
                                    backgroundColor: '#ff6d00',
                                },
                            ]}
                            onPress={() => { this.setState({ step: 9 }) }}>
                            <Text style={[S.textButton]}>{getMsg(this.props.lang, 'ML0663', '다음')}</Text>
                        </Button>
                    </View>
                )}
                {/* step 9 */}
                {step === 9 && (
                    <View style={S.contentCenter}>
                        <Text style={S.styleH3}>{getMsg(this.props.lang, 'ML0670', '(선택) 창고사진을 등록해주세요.')}</Text>
                        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                            <View style={SS.inputArea}>
                                <TouchableOpacity
                                    style={SS.imageRegister}
                                    onPress={() =>
                                        this.navigation.navigate('RegisterImage', {
                                            idWH: this.state.idWH,
                                        })
                                    }>
                                    {imageStore && imageStore.length > 0 ? (
                                        <Fragment>
                                            <Text style={[DefaultStyle._titleWH, SS.textRepresentative]}>
                                                {getMsg(this.props.lang, 'ML0491', '대표이미지')}
                                            </Text>
                                            <Image
                                                style={S.ImagePanaUpload}
                                                source={{ uri: imageStore[0].url }}
                                            />
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            <Image source={ignore3} style={S.ImageStyle} />
                                            <Text style={S.textImage}>{getMsg(this.props.lang, 'ML0494', '사진 추가')}</Text>
                                        </Fragment>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>

                        <Button
                            mode="contained"
                            pointerEvents={'auto'}
                            style={[
                                S.styleButton,
                                {
                                    margin: 'auto',
                                    backgroundColor: '#ff6d00',
                                },
                            ]}
                            onPress={() => { this.setState({ step: 9 }) }}>
                            <Text style={[S.textButton]}>{getMsg(this.props.lang, 'ML0663', '다음')}</Text>
                        </Button>
                    </View>
                )}
                {/* {listQuest.map((item, index) => this.renderQuestion(item, index))}
                {step !== 1 && step === listQuest.length + 1 && (
                    <View style={S.contentCenter}>
                        <Text style={[S.styleTextTitleNomarl, { textAlign: 'center' }]}>
                            {getMsg(this.props.lang, 'ML0443', '물류 컨설팅 등록되었습니다.\n감사합니다.')}
                        </Text>
                        <Button
                            mode="contained"
                            style={[S.styleButton, { marginTop: 30 }]}
                            onPress={() => {
                                this.setState({ step: 0 }),
                                    this.getAllData,
                                    this.navigation.navigate('ConsultingComplete', {
                                        email: email
                                    });
                            }}>
                            <Text style={[S.textButton, { width: 175 }]}>
                                {getMsg(this.props.lang, 'ML0444', '컨설팅 결과 확인하기')}

                            </Text>
                        </Button>
                    </View>
                )} */}
                <View style={S.contentProgress}>
                    <View>
                        <Text style={S.valueProgress}>
                            {Math.floor(((step) * 100) / 10)}%
                        </Text>
                        <View style={S.lineDefault}>
                            {step !== 0 ? (
                                <View
                                    style={[
                                        S.lineMove,
                                        { width: `${((step) * 100) / 10}%` },
                                    ]}
                                />
                            ) : (
                                <View style={[S.lineMove, { width: 0 }]} />
                            )}
                        </View>
                    </View>

                    <View style={S.boxBottom}>
                        {/*이전 버튼*/}
                        <View pointerEvents={step > 0 ? 'auto' : 'none'}>
                            <Icon.Button
                                size={20}
                                onPress={() =>
                                    step !== 0 && this.setState({ step: step - 1 })
                                }
                                backgroundColor="transparent"
                                color={step >= 1 ? 'white' : 'rgba(215, 215, 215, 0.5)'}
                                style={
                                    step >= 1
                                        ? [S.itemNavigation, { marginRight: 4 }]
                                        : [S.itemNavigationNone, { marginRight: 4 }]
                                }
                                name="chevron-up"
                            />
                        </View>
                        {/* 다음 버튼
                        <View
                            pointerEvents={
                                step < 10 && step <= limitIndex
                                    ? 'auto'
                                    : 'none'
                            }>
                            <Icon.Button
                                size={20}
                                color={
                                    step < 10 && step <= limitIndex
                                        ? 'white'
                                        : 'rgba(215, 215, 215, 0.5)'
                                }
                                backgroundColor="transparent"
                                style={
                                    step < 10 && step <= limitIndex
                                        ? S.itemNavigation
                                        : S.itemNavigationNone
                                }
                                onPress={() =>
                                    step <= limitIndex &&
                                    step !== 10 &&
                                    this.setState({ step: step + 1 })
                                }
                                name="chevron-down"
                            />
                        </View> */}
                    </View>
                </View>

                <Portal>
                    <Dialog
                        style={DefaultStyle._postCode}
                        visible={this.state.visible}
                        onDismiss={this._hideDialog}>
                        <Dialog.Content style={DefaultStyle._postCodeContent}>
                            <Postcode
                                style={DefaultStyle._postCodeContent}
                                jsOptions={{ animated: true }}
                                onSelected={data => {
                                    this.searchAddress(data);

                                    this._hideDialog();
                                }}
                            />
                        </Dialog.Content>
                    </Dialog>
                </Portal>
            </View>
        )
    }
}

class Subject extends Component {
    render() {
        const {
            name,
            description,
            gps,
            address,
            roadAddr,
            listSearch,
        } = this.state;

        return (
            <View style={S.contentCenter}>
                <Text style={S.styleH3}>{this.props.question}</Text>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <View
                        style={{
                            width: windowWidth - 32,
                            paddingLeft: 16,
                            paddingRight: 16,
                            marginBottom: 15,
                            marginTop: 15,
                        }}>
                        <TextInput
                            placeholderTextColor="#979797"
                            style={S.inputNomarl}
                            value={this.props.name}
                            placeholder={this.props.hint}
                            onChangeText={e => this.setState({ name: e })}
                        />
                    </View>
                </KeyboardAvoidingView>

                <Button
                    mode="contained"
                    pointerEvents={
                        this.props.name !== ''
                            ? 'auto'
                            : 'none'
                    }
                    style={[
                        S.styleButton,
                        {
                            margin: 'auto',
                            backgroundColor: `${this.props.name !== ''
                                ? '#ff6d00'
                                : '#cccccc'
                                }`,
                        },
                    ]}
                    onPress={() => { this.setState({ step: 1 }) }}>
                    <Text style={[S.textButton]}>{getMsg(this.props.lang, 'ML0663', '다음')}</Text>
                </Button>
            </View>
        );
    }
}

/** map state with store states redux store */
function mapStateToProps(state) {
    // console.log('++++++mapStateToProps: ', state);
    return {
        // count: state.home.count,
        dataIntro: state.registerWH,
    };
}

/** dispatch action to redux */
function mapDispatchToProps(dispatch) {
    return {
        updateInfo: action => {
            dispatch(ActionCreator.updateInfo(action));
        },
        showPopup: status => {
            dispatch(ActionCreator.show(status));
        },
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RegisterSimple);