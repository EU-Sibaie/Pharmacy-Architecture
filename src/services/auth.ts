import { axiosApi } from './axios/axios-api';

export async function setupPassword(data: any) {
  return await axiosApi({
    endpoint: `/api/auth/set-password`,
    method: 'POST',
    bodyData: data,
  });
}

export async function forgetPassword(data: any) {
  return await axiosApi({
    endpoint: `/api/auth/forget-password`,
    method: 'POST',
    bodyData: data,
  });
}

export async function resetPassword(data: any) {
  return await axiosApi({
    endpoint: `/api/auth/reset-password`,
    method: 'POST',
    bodyData: data,
  });
}
