import langVN from './vi-VN'
import langEN from './en-US'

type Messages = {
  [key: string]: {
    [key: string]: string; 
  };
};

const messages: Messages = {
  "vi-VN": langVN,
  "en-US": langEN,
};

export default messages;