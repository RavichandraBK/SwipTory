import React from "react";
import { useMediaQuery } from "react-responsive";
import styles from "./NavBar.module.css";
import hamburger from "../assets/Hamburger.png";
import profilepic from "../assets/profilepic.svg";
import bookmarkpic from "../assets/bookmarkpic.svg";
import { useState } from "react";
const NavBar = () => {
  const isMobile = useMediaQuery({ maxWidth: 391 });
  const [hamburgerClicked, SetHamburgerClicked] = useState(false);
  const [loginCheck] = useState(!!localStorage.getItem("token"));
  const handleHamburger = () => {
    SetHamburgerClicked(!hamburgerClicked);
  };
  return (
    <>
      <div className={styles.nav}>
        <p className={styles.navText}>SwipTory</p>
        <div
          className={styles.navBtns}
          style={{
            justifyContent:
              !isMobile && (loginCheck ? "flex-end" : "space-between"),
          }}
        >
          {isMobile ? (
            <img
              className={styles.mobileHamburgerImage}
              onClick={handleHamburger}
              src={hamburger}
              alt="ham"
            />
          ) : loginCheck ? (
            <>
              <button className={styles.navRegister}>Register Now</button>
              <button className={styles.navSignIn}>Sign In</button>
            </>
          ) : (
            <>
              <button className={styles.bookmarkBtn}>
                <img
                  className={styles.desktopBookmark}
                  src={bookmarkpic}
                  alt=""
                />{" "}
                Bookmarks
              </button>
              <button className={styles.addStoryBtn}>Add story</button>
              <img className={styles.profilePic} src={profilepic} alt="" />
              <img
                className={styles.desktopHamburgerImage}
                onClick={handleHamburger}
                src={hamburger}
                alt=""
              />
            </>
          )}
        </div>
      </div>
      {hamburgerClicked && !isMobile && (
        <>
          <div className={styles.desktopHamburger}>
            <p>Your Name</p>
            <button>Logout</button>
          </div>
        </>
      )}
      {hamburgerClicked && isMobile && (
        <>
          <div className={styles.mobileHamburger}>
            <div>
              <span onClick={() => SetHamburgerClicked(false)}>X</span>
            </div>
            {loginCheck ? (
              <>
                <div className={styles.mobileHamburgerChild2}>
                  <img src={profilepic} alt="" />
                  <p>Your Name</p>
                </div>
                <div className={styles.mobileHamburgerChild3}>
                  <button>Your Story</button>
                  <button>Add story</button>
                  <button>
                    <img
                      className={styles.mobileBookmark}
                      src={bookmarkpic}
                      alt=""
                    />{" "}
                    Bookmarks
                  </button>
                  <button>Logout</button>
                </div>
              </>
            ) : (
              <>
                <div className={styles.loginCheck}>
                  <button>Login</button>
                  <button>Register</button>
                </div>
              </>
            )}
          </div>
        </>
      )}
      <div style={{ backgroundColor: "blue" }}></div>
    </>
  );
};

export default NavBar;
