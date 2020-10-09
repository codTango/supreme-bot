import React, { useState } from 'react';
import CheckoutList from '../components/checkoutList/CheckoutList';
import CheckoutContent from '../components/checkoutContent/CheckoutContent';

const fakeList = [
  { _id: 1, name: 'Chucky Doll', date: '01/01/2021', mode: 'browser safe', checkoutDelay: 500, color: 'N/A', side: 'N/A', totalSpent: 1123.45, totalCheckouts: 123, totalDeclines: 123, checkoutList: { "2020-01-01": 11, "2020-01-02": 6, "2020-02-02": 10, "2020-05-02": 16, "2020-05-05": 1 } },
  { _id: 2, name: 'Chucky Doll', date: '01/01/2021', mode: 'browser safe', checkoutDelay: 500, color: 'N/A', side: 'N/A', totalSpent: 123.50, totalCheckouts: 20, totalDeclines: 1, checkoutList: { "2020-01-01": 1, "2020-01-02": 16, "2020-02-02": 10, "2020-05-02": 36, "2020-05-05": 5 } },
  { _id: 3, name: 'Chucky Doll', date: '01/01/2021', mode: 'browser safe', checkoutDelay: 500, color: 'N/A', side: 'N/A', totalSpent: 22.45, totalCheckouts: 123, totalDeclines: 123, checkoutList: { "2020-01-01": 11, "2020-01-02": 6, "2020-02-02": 10, "2020-05-02": 16, "2020-05-05": 1 } },
  { _id: 4, name: 'Chucky Doll', date: '01/01/2021', mode: 'browser safe', checkoutDelay: 500, color: 'N/A', side: 'N/A', totalSpent: 2221.45, totalCheckouts: 321, totalDeclines: 12, checkoutList: { "2020-01-01": 22, "2020-01-02": 22, "2020-02-02": 5, "2020-05-02": 1, "2020-05-05": 12 } }
];

export default function AnalyticsPage() {
  const [ selectedId, setSelectedId ] = useState('');
  const [ selectedCheckout, setSelectedCheckout ] = useState({});

  const handleSelect = async (id) => {
    // const data = await db.findOne('profiles', { _id: id });
    const data = fakeList.find(d => d._id === id);

    if (data) {
      setSelectedId(id);
      setSelectedCheckout(data);
    }
  }

  return (
    <div className="analytics-page">
      <CheckoutList
        checkoutList={fakeList}
        onSelect={handleSelect}
        selectedId={selectedId}
      />
      <CheckoutContent
        selectedCheckout={selectedCheckout}
      />
    </div>
  );
}
