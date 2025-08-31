import React from "react";
import CaseStudySection from './../pageComponents/Home/CaseStudySection';
import ChallengesSection from './../pageComponents/Home/ChallangesSection';
import TrustedBySection from './../pageComponents/Home/TrustedBySection';
import PoweredBySection from './../pageComponents/Home/PoweredBySection';

const Home = () => {
  return (
    <div className="space-y-10 p-6">
      

      <ChallengesSection />
      <TrustedBySection />
      <CaseStudySection />
      <PoweredBySection />
    </div>
  );
};

export default Home;
