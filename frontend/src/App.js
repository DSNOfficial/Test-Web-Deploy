import { BrowserRouter, Routes, Route, Router, Switch, } from "react-router-dom";
import HomePage from "./admin/HomePage";
import LoginPage from "./admin/LoginPage";
import CategoryPage from "./admin/CategoryPage";
import PostPage from "./admin/PostPage";
import UserPage from "./admin/UserPage";
import RolePage from "./admin/RolePage";
import PostCreatePage from "./admin/PostCreatePage";
import NotFoundPage from "./admin/NotFoundPage";
import MainLayout from "./component/layout/MainLayout";
import MainLayoutLogin from "./component/layout/MainLayoutLogin";
import MainLayoutView from "./component/layout/MainLayoutView";

import AboutPageView from "./view/component/AboutPageView";
import HomePageView from "./view/component/HomePageView";
import ContactPageView from "./view/component/ContactPageView";
import BlogPageView from "./view/component/BlogPageView";
import AdministrationPageView from "./component/department/AdministrationPageView";
import AccountPageView from "./component/department/AccountPageView";
import TechnicalPageView from "./component/department/TechnicalPageView";
// import accountPageView from "./component/department/AccountPageView";

import AboutPatientPageView from "./view/component/AboutPatientPageView";
import ImageSlideShowPage from "./admin/ImageSlideShowPage";
import DepartmentPage from "./admin/DepartmentPage";
import BooksPage from "./admin/BooksPage";
import MarqueePage from "./admin/MarqueePage";
// import BodyLayoutView from "./component/layout/BodyLayoutView";
import DepartmentPageView from "./view/component/DepartmentPageView";
import SlideShowPage from "./admin/SlideShowPage";
import MassagePage from "./admin/MassagePage";
import HistoryPage from "./admin/HistoryPage";
import HistoryPageView from "./view/component/HistoryPageView";
import ErrorPageView from "./view/component/ErrorPageView";
import ErrorFoundPageView from "./view/component/ErrorFoundPageView";
import BlogDetailView from "./view/component/BlogDetailView";
import AdministrationPage from "./admin/AdministrationPage";
import AccountPage from "./admin/AccountPage";
import TechnicalPage from "./admin/TechnicalPage";
import PartnerPage from "./admin/PartnerPage";
import TrainingPage from "./admin/TrainingPage";
import PartnerPageView from "./view/component/PartnerPageView";
import TestUploadsPage from "./admin/TestUploadsPage";
import NewsPostListPage from "./admin/NewsPostListPage";
// import PostFormM from "./admin/TestSecond";
import PostForm from "./admin/TestSecond";
import PartnerDetail from "./view/component/PartnersDetailView";
import TrainingPageView from "./view/component/TrainingPageView";
import TrainingDetail from "./view/component/TrainingDetail";
import BookPageView from "./view/component/BookPageView";
import MissionPage from "./admin/MissionPage";
import MissionPageView from "./view/component/MissionPageView";
import LeaderPage from "./admin/LeaderPage";
import ServicePackagePage from "./admin/ServicePackagePage";
import InstructurePageView from "./view/component/InstructurePageView";
import VisionPage from  "./admin/VisionPage";
import MissionDetailView from "./view/component/MissionDetailView";
import VisionPageView from "./view/component/VisionPageView";
import VisionDetailPage from "./view/component/VisionDetailPage";
import ValuePage from "./admin/ValuePage";
import ValuePageViewDetail from "./view/component/ValuePageViewDetail";
import PatientOutPageView from "./view/component/PatientOutPageView";
import PatientInPageView from "./view/component/PatientInPageView";
import PackagePatientPageView from "./view/component/PackagePatientPageView";
import PackagePatientPageDetailView from "./view/component/PackagePatientPageDetailView";
import GoogleTranslatePage from "./view/component/GoogleTranslatePage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/leader" element={<LeaderPage />} />
          <Route path="/category-page" element={<CategoryPage />} />
          <Route path="/post-list-page" element={<PostPage />} />
          <Route path="/user-page" element={<UserPage />} />
          <Route path="/role-page" element={<RolePage />} />
          <Route path="/post-create-page" element={<PostCreatePage />} />
          <Route path="/image-slide-show" element={<SlideShowPage />} />
          <Route path="/book-page" element={<BooksPage />} />
          <Route path="/department" element={<DepartmentPage />} />
          <Route path="/department" element={<SlideShowPage />} />
          <Route path="/inbox-message" element={<MassagePage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/view-web" element={<HomePageView />} />
          <Route path="/administration-page" element={<AdministrationPage />} />
          <Route path="/account-page" element={<AccountPage />} />
          <Route path="/technical-page" element={<TechnicalPage />} />
          <Route path="/training" element={<TrainingPage />} />
          <Route path="/marquee" element={<MarqueePage />} />
          <Route path="/partner" element={<PartnerPage />} />
          <Route path="/uploads" element={<TestUploadsPage />} />
          <Route path="/postnewlist" element={<NewsPostListPage />} />
          <Route path="/post-news" element={<PostForm />} />
          <Route path="/mission" element={<MissionPage/>} />   
          <Route path="/service-package" element={<ServicePackagePage/>} />   
          <Route path="/vision" element={<VisionPage/>} />   
          <Route path="/value" element={<ValuePage/>} />   
        </Route>

        <Route element={<MainLayoutLogin />}>
          <Route path="/login/admin" element={<LoginPage />} />
          <Route path="/admin" exact component={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="*" element={<ErrorFoundPageView />} />
        </Route>

        <Route path="/" element={<MainLayoutView />}>
          <Route index element={<HomePageView />} />
          <Route path="/view-website" element={<HomePageView />} />
          <Route path="/project/tsnh" element={<HomePageView />} />
          <Route path="/page/home" element={<HomePageView />} />
          <Route path="/page/contact" element={<ContactPageView />} />
          <Route path="/page/about" element={<AboutPageView />} />
          <Route path="/page/blog" element={<BlogPageView />} />
          <Route path="/page/account" element={<AccountPageView />} />
          <Route path="/page/administration" element={<AdministrationPageView />} />
          <Route path="/page/history" element={<HistoryPageView />} />
          <Route path="/page/technical" element={<TechnicalPageView />} />
          <Route path="/page/blog" element={<BlogPageView />} />
          <Route path="/page/partners" element={<PartnerPageView />} />
          <Route path="/page/trainers" element={<TrainingPageView/>} />
          <Route path="/page/books" element={<BookPageView/>} />
          <Route path="/page/mission" element={<MissionPageView/>} />
          <Route path="/page/home/department" element={<DepartmentPageView />} />
          <Route path="/page/Construction" element={<ErrorPageView />} />
          <Route path="/page/structure" element={<InstructurePageView />} />
          <Route path="/page/patient-out" element={<PatientOutPageView />} />
          <Route path="/page/patient-in" element={<PatientInPageView />} />
          <Route path="/page/package-patient" element={<PackagePatientPageView />} />
      

          {/* <Route path="/page/vision" element={<VisionPageView />} /> */}
          <Route path="*" element={<ErrorPageView />} />

          <Route path="/page/blog/:id" element={<BlogDetailView />} />
          {/* <Route path="/page/partners/:id" element={<PartnerDetail />} /> */}
          <Route path="/page/trainers/:id" element={<TrainingDetail />} />
          <Route path="/page/books/:id" element={<TrainingDetail />} />
          <Route path="/page/mission/:id" element={<MissionDetailView />} />
          <Route path="/page/vision/:id" element={<VisionDetailPage />} />
          <Route path="/page/value/:id" element={<ValuePageViewDetail />} />
          <Route path="/page/package-patient/:id" element={<PackagePatientPageDetailView />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
