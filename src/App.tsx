import { BrowserRouter,Routes,Route } from "react-router-dom"
import MenuPage from "./components/MenuPage/MenuPage"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={MenuPage}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
