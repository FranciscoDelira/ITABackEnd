import { Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Menu from '../Menu';
import Footer from '../Footer';
import Stack from 'react-bootstrap/Stack';
import IconProfileUse from '/src/IconsOrders/IconProfileUser.png';
import React from 'react';
import Button from 'react-bootstrap/Button';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';

const theme = {
  nav:{
    backgroundColor:"#1B396A"
  },
  bg: {
    backgroundColor: 'white',
  },
  logo: {
    alignContent: "center",
    width: 70,
    height: 70
  },
  navImg:{
    alignContent: "center",
    weith: 40,
    height: 40
  },
  header: {
    color: 'black',
    fontSize: '96px',
    fontFamily: 'Montserrat'
  },
  fControl: {
    backgroundColor: "#ECECEC",
    borderColor: "black",
    fontFamily: 'Montserrat',
    fontSize: '20px',
    width: '17%',
    borderRadius: 50
  },
  fHText: {
    color: 'white',
    fontFamily: 'Montserrat',
    fontSize: '20px'
  },
  fDText: {
    color: 'white',
    fontFamily: 'Montserrat',
    fontSize: '30px'
  },
  button: {
    color: 'white',
    fontSize: '20px',
    backgroundColor: '#1B396A',
    borderRadius: 15
  },
  optionIcons: {
    align: "center",
    width: 350,
    height: 100
  }
};

const card = {
  backgroundColor: "blue"
};

function Profile(){
    return (
      <>
      <section>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="3">
          </MDBCol>
          <MDBCol lg="6">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">Johnatan Smith</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">example@example.com</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">(097) 234-5678</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Mobile</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">(098) 765-4321</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">Bay Area, San Francisco, CA</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="12" align="center">
                    <br/>
                    <Button style={theme.button} href="#" >Editar Perfil</Button>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
      </>
    );
}
export default Profile;