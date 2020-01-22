import 'isomorphic-fetch';

export class FetchService {
  static fetchData(data: any): any {
    return fetch(data.url, {
        method: data.type,
        cache: 'no-cache', //*default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', //include, same-origin, *omit
        headers: {
          'Content-Type': data.contentType,
          'X-CSRF-TOKEN': data.csrfToken,
          'Accept': data.acceptHeader,
          'X-Suppress-Redirect': true
        },
        body: data.body,
        signal: data.signal
      } as any)
      .then((response: any) => {
        return response;
      })
      .catch((err: any) => {
          return err;
      });
  }
}
