import { useEffect, useState } from "react";
import styles from "./loading.module.css";

const Loading = () => {
    const [isLoading,setIsLoading]= useState(true)
    const [visible, setVisible] = useState(true);

    useEffect(() => {
            const timeout = setTimeout(() => {
                setVisible(false);
            }, 2000);
    }, [isLoading]);

    return visible?(
        <div className={styles.body}>
            <div className={styles.pulseWrapper}>
                <div className={styles.pulse}>
                    <span className={styles.span}></span>
                    <span className={styles.span2}></span>
                </div>
            </div>
        </div>
    ):null
};

export default Loading;
