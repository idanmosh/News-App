import axios, { AxiosRequestConfig } from 'axios';
import { urlBuilder } from '../Utils';

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

export const performRequest = async ({
  url,
  baseURL,
  method = 'GET',
  ...rest
}: AxiosRequestConfig) => {
  try {
    const res = await axiosInstance({
      url,
      baseURL,
      method,
      ...rest,
    });
  } catch (error) {
    throw error;
  }
};
