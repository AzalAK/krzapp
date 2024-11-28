import { useState } from 'react';

interface EditEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentEmail?: string;
  onSave: (email: string) => void;
}

export function EditEmailModal({ isOpen, onClose, currentEmail, onSave }: EditEmailModalProps) {
  const [email, setEmail] = useState(currentEmail || '');

  const handleSave = () => {
    onSave(email);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Edit Email</h3>
          <button onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="modal-footer">
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}

