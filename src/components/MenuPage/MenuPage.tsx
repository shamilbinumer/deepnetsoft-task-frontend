import { useState } from 'react'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import Banner from './Banner/Banner'
import './MenuPage.scss'
import MenuSection from './MenuSection/MenuSection'

const MenuPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const handleMenuUpdate = () => {
    setRefreshTrigger(prev => prev + 1);
  };
  return (
    <div className='HomeMainWrapper'>
          <Navbar onMenuUpdate={handleMenuUpdate} />
      <Banner/>
      <MenuSection key={refreshTrigger} />
      <Footer/>
    </div>
  )
}

export default MenuPage
