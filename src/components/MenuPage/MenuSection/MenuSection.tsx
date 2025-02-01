import { useEffect, useState } from 'react';
import axios from 'axios';
import './MenuSection.scss';
import leftImage from '/Images/menu-items-left-image.png';
import rightImage from '/Images/menu-item-right-image.png';
import cocktailImage from '/Images/juice1.png';
import juiceImage from '/Images/cocktail.png';
import baseUrl from '../../../../baseUrl';

interface MenuItem {
  _id: string;
  item_name: string;
  description: string;
  price: string;
  parent_menu: string;
}

interface Menu {
  _id: string;
  menu_name: string;
  description: string;
}

const MenuSection = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch main menus
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get(`${baseUrl}/deepnetsoft/fetch-all-menu`);
        setMenus(response.data.data);
        if (response.data.data.length > 0) {
          setSelectedMenu(response.data.data[0]._id);
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch menus");
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);


  // Fetch menu items when selected menu changes
  useEffect(() => {
    const fetchMenuItems = async () => {
      if (!selectedMenu) return;

      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}/deepnetsoft/fetch-all-menuitems`);
        // Filter items based on selected menu
        const filteredItems = response.data.data.filter(
          (item: MenuItem) => item.parent_menu === selectedMenu
        );
        setMenuItems(filteredItems);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch menu items");
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, [selectedMenu]);

  if (loading) return <div className='loading'></div>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className='MenuSectionMainWrapper'>
      <div className="menu-section">
        <div className="main-menu-listing-section">
          <div className="menu-card-wrapper">
            {menus.map(menu => (
              <div
                key={menu._id}
                className={`menu-card ${selectedMenu === menu._id ? 'active' : ''}`}
                onClick={() => setSelectedMenu(menu._id)}
              >
                {menu.menu_name}
              </div>
            ))}
          </div>
        </div>

        <div className="menu-items-card-wrapper">
          <img src={leftImage} className='left-image' alt="" />
          <img src={rightImage} className='right-image' alt="" />

          <div className="menuItems-card">
            <img src={juiceImage} alt="" className='juice-image' />
            <img src={cocktailImage} className='coktail-image' alt="" />
            <div className='menu-description'>
              <div className="line"></div>
              <h2>{menus.find(menu => menu._id === selectedMenu)?.description}</h2>
              <div className="line"></div>
            </div>

            <div className="items-list">
              <div className="row">
                {menuItems.map(item => (
                  <div key={item._id} className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="item">
                      <div className="item-name-price">
                        <h5 className="item-name">{item.item_name}</h5>
                        <span className="dots"></span>
                        <h5 className="price">${item.price}</h5>
                      </div>
                      <div className="description">{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuSection;