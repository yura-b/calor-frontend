import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { paths } from '@routes/paths.ts';
import { useGetUserIfRefresh } from '@/hooks/getUserIfRefresh.ts';
import { useMediaQuery } from '@react-hook/media-query';
import { useAppSelector } from '@/store/hooks/hooks.ts';

const HomePage = lazy(() => import('@pages/HomePage'));
const DesignShoePage = lazy(() => import('@pages/DesignShoePage'));
const CustomerExperiencePage = lazy(() => import('@pages/CustomerExperiencePage'));
const LoginPage = lazy(() => import('@pages/autorization/login/LoginPage.tsx'));
const SignupPage = lazy(() => import('@pages/autorization/signup/SignupPage.tsx'));
const Email = lazy(() => import('@pages/autorization/forgotPassword/Email.tsx'));
const ResetPassword = lazy(() => import('@pages/autorization/forgotPassword/ResetPassword.tsx'));
const OrderPage = lazy(() => import('@pages/admin/main/OrderPage.tsx'));
const UserPage = lazy(() => import('@pages/admin/users/UserPage.tsx'));
const DeliveryPage = lazy(() => import('@pages/admin/delivery/DeliveryPage.tsx'));
const UserProfilePage = lazy(() => import('@pages/admin/users/UserProfilePage.tsx'));
const CheckoutSuccessPage = lazy(() => import('@/pages/CheckoutPage/CheckoutSuccessPage'));
const CheckoutNotSuccessPage = lazy(() => import('@/pages/CheckoutPage/CheckoutNotSuccessPage'));
const AppointmentyPage = lazy(() => import('@/pages/AppointmentPage'));
const TextReviewPage = lazy(() => import('@pages/admin/reviews/textReviews/TextReviewPage.tsx'));
const PageManagerPage = lazy(() => import('@pages/admin/pageManager/PageManagerPage.tsx'));
const MainPage = lazy(() => import('@pages/admin/main/MainPage.tsx'));
const DesignBagPage = lazy(() => import('@pages/DesignBagPage'));
const ReadyMadeProductsPage = lazy(() => import('@pages/ReadyMadeProductsPage'));
const AccessoriesPage = lazy(() => import('@pages/AccessoriesPage'));
const Accessories = lazy(() => import('@pages/AccessoriesPage/components/Accessories'));
const ShoeCareProductPage = lazy(() => import('@pages/ShoeCareProductPage'));
const SubCareProduct = lazy(() => import('@pages/ShoeCareProductPage/components/SubCareProduct'));
const AccountPage = lazy(() => import('@pages/AccountPage'));
const DeleteMyAccountComponent = lazy(
  () => import('@pages/AccountPage/components/AccountDetails/components/DeleteMyAccountComponent')
);
const DeleteMyAccountSuccess = lazy(
  () => import('@pages/AccountPage/components/AccountDetails/components/DeleteMyAccountSuccess')
);
const AccountDetails = lazy(() => import('@pages/AccountPage/components/AccountDetails'));
const MyOrders = lazy(() => import('@pages/AccountPage/components/MyOrders'));
const DesignList = lazy(() => import('@pages/AccountPage/components/DesignList'));
const ShippingAddress = lazy(() => import('@pages/AccountPage/components/ShippingAddress'));
const ChangePassword = lazy(() => import('@pages/AccountPage/components/ChangePassword'));
const AboutPage = lazy(() => import('@pages/AboutPage'));
const HelpPage = lazy(() => import('@pages/HelpPage'));
const CreateEvent = lazy(() => import('@pages/admin/pageManager/CreateEvent.tsx'));
const CreateNewsArticle = lazy(() => import('@pages/admin/pageManager/CreateNewsArticle.tsx'));
const WarehousePage = lazy(() => import('@pages/admin/warehouse/WarehousePage.tsx'));
const CatalogPage = lazy(() => import('@pages/admin/catalog/CatalogPage.tsx'));
const CreateItem = lazy(() => import('@pages/admin/catalog/CreateItem.tsx'));
const CheckoutPage = lazy(() => import('@/pages/CheckoutPage/CheckoutPage'));
const ResetUserPassword = lazy(() => import('@/pages/AccountPage/components/ChangePassword/ResetUserPassword'));
const ProductPage = lazy(() => import('@/pages/ProductPage/ProductPage'));
const Reviews = lazy(() => import('@/pages/AccountPage/components/Reviews'));
const MeasurementPage = lazy(() => import('@/pages/MeasurementPage/MeasurementPage'));
const CompleteYourLookPage = lazy(() => import('@/pages/CompleteYourLookPage/CompleteYourLookPage'));
const EventPage = lazy(() => import('@/pages/EventPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

import TokenGuard from '@routes/TokenGuard.tsx';
import Constructor from '@/components/Constructor';
import MyOrder from '@components/MyOrder';
import PrivateRoute from '@/components/PrivateRoute';
import CookiePopup from '@components/CookiePopup';
import EditItem from '@pages/admin/catalog/EditItem.tsx';
import Loader from '@/components/ui/Loader/';
import VariationsPage from '@pages/admin/catalog/variations/VariationsPage.tsx';
import PromoCodesPage from '@pages/admin/promocodes/PromocodesPage.tsx';

const App = () => {
  const getUser = useGetUserIfRefresh();

  getUser();
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const { access_token } = useAppSelector((state) => state.user);
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path={'/'}>
            <Route index element={<HomePage />} />
            <Route path={'model/:model/:id'}>
              <Route index element={<Constructor />} />
              <Route path={'measurement'}>
                <Route index element={<MeasurementPage />} />
                <Route path={'complete_your_look'} element={<CompleteYourLookPage />} />
              </Route>
            </Route>
          </Route>
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
            <Route path={'createnewsarticle'} element={<CreateNewsArticle />} />
            <Route path={'delivery'} element={<DeliveryPage />} />
            <Route path={'catalog'} element={<CatalogPage />} />
            <Route path={'catalog/variations'} element={<VariationsPage />} />
            <Route path={'createitem'} element={<CreateItem />} />
            <Route path={'edititem/:id'} element={<EditItem />} />
            <Route path={'warehouse'} element={<WarehousePage />} />
            <Route path={'promocodes'} element={<PromoCodesPage />} />
          </Route>
          <Route path={'design_your_shoe'}>
            <Route index element={<DesignShoePage />} />
            <Route path={'model/:model/:id'}>
              <Route index element={<Constructor />} />
              <Route path={'measurement'}>
                <Route index element={<MeasurementPage />} />
                <Route path={'complete_your_look'} element={<CompleteYourLookPage />} />
              </Route>
            </Route>
          </Route>
          <Route path={'product/:id'} element={<ProductPage />} />
          <Route path={paths.design_bag} element={<DesignBagPage />} />
          <Route path={paths.accessories} element={<AccessoriesPage />} />
          <Route path={`${paths.accessories}/:subCategory`} element={<Accessories />} />
          <Route path={paths.shoe_care_product} element={<ShoeCareProductPage />} />
          <Route path={`${paths.shoe_care_product}/:subCareProduct`} element={<SubCareProduct />} />
          <Route path={paths.ready_made_products} element={<ReadyMadeProductsPage />} />
          <Route path={paths.customer_experience} element={<CustomerExperiencePage />} />
          <Route path={paths.about} element={<AboutPage />} />
          <Route path={'manager/event/:id'} element={<EventPage />} />
          <Route
            path={paths.account}
            element={
              isMobile ? <PrivateRoute element={<AccountPage />} /> : <PrivateRoute element={<AccountDetails />} />
            }
          />
          <Route path={paths.accountDetails} element={<PrivateRoute element={<AccountDetails />} />} />
          <Route
            path={paths.accountDelete}
            element={access_token ? <DeleteMyAccountComponent /> : <DeleteMyAccountSuccess />}
          />
          <Route path={paths.myOrders} element={<PrivateRoute element={<MyOrders />} />} />
          <Route path={paths.designList} element={<PrivateRoute element={<DesignList />} />} />
          <Route path={paths.shippingAddress} element={<PrivateRoute element={<ShippingAddress />} />} />
          <Route path={paths.changePassword} element={<PrivateRoute element={<ChangePassword />} />} />
          <Route path={paths.changeUserPassword} element={<PrivateRoute element={<ResetUserPassword />} />} />
          <Route path={paths.reviews} element={<PrivateRoute element={<Reviews />} />} />
          <Route path={paths.checkout} element={<CheckoutPage />} />
          <Route path={`${paths.checkout_success}/:id`} element={<CheckoutSuccessPage />} />
          <Route path={paths.checkout_failed} element={<CheckoutNotSuccessPage />} />
          <Route path={paths.myOrder} element={<MyOrder />} />
          <Route path={paths.helpPage} element={<HelpPage />} />
          <Route path={paths.appointmentPage} element={<AppointmentyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <CookiePopup />
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
