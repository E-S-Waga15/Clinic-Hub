import React, { useState, useRef, useEffect } from 'react';
import './AvatarModal.css';
import { FiSettings } from 'react-icons/fi';
import { MdLanguage } from 'react-icons/md';
import { BsPalette } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../store/slices/logOutSlice';
const AvatarModal = ({ user }) => {
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);

  // إغلاق المودال عند الضغط خارجها
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      window.location.reload(); // إعادة تحميل الصفحة بعد تسجيل الخروج
    } catch (error) {
      alert('Logout failed: ' + error);
    }
  };
  return (
    <div className="avatar-modal-wrapper">
      <div className="avatar-circle" onClick={() => setOpen(!open)}>
        {/* لاحقاً ضع صورة المستخدم هنا */}
        <span className="avatar-initial">{user?.name?.[0] || 'U'}</span>
      </div>
      {open && (
        <div className="avatar-modal" ref={modalRef}>
          <div className="avatar-modal-header">
            <div className="avatar-circle avatar-modal-avatar">
              <span className="avatar-initial">{user?.name?.[0] || 'U'}</span>
            </div>
            <div className="avatar-modal-username">{user?.name || 'User'}</div>
          </div>
          <ul className="avatar-modal-list">
            <li><button className="avatar-modal-btn"><FiSettings className="avatar-modal-icon" /> Settings</button></li>
            <li><button className="avatar-modal-btn"><MdLanguage className="avatar-modal-icon" /> Language</button></li>
            <li><button className="avatar-modal-btn"><BsPalette className="avatar-modal-icon" /> Theme</button></li>
            <li><button className="avatar-modal-btn logout" onClick={handleLogout}><FiLogOut className="avatar-modal-icon" /> Logout</button></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AvatarModal;
