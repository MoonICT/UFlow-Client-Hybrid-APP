/**
 * App Version Check Service
 * 2020.08.12 Deokin
 *
 * [참고] https://github.com/kimxogus/react-native-version-check
 * @format
 * @flow strict-local
 * */
import {Alert, Platform} from 'react-native';
import VersionCheck from 'react-native-version-check';
import RNExitApp from 'react-native-exit-app';

class VersionCheckService {
  /**
   * Starting Point : Register FCM Container
   * */
  async init(onChecked) {
    // Check version.
    await this._checkVersion(onChecked);
  };

  /**
   * @Private
   * 버전 체크 : 현재버전, 빈드번호, 패키지, 스토어주소 등.
   * */
  async _checkVersion() {
    console.log(`========= ${Platform.OS} Version =========`);
    console.log(`::: 현재버전 : `, VersionCheck.getCurrentVersion());
    console.log(`::: 빌드번호 : `, VersionCheck.getCurrentBuildNumber());
    console.log(`::: 패키지 : `, VersionCheck.getPackageName());
    // TODO 스토어 주소 확인, 최신버전 확인
    // console.log(`::: ${Platform.OS} Store URL : `, Platform.OS === 'android' ? VersionCheck.getPlayStoreUrl() : VersionCheck.getAppStoreUrl());
    let isLatestVer = false;
    let latestVersion = await VersionCheck.getLatestVersion();
    if (Platform.OS === 'android') {
      let verStr = latestVersion.replace('.', '');
      isLatestVer = Number(verStr) > 0;
    } else {
      isLatestVer = !!latestVersion;
    }
    // 최신 버전이 존재 하는 경우만 체크.
    if (isLatestVer) {
      // 업데이트 확인
      VersionCheck.needUpdate({
        depth: 3,
      }).then(res => {
        // console.log(`::: 업데이트 유무-${Platform.OS} : `, res.isNeeded);  // false
        if (res.isNeeded) {
          Alert.alert('"UFLOW" 앱이 업데이트 되었습니다.', '최신 버전으로 업데이트 후\n 이용하시기 바랍니다.', [
            {
              text: '확인',
              onPress: () => {
                // TODO 확인 클릭 시 앱 강제 종료.(필요 시, 앱스토어 이동 가능.)
                RNExitApp.exitApp();
              },
            },
          ]);
        }
      }).catch(error => {
        alert(' VersionCheck: ' + error);
      });
    }
  };
}


export default new VersionCheckService();
