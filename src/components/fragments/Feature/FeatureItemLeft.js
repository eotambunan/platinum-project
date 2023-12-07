import { Image } from "react-bootstrap";
import styles from "./Feature.module.css";

const FeatureItemLeft = ({ featureTitle, featureDesc, featureImage,featureId }) => {
  return (
    <section className={styles.featureItem}>
      <Image src={featureImage} className={styles.featureImage} data-testId={featureId} />
      <div className="feature-desc">
        <h2 className={styles.featureTitle}>{featureTitle}</h2>
        <p className={styles.featureDesc}>{featureDesc}</p>
      </div>
    </section>
  );
};

export default FeatureItemLeft;
