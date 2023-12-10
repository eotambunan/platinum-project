import DropzoneUploader from "@/components/elements/DropzoneUploader";
import React, { useEffect, useState } from "react";

import { getUserDetail } from "@/rest_API/users_api";
import { Col, Row, Card } from "react-bootstrap";
import Loading from "@/components/layouts/loading/Loading";

import styles from "./profile.module.css"
import { useRouter } from "next/router";

const Profile = () => {
    const [userDetail, setUserDetail] = useState([]);



    useEffect(() => {
            fetchData();
    }, []);



    const fetchData = async () => {
        const response = await getUserDetail();
        setUserDetail(response);
    };

    return (
        <>
            <Loading />
            <div className="container mt-5">
                <Row>
                    <Col md={5}>
                        <Card className="p-4 card">{userDetail.user_image ? <img src={userDetail.user_image} className={`${styles.userImage}`} alt="User" /> : <h1 className="no-photo-text">No photo available</h1>}</Card>
                    </Col>
                    <Col md={7}>
                        <Card className="mb-4 p-4 card">
                            <h1 className={`${styles.cardTitle}`}>Profile Page</h1>

                            <div className="mb-4 profile-info">
                                <h3 className={styles.profileInfoH3}>Name</h3>
                                <p>{userDetail.name}</p>
                                <h3 className={styles.profileInfoH3}>Email</h3>
                                <p>{userDetail.email}</p>
                            </div>

                            <h2 className="change-photo">Change Photo</h2>
                            <DropzoneUploader fetchData={fetchData} />
                        </Card>
                    </Col>

                </Row>
            </div>
        </>
    );
};

export default Profile;
