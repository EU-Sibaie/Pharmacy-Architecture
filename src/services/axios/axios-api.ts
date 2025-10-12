import axiosInstance from './axios-instance';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface AxiosApiParams {
  endpoint: string;
  method?: Method;
  bodyData?: any;
  contentType?: string | null;
}

// export async function axiosApi({
//   endpoint,
//   method = 'GET',
//   bodyData,
//   contentType = 'application/json',
// }: AxiosApiParams) {
//   const config: any = {
//     url: endpoint,
//     method,
//   };

//   if (['POST', 'PUT', 'PATCH'].includes(method)) {
//     config.data = bodyData;
//   }

//   if (contentType) {
//     config.headers = {
//       'Content-Type': contentType,
//     };
//   }

//   try {
//     const result = await axiosInstance.request(config);
//     const { data, ...response } = result;
//     return { data, response };
//   } catch (error: any) {
//     throw error;
//   }
// }

export async function axiosApi({
  endpoint,
  method = 'GET',
  bodyData,
  contentType = 'application/json',
}: AxiosApiParams) {
  const config: any = {
    url: endpoint,
    method,
  };

  const token = localStorage.getItem('token');
  if (['POST', 'PUT', 'PATCH'].includes(method)) {
    config.data = bodyData;
  }

  if (contentType) {
    config.headers = {
      'Content-Type': contentType,
      Authorization: `Bearer ${token}`,
    };
  }

  const result = await axiosInstance.request(config);
  const { data, ...response } = result;
  return { data, response };
}
