import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from "./components/Layout";
import Layout from "./components/hoc/Layout";
import Services from "./components/Page/Services";
import AddServices from "./components/pageComponents/Services/AddServices";
import Team from "./components/Page/Team";
import AddTeam from "./components/pageComponents/Team/AddTeam";
import Portfolio from "./components/Page/Portfolio";
import Blog from "./components/Page/Blog";
import AddBlog from "./components/pageComponents/Blog/AddBlog";
import Gallery from "./components/Page/Gallery";
import AddGallery from "./components/pageComponents/Gallery/AddGallery";
import ServiceView from "./components/pageComponents/Services/ServiceView";
import BlogView from "./components/pageComponents/Blog/BlogView";
import AddPortfolio from "./components/pageComponents/Portfolio/AddPortfolio";
import PortfolioView from "./components/pageComponents/Portfolio/PortfolioView";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<div />} />

          {/* <Route path="courses/addcourse" element={<AddCourse />} /> */}
          {/* <Route path="courses" element={<Courses />} /> */}
          {/* <Route path="servicecard" element={<ServiceCard />} /> */}
          <Route path="services" element={<Services />} />
          <Route path="addservice" element={<AddServices />} />
          <Route path="/serviceview/:id" element={<ServiceView />} />
          <Route path="team" element={<Team />} />
          <Route path="addteam" element={<AddTeam />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="blog" element={<Blog />} />
          <Route path="addblog" element={<AddBlog />} />
          <Route path="/blogview/:id" element={<BlogView />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="addgallery" element={<AddGallery />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="addportfolio" element={<AddPortfolio />} />
          <Route path="/portfolioview/:id" element={<PortfolioView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
