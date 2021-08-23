import { notification } from "antd";

export const NotifyHelper = {
  success: (message: string, title: string = 'Success') => {
    notification['success']({
      message: title,
      description: message,
    });
  },

  info: (message: string, title: string = 'Info') => {
    notification['info']({
      message: title,
      description: message,
    })
  },

  warning: (message: string, title: string = 'Warning') => {
    notification['warning']({
      message: title,
      description: message,
    })
  },

  error: (message: string, title: string = 'Error') => {
    notification['error']({
      message: title,
      description: message,
    });
  }
}