import React from 'react';

const About = () => (
  <div className="wrapper">
    <section className="about">
      <div className="row">
        <div className="sm-col-span-12 lg-col-span-3">
          <h2 className="menu-title">ABOUT</h2>
          <div className="menu-line"></div>
        </div>
        <div className="sm-col-span-12 lg-col-span-4">
          <article>
              <p className="about__p">I&#39;m Katie Chen, the owner of Charm Accessories. Charm
                accessories is young, vibrant, charming and diverse. We aim to bring you
                high quality fashion jewellery and accessories. We have an extensive range
                to cover all your options for styles, age groups and budget. We cater for
                all occasions: wedding, formal, party, casual and myriades more. We invite
                you to join us to explore our fabulous fashion collections to charm yourself.
              </p>
              <p className="about__p">We wish you enjoy your shopping with us. Please do not
                hesitate to contact me, if you would like any assistance or if you have any
                questions.
              </p>
              <p className="about__p about__p--signed">
                Katie Chen<br/>
                2018
              </p>
          </article>
        </div>
        <div className="sm-col-span-12 lg-col-span-5">
            <div className="img">
              <img className="img__content" src="/images/front/about.jpg" />
            </div>
        </div>
        <div className="clearfix"></div>
      </div>
    </section>
  </div>
);
export default About;
