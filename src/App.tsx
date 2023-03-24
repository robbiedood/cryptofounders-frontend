import { useContext } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';
import Root from './routes/root';
import HomePage from './routes/home-page';
import CoinPage from './routes/coin-page';
import FoundPage from './routes/found-page';
import AccountPage from './routes/account-page';
import ErrorPage from './routes/error-page';
import { ThemeContext } from './ThemeContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children:[
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "coins/:contractAddress",
        element: <CoinPage />
      },
      {
        path: "found",
        element: <FoundPage />
      },
      {
        path: "account",
        element: <AccountPage />
      },
    ],
    errorElement: <ErrorPage />
  },
  // {
  //   path: "coins/:contractAddress",
  //   element: <CoinPage />, // CoinPage裡使用useParameter來得到contractAddress (as coin id), 然後獲取&render對應的coin info
  //   errorElement: <ErrorPage />
  // }
]);

function App() {
  const { dark } = useContext(ThemeContext)
  document.body.style.background = dark ? '#041d11' : 'white'; //TODO(Luke): 不知道有無更簡潔, 能全局改變背景色的方法
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
