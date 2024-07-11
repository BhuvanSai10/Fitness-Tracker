import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import styled from "styled-components";
import LogoImage from "../utils/Images/logo.jpeg";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const Container = styled.div`
  display: flex;
  height: 100vh; 
  background: ${({ theme }) => theme.bg};
  position: relative; /* Add relative positioning */
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  position: absolute; 
  top: 0;
  left: 0;
  width: 100%; 
  height: 100%; 
  overflow: hidden; 
  z-index: 1; 
  @media (max-width: 700px) {
    display: none;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); 
  z-index: 1;
`;

const Logo = styled.img`
  position: absolute;
  border-radius: 50%;
  width: 70px;
  top: 40px;
  left: 60px;
  z-index: 2;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const Right = styled.div`
  position: relative; 
  display: flex;
  flex-direction: column;
  padding: 40px;
  gap: 16px;
  align-items: center;
  justify-content: center;
  z-index: 2;
  background: ${({ theme }) => theme.bg}; /* Add a background to the right section */
  width: 100%;
  max-width: 400px; /* Set a max width for the right section */
  margin: auto; /* Center the right section */
  border-radius: 8px; /* Add some border radius for aesthetics */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add a shadow for better separation */
  @media (max-width: 700px) {
    width: auto;
    margin: 40px 20px;
  }
`;

const Text = styled.div`
  font-size: 16px;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 16px;
  @media (max-width: 400px) {
    font-size: 14px;
  }
`;

const TextButton = styled.span`
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
`;

const Authentication = () => {
  const [login, setLogin] = useState(false);
  const images = useMemo(() => ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"], []);
  const loc = "/images/";
  const [imgSrc, setImgSrc] = useState(`${loc}${images[0]}`);
  const currentIndex = useRef(0);

  const changeBackgroundImg = useCallback(() => {
    currentIndex.current = (currentIndex.current + 1) % images.length;
    setImgSrc(`${loc}${images[currentIndex.current]}`);
  }, [images, loc]);

  useEffect(() => {
    const intervalId = setInterval(changeBackgroundImg, 4000); // Change image every 4 seconds

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [changeBackgroundImg]);

  return (
    <Container>
      <Left>
        <Logo src={LogoImage} />
        <Image src={imgSrc} />
        <Overlay />
      </Left>
      <Right>
        {!login ? (
          <>
            <SignIn />
            <Text>
              Don't have an account?{" "}
              <TextButton onClick={() => setLogin(true)}>SignUp</TextButton>
            </Text>
          </>
        ) : (
          <>
            <SignUp />
            <Text>
              Already have an account?{" "}
              <TextButton onClick={() => setLogin(false)}>SignIn</TextButton>
            </Text>
          </>
        )}
      </Right>
    </Container>
  );
};

export default Authentication;