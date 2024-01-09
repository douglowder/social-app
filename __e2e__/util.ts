import {resolveConfig} from 'detox/internals'
import {execSync} from 'child_process'

const platform = device.getPlatform()

export async function openApp(opts: any) {
  opts = opts || {}
  const config = await resolveConfig()

  if (config.configurationName.split('.').includes('debug')) {
    return await openAppForDebugBuild(platform, opts)
  } else {
    return await device.launchApp({
      ...opts,
      newInstance: true,
    })
  }
}

export async function isVisible(id: string) {
  try {
    await expect(element(by.id(id))).toBeVisible()
    return true
  } catch (e) {
    return false
  }
}

async function openAppForDebugBuild(platform: string, opts: any) {
  const deepLinkUrl = // Local testing with packager
    /*process.env.EXPO_USE_UPDATES
    ? // Testing latest published EAS update for the test_debug channel
      getDeepLinkUrl(getLatestUpdateUrl())
    : */ getDeepLinkUrl(getDevLauncherPackagerUrl(platform))

  if (platform === 'ios') {
    await device.launchApp({
      ...opts,
      newInstance: true,
    })
    sleep(3000)
    await device.openURL({
      url: deepLinkUrl,
    })
  } else {
    await device.launchApp({
      ...opts,
      newInstance: true,
      url: deepLinkUrl,
    })
  }

  await sleep(3000)
}

const getDeepLinkUrl = (url: string) =>
  `expo+bluesky://expo-development-client/?url=${encodeURIComponent(url)}`

const getDevLauncherPackagerUrl = (platform: string) =>
  `http://localhost:8081/index.bundle?platform=${platform}&dev=true&minify=false&disableOnboarding=1`

export const sleep = (t: number) => new Promise(res => setTimeout(res, t))
