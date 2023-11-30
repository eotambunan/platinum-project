import { IconContext } from "react-icons";
import styles from "./sidebar.module.css";
import { MdOutlineSpaceDashboard, MdOutlineTrendingDown, MdOutlineTrendingUp, MdWallet, MdPersonOutline } from "react-icons/md";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { removeCookie } from "@/utils/cookies";

const Sidebar = () => {
    // const logOut = ()=>{
    //     removeCookie('user-access')
    //     router.reload("/login")
    //   }

    return (
        <>
            <div className={` ${styles.container}`}>
                <div className={`position-relative ${styles.sidebar}`}>
                    <div className={`d-flex justify-content-center${styles.sidebarItem}`}>
                        <ul>
                            <Link href="/dashboard" className={styles.link}>
                                <li className={styles.list}>
                                    <IconContext.Provider value={{ color: "white", size: "2rem" }}>
                                        <MdOutlineSpaceDashboard className={styles.icons} />
                                    </IconContext.Provider>
                                    Dashboard
                                </li>
                            </Link>
                            <Link href="/expanses" className={styles.link}>
                                <li className={styles.list}>
                                    <IconContext.Provider value={{ color: "white", size: "2rem" }}>
                                        <MdOutlineTrendingDown className={styles.icons} />
                                    </IconContext.Provider>
                                    Expenses
                                </li>
                            </Link>
                            <Link href="/income" className={styles.link}>
                                <li className={styles.list}>
                                    <IconContext.Provider value={{ color: "white", size: "2rem" }}>
                                        <MdOutlineTrendingUp className={styles.icons} />
                                    </IconContext.Provider>
                                    Incomes
                                </li>
                            </Link>
                            <Link href="/wallet" className={styles.link}>
                                <li className={styles.list}>
                                    <IconContext.Provider value={{ color: "white", size: "2rem" }}>
                                        <MdWallet className={styles.icons} />
                                    </IconContext.Provider>
                                    Wallet
                                </li>
                            </Link>
                            <Link href="/profile" className={styles.link}>
                                <li className={styles.list}>
                                    <IconContext.Provider value={{ color: "white", size: "2rem" }}>
                                        <MdPersonOutline className={styles.icons} />
                                    </IconContext.Provider>
                                    Profile
                                </li>
                            </Link>
                            <Button className={`position-absolute top-50 start-50 translate-middle mt-5 ${styles.button}`}>Log-Out</Button>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
