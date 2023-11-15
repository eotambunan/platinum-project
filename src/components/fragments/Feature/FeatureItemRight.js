import { Image } from "react-bootstrap";
import styles from "./Feature.module.css";

const FeatureItemRight = ({ featureTitle, featureDesc, featureImage }) => {
  return (
    <section className={styles.featureItem}>
      <div className="feature-desc">
        <h2 className={styles.featureTitle}>{featureTitle}</h2>
        <p className={styles.featureDesc}>{featureDesc}</p>
      </div>
      <Image src={featureImage} className={styles.featureImage} />
    </section>
  );
};

export default FeatureItemRight;
