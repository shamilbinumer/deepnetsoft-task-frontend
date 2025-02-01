import React, { useState } from "react";
import axios from "axios";
import './AddMenuModal.scss';
import baseUrl from "../../../baseUrl";

interface AddMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, description: string) => void;
  onRefresh: () => void; // Add this line
}

const AddMenuModal: React.FC<AddMenuModalProps> = ({ isOpen, onClose, onSubmit, onRefresh  }) => {
  const [menuName, setMenuName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    // Basic validation
    if (!menuName.trim()) {
      setError("Menu name is required");
      return;
    }
    if (!description.trim()) {
      setError("Description is required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${baseUrl}/deepnetsoft/add-menu`, {
        menu_name: menuName.trim(),
        description: description.trim()
      });

      if (response.data.message=="Menu created successfully") {
        // First call onSubmit
        onSubmit(menuName, description);
        
        // Reset form
        setMenuName("");
        setDescription("");
           // Trigger refresh
           onRefresh();
        // Close the modal first
        onClose();
        
        // Show toast notification after modal is closed
        
      } else {
        setError(response.data.message || "Failed to add menu");
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Failed to add menu. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="AddModalMainWrapper">
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Add New Menu</h2>
          
          {error && <div className="error-message">{error}</div>}
          
          <input 
            id="menuName"
            type="text" 
            value={menuName} 
            onChange={(e) => {
              setMenuName(e.target.value);
              setError(null); // Clear error when user types
            }} 
            placeholder="Enter menu name" 
            disabled={loading}
          />
          <textarea 
            id="description"
            value={description} 
            onChange={(e) => {
              setDescription(e.target.value);
              setError(null); // Clear error when user types
            }} 
            placeholder="Enter menu description"
            disabled={loading}
          />
          <div className="modal-buttons">
            <button 
              onClick={onClose} 
              className="cancel-btn"
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit} 
              className="submit-btn"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Menu"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMenuModal;