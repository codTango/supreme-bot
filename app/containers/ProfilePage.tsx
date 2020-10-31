/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState, useEffect } from 'react';
import ProfileList from '../components/profileList/ProfileList';
import ProfileContent from '../components/profileContent/ProfileContent';
import ConfirmModal from '../components/confirmModal/ConfirmModal';
import db from '../database/database';

export default function ProfilePage() {
  const [ profiles, setProfiles ] = useState([]);
  const [ profileGroups, setProfileGroups ] = useState([]);
  const [ selectedId, setSelectedId ] = useState('');
  const [ selectedProfile, setSelectedProfile ] = useState({});

  const [ confirmModalOpen, setConfirmModalOpen ] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const profilesData = await db.find('profiles', {});
      const profileGroupData = await db.find('profileGroups', {});
      setProfiles(profilesData);
      setProfileGroups(profileGroupData);
    }
    
    fetchData();
  }, []);

  const handleAddProfile = async () => {
    const profile = { type: 'profile', name: '', cardNum: '', region: '', firstName: '', lastName: '', address1: '', address2: '', address3: '', city: '', state: '', zip: '', country: '', cardType: '', cardHolder: '', expMonth: '', expYear: '', cvv: '' };
    const res = await db.insert('profiles', profile);
    setProfiles([ ...profiles, res ]);
    setSelectedId(res._id);
    setSelectedProfile({ ...res });
  }

  const handleAddProfileGroup = async () => {
    const profileGroup = { type: 'profileGroup', name: '', profiles: [] };
    if (profileGroups.length < 3) {
      const res = await db.insert('profileGroups', profileGroup);
      setProfileGroups([ ...profileGroups, res ]);
      setSelectedId(res._id);
      setSelectedProfile({ ...res });
    }
  }

  const handleRemoveProfile = (id) => {
    const index = profiles.findIndex(profile => profile._id === id);
    db.remove('profiles', { _id: id });
    setProfiles([
      ...profiles.slice(0, index),
      ...profiles.slice(index + 1)
    ]);
    setSelectedProfile({});
  }

  const handleRemoveProfileGroup = (id) => {
    const index = profileGroups.findIndex(group => group._id === id);
    db.remove('profileGroups', { _id: id });
    setProfileGroups([
      ...profileGroups.slice(0, index),
      ...profileGroups.slice(index + 1)
    ]);
    setSelectedProfile({});
  }

  const clearAll = () => {
    db.remove('profiles', {}, { multi: true });
    db.remove('profileGroups', {}, { multi: true });
    setProfiles([]);
    setProfileGroups([]);
  }

  const handleClearAll = () => {
    setConfirmModalOpen(true);
  };

  const handleConfirmationClose = (clear = false) => {
    setConfirmModalOpen(false);
    if (typeof clear === 'boolean' && clear) {
      clearAll();
    }
  };

  const handleSelect = async (id, isGroup = false) => {
    let data = null;
    if (isGroup) {
      data = await db.findOne('profileGroups', { _id: id });
    } else {
      data = await db.findOne('profiles', { _id: id });
    }

    if (data) {
      setSelectedId(id);
      setSelectedProfile(data);
    }
  }

  const handleSaveProfile = async (profile, isGroup = false) => {
    const { _id } = profile;

    if (isGroup) {
      const res = db.update('profileGroups', { _id }, profile, { returnUpdatedDocs: true });
      const newProfileGroups = profileGroups.map((item, i) => {
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
      setProfileGroups(newProfileGroups);
    } else {
      const res = db.update('profiles', { _id }, profile, { returnUpdatedDocs: true });
      const newProfiles = profiles.map((item, i) => {
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
      setProfiles(newProfiles);
    }
  }

  return (
    <div className="profile-page">
      <ProfileList
        profiles={profiles}
        profileGroup={profileGroups}
        onAddProfile={handleAddProfile}
        onAddProfileGroup={handleAddProfileGroup}
        onRemoveProfile={handleRemoveProfile}
        onRemoveProfileGroup={handleRemoveProfileGroup}
        onClearAll={handleClearAll}
        onSelect={handleSelect}
        selectedId={selectedId}
      />
      <ProfileContent
        profileList={profiles}
        profileInfo={selectedProfile}
        onSaveProfile={handleSaveProfile}
        onRemoveProfile={handleRemoveProfile}
        onRemoveProfileGroup={handleRemoveProfileGroup}
      />
      <ConfirmModal
        modalOpen={confirmModalOpen}
        title={'Are you sure?'}
        content={'You\'ll lose all the profile and profile group content!'}
        onModalClose={handleConfirmationClose}
      />
    </div>
  );
}
