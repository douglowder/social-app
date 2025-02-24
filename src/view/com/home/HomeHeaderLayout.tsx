import {isNativeTablet} from '#/platform/detection'
import {HomeHeaderLayout as HomeHeaderLayoutWeb} from './HomeHeaderLayout.web'
import {HomeHeaderLayoutMobile} from './HomeHeaderLayoutMobile'

export const HomeHeaderLayout = isNativeTablet
  ? HomeHeaderLayoutWeb
  : HomeHeaderLayoutMobile
