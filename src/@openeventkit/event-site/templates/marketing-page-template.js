import * as React from "react";
import PropTypes from "prop-types";
import { navigate } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Markdown from "markdown-to-jsx";

import Layout from "@openeventkit/event-site/src/components/Layout";
import AttendanceTrackerComponent from "@openeventkit/event-site/src/components/AttendanceTrackerComponent";
import MarketingHeroComponent from "@openeventkit/event-site/src/components/MarketingHeroComponent";
import LiteScheduleComponent from "@openeventkit/event-site/src/components/LiteScheduleComponent";
import DisqusComponent from "@openeventkit/event-site/src/components/DisqusComponent";
import Countdown from "@openeventkit/event-site/src/components/Countdown";
import Link from "@openeventkit/event-site/src/components/Link";

import Masonry from "react-masonry-css";
import Slider from "react-slick";
import { formatMasonry } from "@openeventkit/event-site/src/utils/masonry";

import { PHASES } from "@openeventkit/event-site/src/utils/phasesUtils";

import styles from "@openeventkit/event-site/src/styles/marketing.module.scss";

const sliderSettings = {
  autoplay: true,
  autoplaySpeed: 5000,
  infinite: true,
  dots: false,
  slidesToShow: 1,
  slidesToScroll: 1
};

const MarketingPageTemplate = ({
  location,
  data,
  lastDataSync,
  summit,
  summitPhase,
  isLoggedUser,
}) => {

  const {
    marketingPageJson: {
      hero,
      countdown,
      widgets,
      masonry
    } = {}
  } = data || {};

  let scheduleProps = {};
  if (widgets?.schedule && isLoggedUser && summitPhase !== PHASES.BEFORE) {
    scheduleProps = {
      ...scheduleProps,
      onEventClick: (ev) => navigate(`/a/event/${ev.id}`),
    }
  }

  const shouldRenderMasonry = masonry?.display;

  return (
    <Layout marketing={true} location={location}>
      <AttendanceTrackerComponent />
      <MarketingHeroComponent
        location={location}
        data={hero}
      />
      {summit && countdown?.display && <Countdown summit={summit} text={countdown?.text} />}
      <div className="columns">
        <div className={`column mt-3 px-6 py-6 ${shouldRenderMasonry ? "is-half" : ""} ${styles.leftColumn ? styles.leftColumn : ""}`} style={{ position: 'relative' }}>
          {widgets?.text?.display && widgets?.text?.content &&
            <div className="container">
              <Markdown>
                {widgets.text.content}
              </Markdown>
            </div>
          }
          {widgets?.schedule?.display &&
            <>
              <h2><b>{widgets.schedule.title}</b></h2>
              <LiteScheduleComponent
                {...scheduleProps}
                lastDataSync={lastDataSync}
                id={`marketing_lite_schedule_${lastDataSync}`}
                page="marketing-site"
                showAllEvents={true}
                showSearch={false}
                showNav={true}
              />
            </>
          }
          {widgets?.disqus?.display &&
            <>
              <h2><b>{widgets.disqus.title}</b></h2>
              <DisqusComponent page="marketing-site"/>
            </>
          }
          {widgets?.image?.display &&
           widgets?.image?.image.src &&
            <>
              <h2><b>{widgets.image.title}</b></h2>
              <br />
              <GatsbyImage image={getImage(widgets.image.image.src)} alt={widgets.image.image.alt ?? ""} />
            </>
          }
        </div>
        {shouldRenderMasonry &&
        <div className={`column is-half px-0 pb-0 ${styles.rightColumn ? styles.rightColumn : ""}`}>
          <Masonry
            breakpointCols={2}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
            {masonry.items && formatMasonry(masonry.items).map((item, index) => {
              if (item.images && item.images.length === 1) {
                const image = getImage(item.images[0].src);
                return (
                  <div className={'single'} key={index}>
                    {item.images[0].link ?
                      <Link to={item.images[0].link}>
                        <GatsbyImage image={image} alt={item.images[0].alt ?? ""} />
                      </Link>
                      :
                      <GatsbyImage image={image} alt={item.images[0].alt ?? ""} />
                    }
                  </div>
                )
              } else if (item.images && item.images.length > 1) {
                return (
                  <Slider {...sliderSettings} key={index}>
                    {item.images.map((image, indexSlide) => {
                      const img = getImage(image.src);
                      return (
                        <div className={styles.imageSlider} key={indexSlide}>
                          {image.link ?
                            <Link to={image.link}>
                              <GatsbyImage image={img} alt={image.alt ?? ""} />
                            </Link>
                            :
                            <GatsbyImage image={img} alt={image.alt ?? ""} />
                          }
                        </div>
                      )
                    })}
                  </Slider>
                )
              } else {
                return (
                  <div className="single" key={index} />
                )
              }
            })}
          </Masonry>
        </div>
        }
      </div>
    </Layout>
  )
};

MarketingPageTemplate.propTypes = {
  location: PropTypes.object,
  data: PropTypes.object,
  lastDataSync: PropTypes.number,
  summit: PropTypes.object,
  summitPhase: PropTypes.number,
  isLoggedUser: PropTypes.bool
};

export default MarketingPageTemplate;
