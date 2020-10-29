/**
 * WebView Cookie Service
 * 2020.09.03 Deokin
 *
 *[참고] https://github.com/react-native-community/cookies
 * @format
 * @flow strict-local
 * */
import CookieManager from '@react-native-community/cookies';
import AsyncStorage from '@react-native-community/async-storage';
import {Platform} from 'react-native';

class WebViewCookieService {

  /**
   * Starting Point : Register FCM Container
   * */
  async init() {
  };

  /**
   * 쿠키정보를 앱 스토리지에 저장.(for iOS)
   * @param {String} cookieName - 저장할 쿠키 이름.
   * */
  async saveCookie(cookieName) {
    // 웹뷰에서 로그인 이벤트 발생 => 세션쿠키를 스토리지에 저장한다.
    if (Platform.OS === 'ios') {
      CookieManager.getAll(true).then(async (cookies) => {
        // console.log('::::: Save Cookie ', cookies[cookieName]);
        if (cookies[cookieName]) {
          await AsyncStorage.setItem(cookieName, JSON.stringify(cookies[cookieName]));
        }
      });
    }
  }

  /**
   * 웹뷰의 쿠키와 앱의 쿠키를 동기화 한다.(for iOS)
   * @param {String} cookieName - 동기화할 쿠키 이름.
   * @param {String}cookieURL - 쿠기 도메인.
   * @param {Function}onSync - 동기화 완료 콜백.
   * */
  async syncCookie(cookieName, cookieURL, onSync) {
    if (Platform.OS === 'ios') {
      // 웹이 로드 될때 마다 웹뷰 세션쿠키 확인 후 => 다를경우 웹뷰 세션쿠키를 스토리지 쿠키로 갱신한다.
      CookieManager.getAll(true).then(async (cookies) => {
        let storageCookie = JSON.parse(await AsyncStorage.getItem(cookieName));
        // console.log('토큰(APP) : ', storageCookie ? storageCookie.value : '');
        // console.log('토큰(WEB) : ', cookies[cookieName] ? cookies[cookieName].value : '');
        if (storageCookie && (!cookies[cookieName] || storageCookie.value !== cookies[cookieName].value)) {
          let cookie = {
            name: cookieName,
            value: storageCookie.value,
            domain: storageCookie.domain,
            path: storageCookie.path,
            version: storageCookie.version,
          };
          // clear a specific cookie by its name (IOS ONLY)
          CookieManager.clearByName(cookieURL, cookieName, true).then((success) => {
            if (success) {
              // console.log('::: 스토리지 토큰 (저장)=> 웹뷰', cookie);
              CookieManager.set(cookieURL, cookie, true).then(async (done) => {
                if (done) {
                  onSync(true);
                }
              });
            }
          });
        }
      });
    }
  }

  /**
   * 앱 스토리지에서 쿠키 가져오기.
   * */
}

export default new WebViewCookieService();
