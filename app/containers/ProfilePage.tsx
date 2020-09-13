import React, { useState } from 'react';
import ProfileList from '../components/profileList/ProfileList';
import ProfileContent from '../components/profileContent/ProfileContent';

export default function ProfilePage() {
  const [ profiles, setProfiles ] = useState([
    { id: 1, name: 'Mike Visa', cardNum: '1234 1234 1234 1234' },
    { id: 2, name: 'Mike Visa', cardNum: '1234 1234 1234 1234' },
    { id: 3, name: 'Mike Visa', cardNum: '1234 1234 1234 1234' },
  ]);

  return (
    <div className="profile-page">
      <ProfileList profiles={profiles} />
      <ProfileContent />
    </div>
  );
}
