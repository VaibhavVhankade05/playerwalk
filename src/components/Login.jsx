import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/login.css";
import logo from "../assets/Logo.png";

function getStoredUsers() {
  try {
    const raw = localStorage.getItem("pw_users");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function saveUsers(arr) {
  localStorage.setItem("pw_users", JSON.stringify(arr));
}

/* Simple OTP generator for demo */
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export default function Login() {
  const navigate = useNavigate();

  const [view, setView] = useState("login"); 
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");

  // signup-phone specific fields
  const [signupPhone, setSignupPhone] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  // email signup
  const [signupEmail, setSignupEmail] = useState("");
  const [signupEmailName, setSignupEmailName] = useState("");
  const [signupEmailPassword, setSignupEmailPassword] = useState("");

  // OTP states
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otpContext, setOtpContext] = useState(null); // 'signup' or 'login' and meta info

  const [message, setMessage] = useState("");

  /* ---------------- Helpers ---------------- */
  function showMsg(msg) {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3500);
  }

  /* ---------------- Signup phone flow (send OTP then verify) ---------------- */
  function startPhoneSignup() {
    if (!signupName.trim() || !signupPhone.trim() || !signupPassword.trim()) {
      showMsg("Please fill name, phone and password");
      return;
    }
    const users = getStoredUsers();
    if (users.find((u) => u.phone === signupPhone)) {
      showMsg("Phone already registered. Try logging in.");
      return;
    }
    const otp = generateOtp();
    setGeneratedOtp(otp);
    setOtpContext({ type: "phone-signup", phone: signupPhone, name: signupName, password: signupPassword });
    // In real app: send OTP via SMS provider. For demo we log it:
    console.log("Signup OTP:", otp);
    showMsg(`OTP sent to ${signupPhone} (check console in dev)`);
    setView("phoneSignupOtp");
  }

  function verifyPhoneSignupOtp() {
    if (enteredOtp === generatedOtp) {
      // save user
      const users = getStoredUsers();
      users.push({ type: "phone", fullName: otpContext.name, phone: otpContext.phone, password: otpContext.password });
      saveUsers(users);
      setGeneratedOtp(null);
      setEnteredOtp("");
      showMsg("Signup successful — logged in");
      // redirect to home
      navigate("/home");
    } else {
      showMsg("Incorrect OTP");
    }
  }

  /* ---------------- Email signup (no OTP) ---------------- */
  function submitEmailSignup() {
    if (!signupEmailName.trim() || !signupEmail.trim() || !signupEmailPassword.trim()) {
      showMsg("Please fill name, email and password");
      return;
    }
    const users = getStoredUsers();
    if (users.find((u) => u.email === signupEmail)) {
      showMsg("Email already registered. Try login.");
      return;
    }
    users.push({ type: "email", fullName: signupEmailName, email: signupEmail, password: signupEmailPassword });
    saveUsers(users);
    showMsg("Signup successful — logged in");
    navigate("/home");
  }

  /* ---------------- Login flows ---------------- */
  // Email login (email + password)
  function submitEmailLogin() {
    if (!email.trim() || !password.trim()) {
      showMsg("Please fill email and password");
      return;
    }
    const users = getStoredUsers();
    const found = users.find((u) => u.type === "email" && u.email === email && u.password === password);
    if (found) {
      showMsg("Login successful");
      navigate("/home");
    } else {
      showMsg("Invalid email or password");
    }
  }

  // Phone login (phone + password) -> then OTP -> verify -> redirect
  function startPhoneLogin() {
    if (!phone.trim() || !password.trim()) {
      showMsg("Please fill phone and password");
      return;
    }
    const users = getStoredUsers();
    const found = users.find((u) => u.type === "phone" && u.phone === phone && u.password === password);
    if (!found) {
      showMsg("Invalid phone or password");
      return;
    }
    // send OTP
    const otp = generateOtp();
    setGeneratedOtp(otp);
    setOtpContext({ type: "phone-login", phone });
    console.log("Login OTP:", otp);
    showMsg("OTP sent (check console in dev)");
    setView("otp");
  }

  function verifyPhoneLoginOtp() {
    if (enteredOtp === generatedOtp) {
      setGeneratedOtp(null);
      setEnteredOtp("");
      showMsg("Login successful");
      navigate("/home");
    } else {
      showMsg("Incorrect OTP");
    }
  }

  /* ---------------- Dummy Google auth ---------------- */
  function dummyGoogle() {
    showMsg("Google auth not implemented. This is a dummy button.");
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="container-fluid login-landing">
      <div className="row w-100 align-items-center">
        {/* LEFT */}
        <div className="col-lg-6 col-md-12 left-section">
          <img src={logo} alt="PlayerWalk Logo" className="left-logo" />
          <h1 className="headline">
            Where Sports <br />
            <span className="orange">Dreams Connect</span>
          </h1>
          <p className="subtitle">
            Join India's premier multi-sport discovery platform. Connect with players, coaches, and academies.
          </p>

          <div className="features">
            <div className="feature-item">
              <div className="icon-box"><i className="fa-solid fa-users"></i></div>
              <div>
                <p className="feature-title">10K+ Players</p>
                <p className="feature-text">Active sports community</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="icon-box"><i className="fa-solid fa-trophy"></i></div>
              <div>
                <p className="feature-title">500+ Coaches</p>
                <p className="feature-text">Expert guidance available</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="icon-box"><i className="fa-solid fa-shield"></i></div>
              <div>
                <p className="feature-title">Verified Profiles</p>
                <p className="feature-text">Trusted by sports community</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-lg-6 col-md-12 d-flex justify-content-center mt-4 mt-lg-0">
          <div className="login-card">
            {message && <div className="message-box">{message}</div>}

            {/* Login main */}
            {view === "login" && (
              <>
                <h2>Welcome Back</h2>
                <p className="card-subtext">Sign in to continue your sports journey</p>

                <div className="login-option google-hover" onClick={dummyGoogle}>
                  <i className="fa-brands fa-google"></i><span>Continue with Google</span>
                </div>

                <p className="or-text">or continue with</p>

                <div className="login-option" onClick={() => { setPhone(""); setPassword(""); setView("phone-login-form"); }}>
                  <i className="fa-solid fa-phone"></i><span>Phone Number</span>
                </div>

                <div className="login-option" onClick={() => { setEmail(""); setPassword(""); setView("email-login-form"); }}>
                  <i className="fa-solid fa-envelope"></i><span>Email Address</span>
                </div>

                <p className="terms">By continuing, you agree to PlayerWalk's Terms of Service and Privacy Policy.</p>

                <p className="signup-text">
                  Don't have an account? <span className="orange-link" onClick={() => setView("signup")}>Sign up</span>
                </p>
              </>
            )}

            {/* Signup main */}
            {view === "signup" && (
              <>
                <h2>Create Account</h2>
                <p className="card-subtext">Choose how you'd like to create your account</p>

                <div className="login-option google-hover" onClick={dummyGoogle}>
                  <i className="fa-brands fa-google"></i><span>Continue with Google</span>
                </div>

                <p className="or-text">or continue with</p>

                <div className="login-option" onClick={() => { setSignupName(""); setSignupPhone(""); setSignupPassword(""); setView("phone-signup-form"); }}>
                  <i className="fa-solid fa-phone"></i><span>Phone Number</span>
                </div>

                <div className="login-option" onClick={() => { setSignupEmailName(""); setSignupEmail(""); setSignupEmailPassword(""); setView("email-signup-form"); }}>
                  <i className="fa-solid fa-envelope"></i><span>Email Address</span>
                </div>

                <p className="terms">By continuing, you agree to PlayerWalk's Terms of Service and Privacy Policy</p>

                <p className="signup-text">
                  Already have an account? <span className="orange-link" onClick={() => setView("login")}>Sign in</span>
                </p>
              </>
            )}

            {/* Phone signup form -> send OTP */}
            {view === "phone-signup-form" && (
              <>
                <h2>Sign up with Phone</h2>
                <p className="card-subtext">Enter details to create account</p>

                <label className="mb-2 mt-3">Full Name</label>
                <input className="form-control phone-input" placeholder="Your full name" value={signupName} onChange={(e) => setSignupName(e.target.value)} />

                <label className="mb-2 mt-3">Phone</label>
                <input className="form-control phone-input" placeholder="+91 98765 43210" value={signupPhone} onChange={(e) => setSignupPhone(e.target.value)} />

                <label className="mb-2 mt-3">Password</label>
                <input type="password" className="form-control phone-input" placeholder="Password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} />

                <button className="btn btn-orange w-100 mt-4" onClick={startPhoneSignup}>Send OTP & Continue</button>
                <button className="btn-back w-100 mt-3" onClick={() => setView("signup")}><i className="fa-solid fa-arrow-left"></i> Back</button>
              </>
            )}

            {/* Phone signup OTP verify */}
            {view === "phoneSignupOtp" && (
              <>
                <h2>Verify OTP</h2>
                <p className="card-subtext">Enter the OTP sent to {otpContext?.phone}</p>

                <input className="form-control otp-input" placeholder="Enter 6-digit OTP" value={enteredOtp} onChange={(e) => setEnteredOtp(e.target.value)} />
                <button className="btn btn-orange w-100 mt-4" onClick={verifyPhoneSignupOtp}>Verify & Create Account</button>
                <button className="btn-back w-100 mt-3" onClick={() => setView("phone-signup-form")}><i className="fa-solid fa-arrow-left"></i> Back</button>
              </>
            )}

            {/* Email signup form */}
            {view === "email-signup-form" && (
              <>
                <h2>Sign up with Email</h2>
                <p className="card-subtext">Enter details to create account</p>

                <label className="mb-2 mt-3">Full Name</label>
                <input className="form-control email-input" placeholder="Your full name" value={signupEmailName} onChange={(e) => setSignupEmailName(e.target.value)} />

                <label className="mb-2 mt-3">Email</label>
                <input className="form-control email-input" placeholder="you@example.com" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} />

                <label className="mb-2 mt-3">Password</label>
                <input type="password" className="form-control email-input" placeholder="Password" value={signupEmailPassword} onChange={(e) => setSignupEmailPassword(e.target.value)} />

                <button className="btn btn-orange w-100 mt-4" onClick={submitEmailSignup}>Create Account</button>
                <button className="btn-back w-100 mt-3" onClick={() => setView("signup")}><i className="fa-solid fa-arrow-left"></i> Back</button>
              </>
            )}

            {/* Phone login form */}
            {view === "phone-login-form" && (
              <>
                <h2>Sign in with Phone</h2>
                <p className="card-subtext">Enter phone & password</p>

                <label className="mb-2 mt-3">Phone</label>
                <input className="form-control phone-input" placeholder="+91 98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} />

                <label className="mb-2 mt-3">Password</label>
                <input type="password" className="form-control phone-input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button className="btn btn-orange w-100 mt-4" onClick={startPhoneLogin}>Send OTP</button>
                <button className="btn-back w-100 mt-3" onClick={() => setView("login")}><i className="fa-solid fa-arrow-left"></i> Back</button>
              </>
            )}

            {/* OTP verification (for phone login) */}
            {view === "otp" && (
              <>
                <h2>Enter OTP</h2>
                <p className="card-subtext">OTP sent to {otpContext?.phone || phone}</p>

                <input className="form-control otp-input" placeholder="Enter 6-digit OTP" value={enteredOtp} onChange={(e) => setEnteredOtp(e.target.value)} />

                <button className="btn btn-orange w-100 mt-4" onClick={verifyPhoneLoginOtp}>Verify & Continue</button>
                <button className="btn-back w-100 mt-3" onClick={() => setView("phone-login-form")}><i className="fa-solid fa-arrow-left"></i> Back</button>
              </>
            )}

            {/* Email login form */}
            {view === "email-login-form" && (
              <>
                <h2>Sign in with Email</h2>
                <p className="card-subtext">Enter your email & password</p>

                <label className="mb-2 mt-3">Email</label>
                <input className="form-control email-input" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label className="mb-2 mt-3">Password</label>
                <input type="password" className="form-control email-input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button className="btn btn-orange w-100 mt-4" onClick={submitEmailLogin}>Continue</button>
                <button className="btn-back w-100 mt-3" onClick={() => setView("login")}><i className="fa-solid fa-arrow-left"></i> Back</button>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
