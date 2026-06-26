import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { updateProfile, changePassword, deleteProfile } from '../services/authService';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const ProfilePage = () => {
  const { user, token, setUser, logout, showToast } = useAuth();
  const [profile, setProfile] = useState({ name: '', linkedIn: '', github: '', portfolio: '' });
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) setProfile({ name: user.name || '', linkedIn: user.linkedIn || '', github: user.github || '', portfolio: user.portfolio || '' });
  }, [user]);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    try {
      const updated = await updateProfile(token, profile);
      setUser(updated);
      localStorage.setItem('ai-resume-user', JSON.stringify(updated));
      showToast('Profile updated successfully.');
    } catch (err) {
      setError(err.response?.data?.error || 'Unable to update profile.');
      showToast('Update failed.', 'error');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      await changePassword(token, passwordData);
      showToast('Password updated successfully.');
      setPasswordData({ currentPassword: '', newPassword: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'Unable to change password.');
      showToast('Update failed.', 'error');
    }
  };

  const handleDelete = async () => {
    await deleteProfile(token);
    logout();
    showToast('Account deleted permanently.');
    navigate('/');
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
          <h2 className="text-2xl font-semibold text-slate-900">Profile settings</h2>
          <form onSubmit={handleProfileSave} className="mt-6 space-y-5">
            <Input label="Full Name" id="name" name="name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} required />
            <Input label="LinkedIn URL" id="linkedIn" name="linkedIn" value={profile.linkedIn} onChange={(e) => setProfile({ ...profile, linkedIn: e.target.value })} />
            <Input label="GitHub URL" id="github" name="github" value={profile.github} onChange={(e) => setProfile({ ...profile, github: e.target.value })} />
            <Input label="Portfolio URL" id="portfolio" name="portfolio" value={profile.portfolio} onChange={(e) => setProfile({ ...profile, portfolio: e.target.value })} />
            <Button type="submit">Save profile</Button>
          </form>
          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
          <h2 className="text-2xl font-semibold text-slate-900">Security</h2>
          <form onSubmit={handlePasswordChange} className="mt-6 space-y-5">
            <Input label="Current Password" id="currentPassword" name="currentPassword" type="password" value={passwordData.currentPassword} onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })} required />
            <Input label="New Password" id="newPassword" name="newPassword" type="password" value={passwordData.newPassword} onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} required />
            <Button type="submit">Change password</Button>
          </form>
          <div className="mt-8 rounded-3xl border border-red-100 bg-red-50 p-6">
            <h3 className="text-lg font-semibold text-red-700">Delete account</h3>
            <p className="mt-2 text-sm text-red-700">This action is permanent. All data will be removed.</p>
            <button onClick={handleDelete} className="mt-4 rounded-full border border-red-300 bg-white px-5 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100">Delete account</button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;
