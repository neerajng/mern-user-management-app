import { useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useSelector } from "react-redux"
import Layout from "../../components/Layout"
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardImage,
  MDBRipple,
} from 'mdb-react-ui-kit';


function Dashboard() {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  return (
    <Layout title='home'>
      <section className="page-name px-5 pb-5 " >
        
        <MDBCard style={{ width: '35%'}} >

          <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
            <MDBCardImage style={{ width: '100%' }} src={user ? user.image_url? user.image_url : 'https://d29fhpw069ctt2.cloudfront.net/icon/image/37746/preview.svg':''} alt="" />         
          </MDBRipple>

          <MDBCardBody>
            <MDBCardTitle className="fw-bolder"> Name: {user ? user.name : ''} </MDBCardTitle>
            <Link to={'/user'} >
              <button className="btn btn-warning fw-bold">Update profile</button>
            </Link>
          </MDBCardBody>
        </MDBCard>
        
      </section>    
       
    </Layout>
    
    
  )
}

export default Dashboard
