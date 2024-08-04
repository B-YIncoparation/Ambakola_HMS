import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useAsyncError } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboard,
  faCircleCheck,
  faN,
} from "@fortawesome/free-solid-svg-icons";
import { ClipLoader } from "react-spinners";
import Button from "react-bootstrap/Button";
import Logo from "../Resources/sanda.jpg";
import { FloatingLabel, Form, InputGroup, Alert } from "react-bootstrap";
import "../StyleSheets/CreateAcc.css";
import Col from "react-bootstrap/Col";
import axios from "axios";
import CopyToClipboard from "react-copy-to-clipboard";
export default function AccountCreate() {
  const [loading, setLoading] = useState(true);
  const [validated, setValidated] = useState(false);
  const [profileImg, setProfileImg] = useState("");
  const [isCopied, setCopied] = useState(false);
  const [empId, setEmpId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [position, setPosition] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(true);
  const [users, setUsers] = useState([]);
  const [isCreated, setCreated] = useState(false);
  const [valid, setValide] = useState(true);

  /*  */
  const [nameExist, setNameExist] = useState(false);
  const [validEmail, setValidEmail] = useState(true);
  const [validTp, setValidTp] = useState(true);
  const [validPw, setValidPw] = useState(true);
  const [erMsg,setErMsg]=useState("");

  /* Get currunt employe's Details */
  useEffect(() => {
    axios
      .get("http://localhost:8080/Employes")
      .then((res) => {
        setUsers(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log({ message: err.message });
      });
  }, []);

  /* Set Values */
  const addProfileImage = (event) => {
    setProfileImg(event.target.value);
  };
  const addFirstName = (event) => {
    setFirstName(event.target.value);
  };
  const addLastName = (event) => {
    setLastName(event.target.value);
  };
  const addEmail = (event) => {
    setEmail(event.target.value);
  };
  const addAddress = (event) => {
    setAddress(event.target.value);
  };
  const addContactNo = (event) => {
    setContactNo(event.target.value);
  };
  const addPosition = (event) => {
    setPosition(event.target.value);
  };
  const addpassword = (event) => {
    setPassword(event.target.value);
  };

  /* Validate user information */

/* check user Name exsist */
  const isUserNameValid = (firstName, lastName) => {
    users.forEach((user) => {
      const fName = user.firstName.toString();
      const lName = user.lastName.toString();
      if (
        fName.toLowerCase() == firstName.toLowerCase() &&
        lName.toLowerCase() == lastName.toLowerCase()
      ) {
        setNameExist(true);
        setValide(false);
      } else {
        setNameExist(false);
        setValide(true);
      }
    });
  };
  useEffect(() => {
    isUserNameValid(firstName, lastName);
  }, [firstName, lastName]);

  /* Check Email  */
  const isEmailValid = (email) => {
    
    if(email.includes("@")){
      setValide(false);
      setValidEmail(false);

    }else{
      setValidEmail(true);
      setValide(true);
    }
  };
  useEffect(() => {
    isEmailValid(email);
  }, [email]);

  /* Check check contact No */
  const isTpValid = (contactNo) => {
    
    const regex=/^\d{10}$/
    if(!regex.test(contactNo)){
        setValidTp(false);
        setValide(false);
    }else{
      setValide(true);
      setValidTp(true);
    }
  };
 
    
  const handleOnTpValidation=()=>{
      isTpValid(contactNo);
  }
  const handleOnChange=(e)=>{
   
      setValide(true);
      setValidTp(true);
    
  }
  
  /* Check Password  */

  const checkPw=(password)=>{
    
    if(password.length<8){
      setErMsg("Password too Weak! Password should contain more than 8 characters")
      setValidPw(false);
      setValide(false);
    }
    else if(!/[a-z]/.test(password)){
      setErMsg("Password too Weak! Password should contain at least one lower case letter")
        setValidPw(false);
        setValide(false);
    }
    else if(!/[A-Z]/.test(password)){
      setErMsg("Password too Weak! Password should contain at least one upper case letter")
      setValidPw(false);
      setValide(false);
    }else if(!/[0-9]/.test(password)){
      setErMsg("Password too Weak! Password should contain at least one number")
      setValidPw(false);
      setValide(false);
    }else if(!/[^A-Za-z0-9]/.test(password)){
      setErMsg("Password too Weak! Password should contain at least one special character")
      setValidPw(false);
      setValide(false);
    }
    else{
      setValidPw(true);
      setValide(true);
    }
  }

  const handlePwValidation=()=>{
    checkPw(password);
  }
  const handlePwChanges=(e)=>{
    console.log(password);
    setValidPw(true);
    setValide(true);
  }
  /* Submit data */

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (!form.checkValidity() || !valid) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const formData = new FormData();
      formData.append("profile-image", profileImg);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("eMail", email + "@gmail.com");
      formData.append("address", address);
      formData.append("contactNo", contactNo);
      formData.append("position", position);
      formData.append("password", password);
      formData.append("availability", "available");

      axios
        .post("http://localhost:8080/Employes/add-employe", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          console.log("done");
          axios
            .get(
              `http://localhost:8080/Employes/full-name/${firstName + lastName}`
            )
            .then((res) => {
              setLoading(false);
              setUsers(res.data);
              setEmpId(res.data.empId);
              console.log("NEW DATA-->" + res.data.empId);
            })
            .catch((err) => {
              console.log({ message: err.message });
            });
          setCreated(true);
        })
        .catch((err) => {
          console.log({ message: err.message });
        });
    }

    setValidated(true);
  };

  return (
    <div className="create-account-body">
      <section className={isCreated ? "form-Body blur" : "form-Body"}>
        <section className="image-panel">
          <div className="account-page-logo">
            <img src={Logo} />
          </div>
          <h1 className="color-white">Welcome to Sanda Asapuwa</h1>
        </section>
        <section className="form-panel">
          <h1>Create New Account</h1>
         {nameExist ? 
            <Alert key="danger" variant="danger" >
              User Name Exist
            </Alert>
            :
            <></>
        }
        {!validEmail ? 
            <Alert key="danger" variant="danger" >
              Email is Not Valid
            </Alert>
            :
            <></>
        }
         {!validTp ? 
            <Alert key="danger" variant="danger" >
              Contact Number is Not Valid
            </Alert>
            :
            <></>
        }
          {!validPw ? 
            <Alert key="danger" variant="danger" >
              {erMsg}
            </Alert>
            :
            <></>
        }
          <div className="form-container">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label htmlFor="profile" />
                <Form.Control
                  type="text"
                  id="profile"
                  onChange={(e) => {
                    addProfileImage(e);
                  }}
                  placeholder="Profile Picture"
                  required
                />
                <Form.Control.Feedback
                  type="invalid"
                  className="bold"
                ></Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="firstName" />
                <Form.Control
                  type="text"
                  id="firstName"
                  onChange={(e) => {
                    addFirstName(e);
                  }}
                  placeholder="First Name"
                  required
                />
                <Form.Control.Feedback type="invalid" className="bold">
                  Cannot be empty!
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="lastName" />
                <Form.Control
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => {
                    addLastName(e);
                  }}
                  placeholder="Last Name"
                  required
                />
                <Form.Control.Feedback type="invalid" className="bold">
                  Enter Last name
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="mail" />
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    id="mail"
                    value={email}
                    placeholder="email"
                    onChange={(e) => {
                      addEmail(e);
                      
                    }}
                    required
                  />
                  <InputGroup.Text className="bold">@Gmail.com</InputGroup.Text>
                  <Form.Control.Feedback type="invalid" className="bold">
                    Enter e-mail address
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="contact" />
                <Form.Control
                  type="text"
                  id="contact"
                  value={contactNo}
                  onChange={(e) => {
                    addContactNo(e);
                    handleOnChange(e);
                  }}
                  placeholder="Contact No"
                  onBlur={handleOnTpValidation}
                  required
                />
                <Form.Control.Feedback type="invalid" className="bold">
                  Enter your contact number
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="address" />
                <Form.Control
                  type="text"
                  id="address"
                  onChange={(e) => {
                    addAddress(e);
                  }}
                  placeholder="Address"
                  required
                />
                <Form.Control.Feedback type="invalid" className="bold">
                  Enter your Address
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="position">Position</Form.Label>
                <Form.Select
                  id="position"
                  onChange={(e) => {
                    addPosition(e);
                  }}
                  required
                >
                  <option value="">Select Position</option>
                  <option value="position1">Admin</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid" className="bold">
                  Enter Correct Position
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="pw" />
                <Form.Control
                  type="password"
                  id="pw"
                  value={password}
                  onChange={(e) => {
                    addpassword(e);
                    handlePwChanges(e);
                  }}
                  placeholder="password"
                  onBlur={handlePwValidation}
                  required
                />
                <Form.Control.Feedback type="invalid" className="bold">
                  Enter Correct Password
                </Form.Control.Feedback>
              </Form.Group>
              <Button type="submit" className="btnCreate">
                <div className="bold">Create</div>
              </Button>
            </Form>
          </div>
        </section>
      </section>
      <div
        className={
          isCreated
            ? "welcome-alert-container display-block"
            : "welcome-alert-container display-none"
        }
      >
        <div>
          <h2>welcome to</h2>
          <h2>Sanda Asapuwa</h2>
        </div>
        <div>
          <h3 className="id-body">
            Your Employee ID :
            <button
              className="copy"
              onClick={() => setCopied(true)}
              title={isCopied ? "Copied" : "Copy to clipboard"}
            >
              <ClipLoader
                color="white"
                loading={loading}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              <CopyToClipboard text={empId}>
                <span>
                  {" "}
                  {empId}{" "}
                  {isCopied ? (
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      style={{ color: "white" }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faClipboard}
                      style={{ color: "white" }}
                    />
                  )}{" "}
                </span>
              </CopyToClipboard>
            </button>
          </h3>
          <Link to="/">
            <Button type="button" className="btnLogin" title="tooltip">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
