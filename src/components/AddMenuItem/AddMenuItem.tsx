import React, { useEffect, useState } from "react";
import '../AddMenuModal/AddMenuModal.scss';
import baseUrl from "../../../baseUrl";
import axios from "axios";
import { toast } from 'react-toastify';

interface AddMenuItemProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (itemName: string, parentMenu: string, description: string, price: string) => void;
  onRefresh?: () => void; // Add this for refreshing the menu items list
}

interface Menu {
  _id: string;
  menu_name: string;
  description: string;
}

const AddMenuItem: React.FC<AddMenuItemProps> = ({ isOpen, onClose, onSubmit, onRefresh }) => {
  const [itemName, setItemName] = useState('');
  const [parentMenu, setParentMenu] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get(`${baseUrl}/deepnetsoft/fetch-all-menu`);
        console.log('====================================');
        console.log(response.data.data);
        console.log('====================================');
        setMenus(response.data.data);
      } catch (err) {
        console.log("Failed to fetch menus");
      }
    };

    fetchMenus();
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!itemName.trim()) {
      setError("Item name is required");
      return;
    }
    if (!parentMenu) {
      setError("Please select a parent menu");
      return;
    }
    if (!description.trim()) {
      setError("Description is required");
      return;
    }
    if (!price.trim()) {
      setError("Price is required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${baseUrl}/deepnetsoft/add-menu-item`, {
        item_name: itemName.trim(),
        parent_menu: parentMenu,
        description: description.trim(),
        price: price.trim()
      });

      if (response.data.message === "Menu item added successfully") {
        // Call onSubmit with the new item details
        onSubmit(itemName, parentMenu, description, price);
        
        // Reset form
        setItemName('');
        setParentMenu('');
        setDescription('');
        setPrice('');
        
        // Refresh menu items list if refresh function is provided
        if (onRefresh) {
          onRefresh();
        }
        
        // Close modal
        onClose();
        
        // Show success message
        toast.success("Menu item added successfully!");
      } else {
        setError(response.data.message || "Failed to add menu item");
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Failed to add menu item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="AddModalMainWrapper">
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Add Menu Item</h2>
          
          {error && <div className="error-message">{error}</div>}

          <input
            type="text"
            id="itemName"
            value={itemName}
            onChange={(e) => {
              setItemName(e.target.value);
              setError(null);
            }}
            placeholder="Enter menu item name"
            disabled={loading}
            required
          />

          <select
            id="parentMenu"
            value={parentMenu}
            onChange={(e) => {
              setParentMenu(e.target.value);
              setError(null);
            }}
            disabled={loading}
            required
          >
            <option value="">Select Parent Menu</option>
            {menus.map((menu) => (
              <option key={menu._id} value={menu._id}>
                {menu.menu_name}
              </option>
            ))}
          </select>

          <textarea
            id="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setError(null);
            }}
            placeholder="Enter menu item description"
            disabled={loading}
            required
          />

          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              setError(null);
            }}
            placeholder="Enter price"
            disabled={loading}
            required
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
              {loading ? "Adding..." : "Add Menu Item"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMenuItem;