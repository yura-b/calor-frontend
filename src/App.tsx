import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from '@pages/autorization/login/LoginPage.tsx';
import SignupPage from '@pages/autorization/signup/SignupPage.tsx';
import Email from '@pages/autorization/forgotPassword/Email.tsx';
import TokenGuard from '@routes/TokenGuard.tsx';
import ResetPassword from '@pages/autorization/forgotPassword/ResetPassword.tsx';
import OrderPage from '@pages/admin/main/OrderPage.tsx';
import UserPage from '@pages/admin/users/UserPage.tsx';
import UserProfilePage from '@pages/admin/users/UserProfilePage.tsx';
import TextReviewPage from '@pages/admin/reviews/textReviews/TextReviewPage.tsx';
import PageManagerPage from '@pages/admin/pageManager/PageManagerPage.tsx';
import { paths } from '@routes/paths.ts';
import MainPage from '@pages/admin/main/MainPage.tsx';
import DesignBagPage from '@pages/DesignBagPage';
import ReadyMadeProductsPage from '@pages/ReadyMadeProductsPage';
import AccessoriesPage from '@pages/AccessoriesPage';
import ShoeCareProductPage from '@pages/ShoeCareProductPage';
import CustomerExperiencePage from '@pages/CustomerExperiencePage';
import CookiesPage from '@pages/CookiesPage';
import AccountPage from '@pages/AccountPage';
import AccountDetails from '@pages/AccountPage/components/AccountDetails';
import MyOrders from '@pages/AccountPage/components/MyOrders';
import MyOrder from '@components/MyOrder';
import DesignList from '@pages/AccountPage/components/DesignList';
import ShippingAddress from '@pages/AccountPage/components/ShippingAddress';
import ChangePassword from '@pages/AccountPage/components/ChangePassword';
import AboutPage from '@pages/AboutPage';
import HelpPage from '@pages/HelpPage';
import CreateEvent from '@pages/admin/pageManager/CreateEvent.tsx';
import WarehousePage from '@pages/admin/warehouse/WarehousePage.tsx';
import { useGetUserIfRefresh } from '@/hooks/getUserIfRefresh.ts';
import Loader from '@/components/ui/Loader/';
import CatalogPage from '@pages/admin/catalog/CatalogPage.tsx';
import CreateItem from '@pages/admin/catalog/CreateItem.tsx';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
const HomePage = lazy(() => import('@pages/HomePage'));
const DesignShoePage = lazy(() => import('@pages/DesignShoePage'));
import PrivateRoute from '@/components/PrivateRoute';
import ResetUserPassword from './pages/AccountPage/components/ChangePassword/ResetUserPassword';
import { useMediaQuery } from '@react-hook/media-query';
import Constructor from './components/Constructor';
import ProductPage from './pages/ProductPage/ProductPage';
import Reviews from './pages/AccountPage/components/Reviews';
import MeasurementPage from "@/pages/MeasurementPage/MeasurementPage";

const App = () => {
  const getUser = useGetUserIfRefresh();

  getUser();
  const isMobile = useMediaQuery('(max-width: 1023px)');
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path={'/'} element={<HomePage />} />
          <Route path={paths.home} element={<HomePage />} />
          <Route path={'login'} element={<TokenGuard children={<LoginPage />} />} />
          <Route path={'signup'} element={<TokenGuard children={<SignupPage />} />} />
          <Route path={'reset'} element={<TokenGuard children={<Email />} />} />
          <Route path={'password/:id'} element={<TokenGuard children={<ResetPassword />} />} />
          <Route path={'admin'}>
            <Route index element={<MainPage />} />
            <Route path={'order/:id'} element={<OrderPage />} />
            <Route path={'users'} element={<UserPage />} />
            <Route path={'users/:id'} element={<UserProfilePage />} />
            <Route path={'reviews/text'} element={<TextReviewPage />} />
            <Route path={'manager'} element={<PageManagerPage />} />
            <Route path={'createevent'} element={<CreateEvent />} />
            <Route path={'catalog'} element={<CatalogPage />} />
            <Route path={'createitem'} element={<CreateItem />} />
            <Route path={'warehouse'} element={<WarehousePage />} />
          </Route>
          <Route path={'design_your_shoe'}>
            <Route index element={<DesignShoePage />} />
            <Route path={'model/:model/:id'}>
              <Route index element={<Constructor />} />
              <Route path={'measurement'} element={<MeasurementPage />} />
            </Route>
          </Route>
          <Route path={'product/:id'} element={<ProductPage />}/>
          <Route path={paths.design_bag} element={<DesignBagPage />} />
          <Route path={paths.accessories} element={<AccessoriesPage />} />
          <Route path={paths.shoe_care_product} element={<ShoeCareProductPage />} />
          <Route path={paths.ready_made_products} element={<ReadyMadeProductsPage />} />
          <Route path={paths.customer_experience} element={<CustomerExperiencePage />} />
          <Route path={paths.cookies} element={<CookiesPage />} />
          <Route path={paths.about} element={<AboutPage />} />
          <Route
            path={paths.account}
            element={
              isMobile ? <PrivateRoute element={<AccountPage />} /> : <PrivateRoute element={<AccountDetails />} />
            }
          />
          <Route path={paths.accountDetails} element={<PrivateRoute element={<AccountDetails />} />} />
          <Route path={paths.myOrders} element={<PrivateRoute element={<MyOrders />} />} />
          <Route path={paths.designList} element={<PrivateRoute element={<DesignList />} />} />
          <Route path={paths.shippingAddress} element={<PrivateRoute element={<ShippingAddress />} />} />
          <Route path={paths.changePassword} element={<PrivateRoute element={<ChangePassword />} />} />
          <Route path={paths.changeUserPassword} element={<PrivateRoute element={<ResetUserPassword />} />} />
          <Route path={paths.reviews} element={<PrivateRoute element={<Reviews />} />} />
          <Route path={paths.checkout} element={<CheckoutPage />} />
          <Route path={paths.myOrder} element={<MyOrder />} />
          <Route path={paths.helpPage} element={<HelpPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
