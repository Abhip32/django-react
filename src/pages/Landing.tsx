import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/Herosection.tsx';
import Features from '../components/Features.tsx';

const Landing: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const userData = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate()
  console.log(isLoggedIn,userData)
  React.useEffect(() => {
    if (isLoggedIn) {
      navigate('/home');
    }
  }, [isLoggedIn, userData, navigate]);

  return (
    <div style={{ minHeight: '100vh' }}>
      <HeroSection />
      <Features />
    </div>
  );
};

export default Landing;
