import { Dialog, DialogContent, DialogTitle, Input, Button } from '@material-tailwind/react';
import { useState } from 'react';

const MyDialog = ({ open, onClose, onSave }) => {
  const [username, setUsername] = useState('');

  const handleSave = () => {
    onSave(username);
    onClose();
  };

  return (
    <Dialog open={open} handler={onClose} className="w-full max-w-xs">
      <DialogTitle className="text-center">Update Username</DialogTitle>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-[#2f3136] text-black dark:text-gray-200">
        <div className="grid grid-cols-4 gap-4">
          <label htmlFor="username" className="col-span-1 text-black dark:text-white">
            Username:
          </label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="col-span-3 text-black dark:text-white bg-white dark:bg-gray-700"
            placeholder="Enter new username"
          />
        </div>
        <div className="flex justify-end mt-4 gap-2">
          <Button type="button" variant="secondary" onClick={onClose} className="bg-gray-200 text-black hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
            Cancel
          </Button>
          <Button type="button" onClick={handleSave} className="bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MyDialog;

