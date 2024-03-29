/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { ipcRenderer } from 'electron';
import ProfileList from '../components/profileList/ProfileList';
import ProfileContent from '../components/profileContent/ProfileContent';
import ConfirmModal from '../components/confirmModal/ConfirmModal';
import { NotificationContext } from '../components/notification/Notification';
import db from '../database/database';

export default function ProfilePage() {
  const [ profiles, setProfiles ] = useState([]);
  const [ profileGroups, setProfileGroups ] = useState([]);
  const [ selectedId, setSelectedId ] = useState([]);
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
    setSelectedId([ res._id ]);
    setSelectedProfile({ ...res });
  }

  const handleAddProfileGroup = async () => {
    const profileGroup = { type: 'profileGroup', name: '', profiles: [] };
    if (profileGroups.length < 3) {
      const res = await db.insert('profileGroups', profileGroup);
      setProfileGroups([ ...profileGroups, res ]);
      setSelectedId([ res._id ]);
      setSelectedProfile({ ...res });
    }
  }

  const handleDuplicateProfile = async (id) => {
    const selectedProfiles = profiles.filter(p => id.indexOf(p._id) > -1);
    const duplicate = selectedProfiles.map(p => {
      const { _id, ...dup } = p;
      dup.name = `${dup.name} (copy)`;
      return dup;
    });

    const res = await db.insert('profiles', duplicate);
    setProfiles([ ...profiles, ...res ]);
    setSelectedProfile({});
  }

  const handleRemoveProfile = async (id) => {
    const result = await db.remove('profiles', { _id: { $in: id } }, { multi: true });
    const remainingProfiles = await db.find('profiles', {});
    setProfiles(remainingProfiles);
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

  const handleSelect = async (event, id, isGroup = false) => {
    let data = null;

    if (event.ctrlKey || event.metaKey) {
      const ids = [ ...selectedId, id ];
      setSelectedId(ids);
    } else {
      if (isGroup) {
        data = await db.findOne('profileGroups', { _id: id });
      } else {
        data = await db.findOne('profiles', { _id: id });
      }
  
      if (data) {
        setSelectedId([ id ]);
        setSelectedProfile(data);
      }
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

  const handleImportProfile = async (setNotification) => {
    const content = ipcRenderer.sendSync('import-profile');

    try {
      if (content) {
        const importContent = JSON.parse(content);
        const profile = [];
  
        if (Array.isArray(importContent)) {
          importContent.forEach(p => {
            delete p._id;
            if (p.type === 'profile') {
              profile.push(p);
            }
          });
        } else {
          delete importContent._id;
          profile.push(importContent);
        }
  
  
        const profileRes = await db.insert('profiles', profile);
        if (profileRes) {
          if (Array.isArray(profileRes)) {
            setProfiles([ ...profiles, ...profileRes ]);
          } else {
            setProfiles([ ...profiles, profileRes ]);
          }
        }
      }
    } catch (error) {
      setNotification({ id: uuid(), mainText: 'Error', secondaryText: error });
    }

  }

  const handleExportProfile = async () => {
    const profilesData = await db.find('profiles', {});
    // const profileGroupData = await db.find('profileGroups', {});
    // const content = profilesData.concat(profileGroupData);

    ipcRenderer.sendSync('export-profile', JSON.stringify(profilesData));
  }

  return (
    <NotificationContext.Consumer>
      {({setNotification}) => (
        <div className="profile-page">
          <ProfileList
            profiles={profiles}
            profileGroup={profileGroups}
            onAddProfile={handleAddProfile}
            onAddProfileGroup={handleAddProfileGroup}
            onDuplicateProfile={handleDuplicateProfile}
            onRemoveProfile={handleRemoveProfile}
            onRemoveProfileGroup={handleRemoveProfileGroup}
            onClearAll={handleClearAll}
            onSelect={handleSelect}
            selectedId={selectedId}
            onImport={() => { handleImportProfile(setNotification); }}
            onExport={handleExportProfile}
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
      )}
    </NotificationContext.Consumer>
  );
}
