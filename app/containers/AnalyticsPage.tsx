import React, { useState } from 'react';
import CheckoutList from '../components/checkoutList/CheckoutList';
import CheckoutContent from '../components/checkoutContent/CheckoutContent';

const checkoutList = [
  { _id: 1, name: 'Chucky Doll', date: '01/01/2021', mode: 'browser safe', checkoutDelay: 500, color: 'N/A', size: 'N/A' },
  { _id: 2, name: 'Chucky Doll', date: '01/01/2021', mode: 'browser safe', checkoutDelay: 500, color: 'N/A', size: 'N/A' },
  { _id: 3, name: 'Chucky Doll', date: '01/01/2021', mode: 'browser safe', checkoutDelay: 500, color: 'N/A', size: 'N/A' },
  { _id: 4, name: 'Chucky Doll', date: '01/01/2021', mode: 'browser safe', checkoutDelay: 500, color: 'red', size: '8.5' }
];

const seasonList = [
  { _id: 1, season: 'ALL', totalSpent: 1123.45, totalCheckouts: 123, totalDeclines: 123, checkoutList: { "2020-01-01": 11, "2020-01-02": 6, "2020-02-02": 10, "2020-05-02": 16, "2020-05-05": 1 } },
  { _id: 2, season: 'FW2020', totalSpent: 123.50, totalCheckouts: 20, totalDeclines: 1, checkoutList: { "2020-01-01": 1, "2020-01-02": 16, "2020-02-02": 10, "2020-05-02": 36, "2020-05-05": 5 } },
  { _id: 3, season: 'SS2020', totalSpent: 22.45, totalCheckouts: 123, totalDeclines: 123, checkoutList: { "2020-01-01": 11, "2020-01-02": 6, "2020-02-02": 10, "2020-05-02": 16, "2020-05-05": 1 } },
  { _id: 4, season: 'FW2019', totalSpent: 2221.45, totalCheckouts: 321, totalDeclines: 12, checkoutList: { "2020-01-01": 22, "2020-01-02": 22, "2020-02-02": 5, "2020-05-02": 1, "2020-05-05": 12 } }
];

export default function AnalyticsPage() {
  const [ selectedId, setSelectedId ] = useState('');

  const handleSelect = async (id) => {
    if (selectedId === id) {
      setSelectedId('');
    } else {
      const data = checkoutList.find(d => d._id === id);

      if (data) {
        setSelectedId(id);
      }
    }
  }

  return (
    <div className="analytics-page">
      <CheckoutList
        checkoutList={checkoutList}
        onSelect={handleSelect}
        selectedId={selectedId}
      />
      <CheckoutContent
        seasonList={seasonList}
      />
    </div>
  );
}
