import api from './api';

export const updateProfile = async (data) => {
  return api.put('/api/users/update', data);
};

export const updatePassword = async (data) => {
  return api.put('/api/users/update-password', data);
};

export const uploadAvatar = async (file) => {
  const formData = new FormData();
  formData.append('avatar', file);
  return api.post('/api/users/upload-avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};