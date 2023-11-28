import DropzoneUploader from '@/components/elements/DropzoneUploader';
import React, { useEffect, useState } from 'react';

import { getUserDetail } from '@/rest_API/users_api';
import { Col, Row,Card } from 'react-bootstrap';


const Profile = () => {


    const [userDetail,setUserDetail] = useState([])
    useEffect(()=>{
      fetchData()
    },[])

    const fetchData = async ()=>{
      const response = await getUserDetail()
      setUserDetail(response)
    }

  return (
    <div className="container mt-5">
    <Row>
      <Col md={7}>
        <Card className="mb-4 p-4 card">
          <h1 className="mb-4 card-title">Profile Page</h1>
  
          <div className="mb-4 profile-info">
            <h3>Name</h3>
            <p>{userDetail.name}</p>
            <h3>Email</h3>
            <p>{userDetail.email}</p>
          </div>
  
          <h2 className="change-photo">Change Photo</h2>
          <DropzoneUploader fetchData={fetchData} />
        </Card>
      </Col>
  
      <Col md={5}>
        <Card className="p-4 card">
          {userDetail.user_image ? (
            <img src={userDetail.user_image} className="img-fluid user-image" alt="User" />
          ) : (
            <h1 className="no-photo-text">No photo available</h1>
          )}
        </Card>
      </Col>
    </Row>
  </div>
  );
}

export default Profile;