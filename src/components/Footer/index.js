import React from 'react';
import { Layout, Row, Col } from 'antd';
import './index.scss';

const { Footer } = Layout;

const FooterSection = () => {
  return (
    <Footer className="footer-section">
      <div className="footer-content">
        <Row gutter={48} align="middle">
          <Col span={12}>
            <Row gutter={48} align="middle">
                <Col span={8}>
                    <div className="lab-info">
                        <img src={`${process.env.PUBLIC_URL}/images/idvx_lab_logo.png`} alt="IDV Lab" className="lab-logo" />
                    </div>
                </Col>
                <Col span={8} >
                    <div className="qr-code">
                    <img src={`${process.env.PUBLIC_URL}/images/QR_code.png`} alt="QR Code" className="qr-image" />
                    </div>
                </Col>
            </Row>
            <Row gutter={48} align="middle">
                <div className="contact-info">
                <div className="info-item">地址: 上海市杨浦区阜新路281号 IS218室</div>
                <div className="info-item">电邮: idvx.lab [at] tongji.edu.cn</div>
                <div className="info-item">电话: (+86)-21-65986671</div>
                <div className="copyright">
                Copyright © 2024 <a href="https://idvxlab.com" className="lab-link">Intelligent Big Data Visualization Lab (iDVx Lab) </a> All rights reserved.
                </div>
                </div>
            </Row>
          </Col>
          <Col span={12}>
            <div className="location-map">
              <img src={`${process.env.PUBLIC_URL}/images/address.png`} alt="Location Map" className="map-image" />
            </div>
          </Col>
        </Row>
      </div>
    </Footer>
  );
};

export default FooterSection;