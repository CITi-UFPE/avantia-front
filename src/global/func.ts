import axios from 'axios';
import { useCallback } from 'react';

const api = axios.create({
  baseURL: 'https://avantia-dev.herokuapp.com',
});

function useAxios(...methods: ('get' | 'post' | 'put' | 'delete')[]) {
  if (methods.length === 0) throw new TypeError('Methods array is empty, add an method to `useAxios` parameters');

  // const [, setError] = useContext(ErrorContext);

  const functions = methods.map((method) => {
    if (!['get', 'post', 'put', 'delete'].includes(method)) {
      throw new TypeError(`Invalid method (${method})`);
    }

    return async ({
      url: relativeUrl = '/',
      body = {},
      setState = () => { },
      process = (data: any) => data,
      success = () => { },
      error = () => { },
    }: {
      url: String;
      body?: Object;
      setState?: Function;
      process?: Function;
      success?: Function;
      error?: Function;
    }) => {
      try {
        const match = document.cookie.match(/(^| )token=([^;]+)/);
        const token = match ? match[2] : null;
        const headers = { authorization: `Bearer ${token}` };

        const config = {
          headers,
          withCredentials: true,
        };

        const methodsArguments = {
          get: [config],
          post: [body, config],
          put: [body, config],
          delete: [{ ...config, data: body }],
        };
        // @ts-ignore
        const res = await api[method](relativeUrl, ...methodsArguments[method]);

        if (method === 'get') {
          if (setState) {
            setState(await process(res.data.data));
          } else {
            process(res.data.data);
          }
        }

        await success(res, body);
        return res;
      } catch (err) {
        console.log(err.response);
        await error(err);
        return err;
      }
    };
  });

  const first = useCallback(functions[0], []);
  const second = useCallback(functions[1], []);
  const third = useCallback(functions[2], []);
  const fourth = useCallback(functions[3], []);

  return [
    ...(first ? [first] : []),
    ...(second ? [second] : []),
    ...(third ? [third] : []),
    ...(fourth ? [fourth] : []),
  ];
}

export {
  useAxios,
};
