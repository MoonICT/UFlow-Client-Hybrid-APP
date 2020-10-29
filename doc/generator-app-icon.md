# Set the app icon
Ref. [React-native-make](https://github.com/bamlab/react-native-make)
<br/>
``react-native set-icon --path path-to-image``
<br/>
⚠️ Requirements :

+ The path option is mandatory.
+ The image has to be square.
+ Don't use a transparent image. Not recommended on ios.
+ Minimum size of the image is 1024x1024.
+ It uses android adaptive icons, use guidelines : https://medium.com/google-design/designing-adaptive-icons-515af294c783
+ Format accepted : png and jpeg.
<br/>
For android, this command will generate the images in main directory : ``android/app/src/main/res.``

### Generate iOS icons
``react-native set-icon --platform ios --path path-to-image``
<br/>
⚠️ Requirements :

+ The path option is mandatory.
+ The image has to be square.
+ Don't use a transparent image. Not recommended on ios.
+ Minimum size of the image is 1024x1024.
+ Format accepted : png and jpeg.


### Generate Android icons
``+ react-native set-icon --platform android --path path-to-image``
<br/>
⚠️ Requirements :

+ The path option is mandatory.
+ The image has to be square.
+ Don't use a transparent image. Not recommended on ios.
+ Minimum size of the image is 1024x1024.
+ It uses android adaptive icons, use guidelines : https://medium.com/google-design/designing-adaptive-icons-515af294c783
+ Format accepted : png and jpeg.
<br/>
This command will generate the images in main directory : android/app/src/main/res.
<br/>
From Android 8.0, we use android's adaptive icons. With a transparent picture, you can chose the color of the background with :
<br/>
``react-native set-icon --platform android --path path-to-image --background color``
⚠️ by default, on android, the background of a transparent image is white
