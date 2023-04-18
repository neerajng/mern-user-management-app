import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { MDBCol, MDBFile, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import Layout from '../../components/Layout';
import { changeUserImage, getUserData } from '../../features/auth/authSlice';
import Spinner from "../../components/Spinner";


function Profile() {
  const [photo, setPhoto] = useState('')
  const dispatch = useDispatch()
  const { user, isError, isLoading, message } = useSelector((state) => state.auth)



  const addphoto = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("file", photo);
    data.append("upload_preset", "wcb1tccy");
    data.append("cloud_name", "dewhw64ql");
            
    fetch("https://api.cloudinary.com/v1_1/dewhw64ql/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch(changeUserImage(data.url))
      })
      .catch(err => console.log(err))
  };

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);


  if (isLoading) {
    return <Spinner />
  }
 console.log(user,'in user profile')
  return (
    <Layout title='User Profile'>
      <MDBContainer>
        <MDBRow className="justify-content-center">
          <MDBCol md="12" lg="12" xl="12" className="mt-5">
            <MDBCard style={{ borderRadius: '15px' }}>
              <MDBCardBody className="p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                    {
                      <MDBCardImage
                        style={{ width: '180px', borderRadius: '10px' }}
                        src={
                          user?.image_url
                            ? user.image_url
                            : "https://d29fhpw069ctt2.cloudfront.net/icon/image/37746/preview.svg"
                        }
                        alt='Generic placeholder image'
                        fluid />
                    }
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <MDBCardTitle> Name: {user?.name}</MDBCardTitle>
                    <MDBCardText>Email: {user?.email}</MDBCardText>

                    <form>
                      <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                        style={{ backgroundColor: '#efefef' }}>
                        <MDBFile size='lg' id='formFileLg' onChange={(e) => setPhoto(e.target.files[0])} />
                      </div>

                      <div className="d-flex pt-1">
                        <button onClick={addphoto} className="me-1 flex-grow-1 fw-bold bg-warning border-warning rounded-pill" >
                          Add Profile Picture</button>
                      </div>
                    </form>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <Link to={'/'} >
        <MDBBtn className='mx-1 rounded-pill' color='success' size='lg' style={{ width: 500, margin: 20 }}>
          Return to Home
        </MDBBtn>
      </Link>

    </Layout>
  )
}

export default Profile
