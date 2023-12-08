import { Col, Image, Row } from "react-bootstrap";
import styles from "./Feature.module.css";

const FeatureItemLeft = ({ featureTitle, featureDesc, featureImage, featureId }) => {
    return (
        <Row>
            <Col lg={{ span: 4, offset:1}} md={{ span: 4, offset:0}} sm={{ span: 12, offset:0}}>
              <div className={`${styles.imageContainer}`}>
                <Image src={featureImage} className={styles.featureImage} data-testId={featureId} />
              </div>
            </Col>
            <Col lg={{ span: 6, offset:0}} md={{ span: 8, offset:0}} sm={{ span: 12, offset:0}} className={`${styles.secondCol}`}>
            <div className={`${styles.textContainer}`}>
                    <h2 className={styles.featureTitle}>{featureTitle}</h2>
                    <p className={styles.featureDesc}>{featureDesc}</p>
                </div>
            </Col>
        </Row>
    );
};

export default FeatureItemLeft;
