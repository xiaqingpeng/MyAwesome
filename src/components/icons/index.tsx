/**
 * 图标组件统一导出
 * 
 * 使用方式：
 * import { HomeIcon, ProfileIcon } from '@/components/icons';
 * 或
 * import * as Icons from '@/components/icons';
 */

// 通用图标
export {
  HomeIcon,
  ProfileIcon,
  SettingsIcon,
  NotificationIcon,
  HelpIcon,
  InfoIcon,
  DrawerIcon,
  LogoutIcon,
  type IconProps as CommonIconProps,
} from './CommonIcons';

// 网络相关图标
export {
  UsersIcon,
  ArticleIcon,
  CommentIcon,
  TodoIcon,
  SendIcon,
  RefreshIcon,
  CancelIcon,
  TrashIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  InfoCircleIcon,
  FileIcon,
  type IconProps as NetworkIconProps,
} from './NetworkIcons';

// 通知相关图标
export {
  BellIcon,
  HeartIcon,
  MessageIcon,
  UserIcon,
  DownloadIcon,
  type IconProps as NotificationIconProps,
} from './NotificationIcons';

// 统一的 IconProps 类型
export type { IconProps } from './CommonIcons';
