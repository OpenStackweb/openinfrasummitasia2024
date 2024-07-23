import * as React from "react";
import { getSrc } from "gatsby-plugin-image";
import AuthComponent from "@openeventkit/event-site/src/components/AuthComponent";
import RegistrationLiteComponent from "@openeventkit/event-site/src/components/RegistrationLiteComponent";
import IconButton from "@openeventkit/event-site/src/components/IconButton"

import styles from "./styles.module.scss";

const goToKoreanRegistration = (ev) => {
    ev.preventDefault();
    window.open('https://openinfra.cafe24.com/surl/O/18', '_blank', 'noopener,noreferrer');
}

const ButtonGroup = ({ location, registerButton, loginButton, registerkoreaButton }) => (
  <>
    {registerButton?.display && (
      <span className={styles.link}>
        <RegistrationLiteComponent location={location} />
      </span>
    )}
    {registerkoreaButton?.display && (
        <IconButton
            className={styles.koreanButton}
            iconClass="fa fa-2x"
            buttonText={registerkoreaButton.text}
            onClick={goToKoreanRegistration}            
        />
    )}
    {loginButton?.display && <AuthComponent location={location} />}
  </>
);

const MainColumn = ({ location, title, subTitle, date, time, buttons, backgroundSrc, fullWidth }) => {
  const backgroundImageStyle = backgroundSrc
    ? { backgroundImage: `url(${getSrc(backgroundSrc)})` }
    : {};
  console.log("BUTTONS CHECK", buttons);
  return (
    <div className={`column ${!fullWidth ? "is-half" : ""} p-0 ${styles.mainColumn}`} style={backgroundImageStyle}>
      <div className={`hero-body ${styles.heroBody}`}>
        {title && <h1 className="title">{title}</h1>}
        {subTitle && <h2 className="subtitle">{subTitle}</h2>}
        {date && <h4>{date}</h4>}
        {time && <h4>{time}</h4>}        
        <div className={styles.heroButtons}>
          <ButtonGroup {...buttons} location={location} />
        </div>
      </div>
    </div>
  );
};

export default MainColumn;
