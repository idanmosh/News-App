import { config } from '../Config';
import { DEFAULT_WIDTH, SCREEN_WIDTH } from '../Constants';

// calculating the ration between users screen and supported zeplin sizes
export const calcSize = (size: number) => {
  if (size % 0.5 !== 0) {
    console.warn(
      `calcSize get number which is not integer: '${size}' Check the value for double usage!`,
    );
  }

  return (SCREEN_WIDTH / DEFAULT_WIDTH) * size;
};

export const urlBuilder = (params?: string) => {
  return `${config.BASE_URL}?access_key=${config.API_KEY}${params || ''}`;
};

export const extractIndexToString: (_: any, index: number) => string = (
  _,
  index,
) => index.toString();
