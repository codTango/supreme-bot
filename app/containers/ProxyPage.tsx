import React, { useState } from 'react';
import ProxyList from '../components/proxyList/ProxyList';
import ProxyContent from '../components/proxyContent/ProxyContent';

const fakeData = [
  { id: 1, name: 'Mike Proxies A', proxyList: ['127.1.1.1', '127.1.1.2', '127.1.1.3'], createdAt: '2020-09-13T23:19:05.028Z' },
  { id: 2, name: 'Mike Proxies B', proxyList: ['127.1.1.1', '127.1.1.2', '127.1.1.3'], createdAt: '2020-09-13T23:19:05.028Z' },
  { id: 3, name: 'Mike Proxies C', proxyList: [], createdAt: '2020-09-13T23:19:05.028Z' },
];

export default function ProxyPage() {
  const [ proxies, setProxies ] = useState(fakeData);

  const [ selectedProxy, setSelectedProxy ] = useState({ id: 1, name: 'Mike Proxies A', proxyList: ['127.1.1.1', '127.1.1.2', '127.1.1.3'], createdAt: '2020-09-13T23:19:05.028Z' });

  return (
    <div className="proxy-page">
      <ProxyList proxies={proxies} />
      <ProxyContent proxy={selectedProxy} />
    </div>
  );
}
