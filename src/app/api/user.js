import {request, authRequest} from './config';

const userApi = {
  login: (authToken) => request.post(`/api/v1/auth/code/google?code=${authToken}`),
};

export default userApi;