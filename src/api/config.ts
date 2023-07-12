/** the function return headers with authorization
 *
 * @param credentials is an access_token
 *
 *
 */
export const authorization = (credentials: string) => {
  return {
    headers: {
      Authorization: 'Bearer ' + credentials,
    },
  };
};
