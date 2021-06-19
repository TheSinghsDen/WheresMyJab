import requests
from re import findall
from random import randint


class ProxyRequests:
    def __init__(self, url, payload):
        self.sockets = []
        self.url = url
        self.payload = payload
        self.timeout = 3.0,
        self.errs = [
            'ConnectTimeout',
            'ProxyError',
            'SSLError',
            'ReadTimeout',
            'ConnectionError',
            'ConnectTimeoutError'
        ]
        self.empty_warn = 'Proxy Pool has been emptied'
        self._acquire_sockets()

    def _acquire_sockets(self):
        r = requests.get('https://www.sslproxies.org/')
        matches = findall(
            r"<td>\d+\.\d+\.\d+\.\d+</td><td>\d+</td><td>IN</td>", r.text)
        revised = [m.replace('<td>', '') for m in matches]
        self.sockets = [
            s[:-5].replace('</td>', ':').split(':IN')[0] for s in revised]

    def _set_request_data(self, req, socket):
        self.rdata['request'] = req.text
        self.rdata['headers'] = req.headers
        self.rdata['status_code'] = req.status_code
        self.rdata['url'] = req.url
        self.rdata['content'] = req.content
        self.rdata['proxy'] = socket
        try:
            self.rdata['json'] = req.json()
        except Exception as err:
            self.rdata['json'] = {type(err).__name__: str(err)}

    def _rand_sock(self):
        return randint(0, len(self.sockets) - 1)

    def _is_err(self, err):
        if type(err).__name__ not in self.errs:
            raise err

    def _limit_succeeded(self):
        raise Exception(self.empty_warn)

    def get(self):
        if len(self.sockets) > 0:
            current_socket = self.sockets.pop(self._rand_sock())
            proxies = {
                'http': 'http://' + current_socket,
                'https': 'https://' + current_socket
            }
            try:
                request = requests.get(
                    self.url,
                    timeout=2.0,
                    params=self.payload,
                    proxies=proxies)
                self._set_request_data(request, current_socket)
            except Exception as e:
                self._is_err(e)
                self.get()
        else:
            self._limit_succeeded()
