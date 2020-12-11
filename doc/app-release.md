# Release App
**Version : v1.0 (2020.08.011)**

#### Android
1. release keystore 생성.
``keytool -genkey -v -keystore release.keystore -alias release_key -keyalg RSA -keysize 2048 -validity 36500``

2. 아래 명령어 실행 후,<br/>
``android/app/build/outputs/apk/release/app-release.apk``경로에 apk 파일 생성됨.
**참고**트<br/>
[안드로이드 빌드 및 테스](https://dev-yakuza.github.io/ko/react-native/android-running-on-device/)
``` bash
$ cd android
// If build error
$ ./gradlew clean
// Apk build
$ ./gradlew assembleRelease
// Device Test 
$ react-native run-android --variant=release
// apk path
// android/app/build/outputs/apk/release/app-release.apk
```

### iOS
**참고**트<br/>
[iOS 빌드 및 테스](**참고**트<br/>
[안드로이드 빌드 및 테스](https://dev-yakuza.github.io/ko/react-native/android-running-on-device/))
