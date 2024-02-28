import { ElNotification } from 'element-plus'
import type { NotificationOptions} from 'element-plus'
import type { TNotification } from '@/types/general.types'


export const setNotification: (message: string, type: TNotification ) => void = (
  message,
  type = 'error'
) => {
  const defaultNotificationOptions: Partial<NotificationOptions> = {
    title: '',
    position: 'top-right',
    customClass: '!z-[9999]',
    duration: 5000
  }

  ElNotification[type]({
    ...defaultNotificationOptions,
    message,
    title: 'Oops'
  })
}
