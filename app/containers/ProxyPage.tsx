/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState, useEffect } from 'react';
import ProxyList from '../components/proxyList/ProxyList';
import ProxyContent from '../components/proxyContent/ProxyContent';
import db from '../database/database';

export default function ProxyPage() {
  const [ proxies, setProxies ] = useState([]);
  const [ selectedId, setSelectedId ] = useState('');
  const [ selectedProxy, setSelectedProxy ] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const proxyData = await db.find('proxy', {});
      setProxies(proxyData);
    }
    
    fetchData();
  }, []);

  const handleSelect = async (id) => {
    const data = await db.findOne('proxy', { _id: id });

    if (data) {
      setSelectedId(id);
      setSelectedProxy(data);
    }
  }

  const handleAddProxy = async () => {
    const res = await db.insert('proxy', {});
    setProxies([ ...proxies, res ]);
    setSelectedId(res._id);
    setSelectedProxy({ ...res });
  }

  const handleRemoveProxy = (id) => {
    const index = proxies.findIndex(proxy => proxy._id === id);
    db.remove('proxy', { _id: id });
    setProxies([
      ...proxies.slice(0, index),
      ...proxies.slice(index + 1)
    ]);
    setSelectedProxy({});
  }

  // const handleClearAll = () => {
  //   db.remove('proxy', {}, { multi: true });
  //   setProxies([]);
  // }

  const handleSaveProxy = async (proxy) => {
    const { _id } = proxy;

    const res = db.update('proxy', { _id }, proxy, { returnUpdatedDocs: true });
    const newProxies = proxies.map((item, i) => {
      if (item._id !== _id) {
        // This isn't the item we care about - keep it as-is
        return item
      }
  
      // Otherwise, this is the one we want - return an updated value
      return {
        ...item,
        ...res
      }
    });

    setProxies(newProxies);
  }

  return (
    <div className="proxy-page">
      <ProxyList
        selectedId={selectedId}
        proxies={proxies}
        onSelect={handleSelect}
        onAddProxy={handleAddProxy}
        onRemoveProxy={handleRemoveProxy}
      />
      <ProxyContent
        selectedProxy={selectedProxy}
        onSaveProxy={handleSaveProxy}
      />
    </div>
  );
}
