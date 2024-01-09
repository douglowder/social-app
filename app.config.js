const pkg = require('./package.json')

module.exports = function () {
  /**
   * App version number. Should be incremented as part of a release cycle.
   */
  const VERSION = pkg.version

  /**
   * iOS build number. Must be incremented for each TestFlight version.
   */
  const IOS_BUILD_NUMBER = '1'

  /**
   * Android build number. Must be incremented for each release.
   */
  const ANDROID_VERSION_CODE = 54

  /**
   * Uses built-in Expo env vars
   *
   * @see https://docs.expo.dev/build-reference/variables/#built-in-environment-variables
   */
  const PLATFORM = process.env.EAS_BUILD_PLATFORM

  /**
   * Additional granularity for the `dist` field
   */
  const DIST_BUILD_NUMBER =
    PLATFORM === 'android' ? ANDROID_VERSION_CODE : IOS_BUILD_NUMBER

  return {
    expo: {
      version: VERSION,
      name: 'Bluesky',
      slug: 'bluesky',
      scheme: 'bluesky',
      owner: 'blueskysocial',
      runtimeVersion: {
        policy: 'appVersion',
      },
      orientation: 'portrait',
      icon: './assets/icon.png',
      userInterfaceStyle: 'automatic',
      splash: {
        image: './assets/splash.png',
        resizeMode: 'cover',
        backgroundColor: '#ffffff',
      },
      ios: {
        buildNumber: IOS_BUILD_NUMBER,
        supportsTablet: false,
        bundleIdentifier: 'xyz.blueskyweb.app',
        config: {
          usesNonExemptEncryption: false,
        },
        infoPlist: {
          UIBackgroundModes: ['remote-notification'],
          NSCameraUsageDescription:
            'Used for profile pictures, posts, and other kinds of content.',
          NSMicrophoneUsageDescription:
            'Used for posts and other kinds of content.',
          NSPhotoLibraryAddUsageDescription:
            'Used to save images to your library.',
          NSPhotoLibraryUsageDescription:
            'Used for profile pictures, posts, and other kinds of content',
        },
        associatedDomains: ['applinks:bsky.app', 'applinks:staging.bsky.app'],
      },
      androidStatusBar: {
        barStyle: 'dark-content',
        backgroundColor: '#ffffff',
      },
      android: {
        versionCode: ANDROID_VERSION_CODE,
        icon: './assets/icon.png',
        adaptiveIcon: {
          foregroundImage: './assets/icon-android-foreground.png',
          monochromeImage: './assets/icon-android-foreground.png',
          backgroundImage: './assets/icon-android-background.png',
          backgroundColor: '#1185FE',
        },
        googleServicesFile: './google-services.json',
        package: 'xyz.blueskyweb.app',
        intentFilters: [
          {
            action: 'VIEW',
            autoVerify: true,
            data: [
              {
                scheme: 'https',
                host: 'bsky.app',
              },
            ],
            category: ['BROWSABLE', 'DEFAULT'],
          },
        ],
      },
      updates: {
        enabled: true,
        fallbackToCacheTimeout: 1000,
        url: 'https://u.expo.dev/55bd077a-d905-4184-9c7f-94789ba0f302',
      },
      plugins: [
        [
          'expo-build-properties',
          {
            ios: {
              deploymentTarget: '13.4',
            },
            android: {
              compileSdkVersion: 34,
              targetSdkVersion: 34,
              buildToolsVersion: '34.0.0',
              kotlinVersion: '1.8.0',
            },
          },
        ],
        [
          'expo-updates',
          {
            username: 'blueskysocial',
          },
        ]
      ],
      extra: {
        eas: {
          projectId: '55bd077a-d905-4184-9c7f-94789ba0f302',
        },
      },
    },
  }
}
