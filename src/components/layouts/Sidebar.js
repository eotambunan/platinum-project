import { IconContext } from "react-icons";
import styles from "./sidebar.module.css";
import { MdOutlineSpaceDashboard, MdOutlineTrendingDown, MdOutlineTrendingUp, MdWallet, MdPersonOutline, MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowLeft } from "react-icons/md";
import Link from "next/link";
import { removeCookie } from "@/utils/cookies";
import { useRouter } from "next/router";
import { useState } from "react";

// tes aja iconnya
import { ImExit } from "react-icons/im";

const Sidebar = () => {
    const [isHide, setIsHide] = useState(false);
    const handleHideClick = () => {
        setIsHide(!isHide);
        console.log(isHide);
    };

    const router = useRouter();
    const logOut = () => {
        removeCookie("user-access");
        router.push("/login");
    };

    return (
                <div className={`${styles.sidebar} ${isHide ? '' : styles.close}`}>
                <ul className={`${styles.ul}`}>
                    {isHide ? (
                        <div className={`${styles.wrapper}`}>
                            <Link href="/">
                                <img src="./logo.svg" className={`${styles.logo}`} />
                            </Link>
                        </div>
                    ) : (
                        <div className={`${styles.wrapperhide}`}>
                            <Link href="/" className={styles.collumn}>
                                <img src="./logo.svg" className={`${styles.logo}`} />
                            </Link>
                        </div>
                    )}
                    <Link href="/dashboard" className={styles.link}>
                        <li className={styles.list}>
                            <IconContext.Provider value={{ color: "white" }}>
                                <MdOutlineSpaceDashboard className={styles.icons} />
                            </IconContext.Provider>
                            {isHide ? "Dashboard" : ""}
                        </li>
                    </Link>
                    <Link href="/expanses" className={styles.link}>
                        <li className={styles.list}>
                            <IconContext.Provider value={{ color: "white" }}>
                                <MdOutlineTrendingDown className={styles.icons} />
                            </IconContext.Provider>
                            {isHide ? "Expenses" : ""}
                        </li>
                    </Link>
                    <Link href="/income" className={styles.link}>
                        <li className={styles.list}>
                            <IconContext.Provider value={{ color: "white", size: "2rem" }}>
                                <MdOutlineTrendingUp className={styles.icons} />
                            </IconContext.Provider>
                            {isHide ? "Incomes" : ""}
                        </li>
                    </Link>
                    <Link href="/wallet" className={styles.link}>
                        <li className={styles.list}>
                            <IconContext.Provider value={{ color: "white", size: "2rem" }}>
                                <MdWallet className={styles.icons} />
                            </IconContext.Provider>
                            {isHide ? "Wallet" : ""}
                        </li>
                    </Link>
                    <Link href="/profile" className={styles.link}>
                        <li className={styles.list}>
                            <IconContext.Provider value={{ color: "white", size: "2rem" }}>
                                <MdPersonOutline className={styles.icons} />
                            </IconContext.Provider>
                            {isHide ? "Profile" : ""}
                        </li>
                    </Link>
                    <button onClick={logOut} className={`${styles.button}`}>
                        {isHide ? "Log-Out" : <ImExit className={styles.exit} />}
                    </button>
                </ul>
                <button onClick={handleHideClick} className={`${styles.hide} position-absolute top-50 start-100 translate-middle`}>
                {isHide ? <MdKeyboardDoubleArrowLeft /> : <MdKeyboardDoubleArrowRight />}
                </button>
            </div>
    );
};

export default Sidebar;
