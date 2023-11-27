import { IconContext } from "react-icons";
import styles from "./sidebar.module.css";
import { MdOutlineSpaceDashboard, MdOutlineTrendingDown, MdOutlineTrendingUp, MdWallet, MdPersonOutline } from "react-icons/md";
import WalletSummary from "../elements/WalletSummary";
import ExpenseForm from "../elements/asdasd";
import IncomeForm from "../elements/ModalIncomeForm";
import Link from "next/link";

const Sidebar = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <div className={styles.sidebarItem}>
                        <ul>
                            <Link href="/dashboard">
                                <IconContext.Provider value={{ color: "white", size: "2rem" }}>
                                    <MdOutlineSpaceDashboard className={styles.icons} />
                                </IconContext.Provider>
                                Dashboard
                            </Link>
                        </ul>
                        <ul>
                            <Link href="/expanses">
                                <IconContext.Provider value={{ color: "white", size: "2rem" }}>
                                    <MdOutlineTrendingDown className={styles.icons} />
                                </IconContext.Provider>
                                Expenses
                            </Link>
                        </ul>
                        <ul>
                            <Link href="/income">
                                <IconContext.Provider value={{ color: "white", size: "2rem" }}>
                                    <MdOutlineTrendingUp className={styles.icons} />
                                </IconContext.Provider>
                                Incomes
                            </Link>
                        </ul>
                        <ul>
                            <Link href="/wallet">
                                <IconContext.Provider value={{ color: "white", size: "2rem" }}>
                                    <MdWallet className={styles.icons} />
                                </IconContext.Provider>
                                Wallet
                            </Link>
                        </ul>
                        <ul>
                            <Link href="/profile">
                                <IconContext.Provider value={{ color: "white", size: "2rem" }}>
                                    <MdPersonOutline className={styles.icons} />
                                </IconContext.Provider>
                                Profile
                            </Link>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
