import { Link } from 'react-router-dom';
import { FaAngleRight, FaBars } from 'react-icons/fa';
import { useState } from 'react';
import './Navbar.scss';
import AddMenuModal from '../AddMenuModal/AddMenuModal';
import CreateMenuItemModal from '../AddMenuItem/AddMenuItem'; // Assuming CreateMenuItemModal is the modal component

interface NavbarProps {
  onMenuUpdate?: () => void;  // Optional prop to handle menu updates
}
const Navbar: React.FC<NavbarProps> = ({ onMenuUpdate }) => {
  const [isAddMenuModalOpen, setIsAddMenuModalOpen] = useState<boolean>(false);
  const [isCreateMenuItemModalOpen, setIsCreateMenuItemModalOpen] = useState<boolean>(false);

  // Function to open the Add Menu modal
  const openAddMenuModal = () => {
    setIsAddMenuModalOpen(true);
  };

  // Function to close the Add Menu modal
  const closeAddMenuModal = () => {
    setIsAddMenuModalOpen(false);
  };

  // Function to open the Create Menu Item modal
  const openCreateMenuItemModal = () => {
    setIsCreateMenuItemModalOpen(true);
  };

  // Function to close the Create Menu Item modal
  const closeCreateMenuItemModal = () => {
    setIsCreateMenuItemModalOpen(false);
  };

  // Function to handle submitting the menu creation
  const handleMenuSubmit = (name: string, description: string) => {
    console.log('New Menu Created:', name, description);
    if (onMenuUpdate) {
      onMenuUpdate();
    }
  };

  return (
    <div className="NavbarMainWrapper">
      <div className="desktopNavbarWrapper">
        <div className="desktop-navigation-bar">
          <div className="nav-logo">
            <div className="logo-container">
              <img src="/Images/Logo.png" alt="" />
              <div>
                <h6>
                  <span>DEEP</span> NET
                </h6>
                <h6 className="soft">SOFT</h6>
              </div>
            </div>
          </div>
          <div className="nav-items">
            <div className="nav-links">
              <div><Link to='/'>HOME</Link></div>
              <div><Link to='/' className='active-nav'>MENU</Link></div>
              <div><Link to='/'>MAKE A RESERVATION</Link></div>
              <div><Link to='/'>CONTACT US</Link></div>
              <div><Link to="#" onClick={openAddMenuModal}>CREATE MENU</Link></div>
              <div><Link to="#" onClick={openCreateMenuItemModal}>CREATE MENU ITEM</Link></div> {/* Updated link to open Create Menu Item Modal */}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddMenuModal
        isOpen={isAddMenuModalOpen}
        onClose={closeAddMenuModal}
        onSubmit={handleMenuSubmit}
        onRefresh={() => {
          if (onMenuUpdate) {
            onMenuUpdate();
          }
        }}
      />

      <CreateMenuItemModal
        isOpen={isCreateMenuItemModalOpen}
        onClose={closeCreateMenuItemModal}
        onSubmit={(itemName, parentMenu, description, price) => {
          console.log("New Menu Item:", { itemName, parentMenu, description, price });
        }}
        onRefresh={onMenuUpdate}
      />


      <div className="mobileNvigationMainWrapper">
        <div className="mobile-navigation-bar">
          <div className="nav-logo">
            <img src="/Images/Logo.png" alt="" />
          </div>
          <FaBars className='burger-bar-icon' data-bs-toggle="offcanvas" href="#Navigation" role="button" aria-controls="offcanvasExample" />
        </div>
        <div className="offcanvas offcanvas-end" id="Navigation" aria-labelledby="offcanvasExampleLabel">
          <div className="offcanvas-header">
            <div className="close-btn-container" data-bs-dismiss="offcanvas" aria-label="Close">
              <FaAngleRight className='close-btn' />
            </div>
          </div>
          <div className="offcanvas-body">
            <div className="nav-links">
              <div data-bs-dismiss="offcanvas" aria-label="Close"><Link to='/'>HOME</Link></div>
              <div data-bs-dismiss="offcanvas" aria-label="Close"><Link to='/' className='active-nav'>MENU</Link></div>
              <div data-bs-dismiss="offcanvas" aria-label="Close"><Link to='/'>MAKE A RESERVATION</Link></div>
              <div data-bs-dismiss="offcanvas" aria-label="Close"><Link to='/'>CONTACT US</Link></div>
              <div data-bs-dismiss="offcanvas" aria-label="Close"><Link to="#" onClick={openAddMenuModal}>CREATE MENU</Link></div> {/* Open Add Menu modal on click */}
              <div data-bs-dismiss="offcanvas" aria-label="Close"><Link to="#" onClick={openCreateMenuItemModal}>CREATE MENU ITEM</Link></div> {/* Open Create Menu Item modal on click */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
