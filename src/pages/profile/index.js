import DropzoneUploader from '@/components/elements/DropzoneUploader';
import React, { useEffect, useState } from 'react';

import { getUserDetail } from '@/rest_API/users_api';
import { Col, Row } from 'react-bootstrap';
import Loading from '@/components/layouts/loading/Loading';


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
    <>
    
    <Loading/>
    <div className="container mt-5">
      <Row>
        <Col md="7">
        <h1 className="mb-4">Profile Page</h1>
      <div>
        <h3>Name</h3>
        <p>{userDetail.name}</p>
        <h3>email</h3>
        <p>{userDetail.email}</p>
      </div>

        <h2>Change Photo</h2>
        <DropzoneUploader fetchData={fetchData}/>
        </Col>
        <Col md="5">
          {(userDetail.user_image)? <img src={userDetail.user_image} style={{width:"500px"}}></img> : <h1>blom ada poto</h1> }
          
        </Col>
      </Row>

    </div>
    </>
  );
}

export default Profile;