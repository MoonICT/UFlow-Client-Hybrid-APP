# Set the app splash screen
Ref. [React-native-make](https://github.com/bamlab/react-native-make)<br/>
Ref. [Set the app splash screen](https://github.com/bamlab/react-native-make/blob/master/docs/set-splash.md)

### Prerequisites
Install ``react-native-splash-screen``

In your JS application you need to hide the splashscreen like so :

```
import SplashScreen from 'react-native-splash-screen';
// Do stuff and hide the splash when you want
SplashScreen.hide();
```

### Image requirements
+ Use a .png to preserve background transparency
+ 3000px as min height and/or width
+ For cover splashscreens, preserve a 1/3 padding for important content to avoid clipping a Logo or Text

### Resize modes
We offer 3 types of Splashcreen image resize modes:

[--resize] options
+ (default)contain : Use max width / height without cropping, The image is centered	
+ cover : Use max width / height with cropping, The image is centered	
+ center : Use image width / height, The image is centered	

### Generate both splash screen
+ open your file ``myProject.xcworkspace`` in XCode
+ (Not has storyboard) right-click on your project folder > "New file..." > "Launch Screen" > "Save as: SplashScreen"<br/>
+ (Has storyboard) right-click on your project folder > "Add Files to 'Project Name''" > Select ``ios/SplashScreen.storyboard``<br/>
+ ``react-native set-splash --path <path-to-image> --resize <[contain]|cover|center> --background "<background-color>"``<br/>
⚠️ The path option is mandatory.
The background color defaults to white

### Generate iOS splashscreen
+ open your file ``myProject.xcworkspace`` in XCode
+ right-click on your project folder > "New file..." > "Launch Screen" > "Save as: SplashScreen"
+ ``react-native set-splash --platform ios --path <path-to-image>``

### Generate Android splashscreen
+ ``react-native set-splash --platform android --path <path-to-image> --resize <[contain]|cover|center> --background "<background-color>"``<br/>
+ ``react-native set-splash --platform android --path src/assets/images/splashLogo.png --resize center --background "#ff6d00"``<br/>
⚠️ The path option is mandatory.
