import React, { useState } from "react";
import axios from "axios";
import {
  FaUserMd,
  FaHospital,
  FaAmbulance,
  FaPhoneAlt,
  FaClipboardList,
} from "react-icons/fa";
import punjabLogo from "./assets/punjab-logo.png";
import docImg from "./assets/doc.png";

// Translations main of the system . 
const translations = {
  en: {
    title: "AROGYAM",
    hospitals: "Hospitals",
    doctors: "Doctors",
    services: "Services",
    contact: "Contact",
    notice:
      "🚑 Free Health Camp on 2nd October | 💉 Free Vaccinations of Polio Available in All PHCs | 🏥 New Cancer Care Facility Opened in Amritsar",
    welcome: "Welcome Back",
    signin: "Sign in to access AROGYAM Portal",
    login: "Login",
    signup: "Signup",
    emergency: "Emergency",
    emergencyDesc:
      "Immediate medical help, call ambulance or connect with nearby hospital.",
    normal: "Normal Consultation",
    normalDesc:
      "Book appointments, check symptoms, or consult doctors online.",
    ai: "🤖 Chat with AI Assistant",
    dashboard: "Dashboard",
    departments: "Departments",
  },
  hi: {
    title: "पंजाब स्वास्थ्य पोर्टल",
    hospitals: "अस्पताल",
    doctors: "डॉक्टर",
    services: "सेवाएं",
    contact: "संपर्क",
    notice:
      "🚑 2 अक्टूबर को निःशुल्क स्वास्थ्य शिविर | 💉 सभी पीएचसी में कोविड-19 टीकाकरण उपलब्ध | 🏥 अमृतसर में नया कैंसर देखभाल केंद्र खोला गया",
    welcome: "वापसी पर स्वागत है",
    signin: "पंजाब हेल्थकेयर पोर्टल तक पहुंचने के लिए साइन इन करें",
    login: "लॉगिन",
    signup: "साइनअप",
    emergency: "आपातकालीन",
    emergencyDesc:
      "तुरंत चिकित्सा सहायता, एम्बुलेंस कॉल करें या निकटतम अस्पताल से जुड़ें।",
    normal: "सामान्य परामर्श",
    normalDesc:
      "अपॉइंटमेंट बुक करें, लक्षण जांचें या डॉक्टर से ऑनलाइन परामर्श करें।",
    ai: "🤖 एआई सहायक से चैट करें",
    dashboard: "डैशबोर्ड",
    departments: "विभाग",
  },
  pa: {
    title: "ਪੰਜਾਬ ਸਿਹਤ ਪੋਰਟਲ",
    hospitals: "ਹਸਪਤਾਲ",
    doctors: "ਡਾਕਟਰ",
    services: "ਸੇਵਾਵਾਂ",
    contact: "ਸੰਪਰਕ",
    notice:
      "🚑 2 ਅਕਤੂਬਰ ਨੂੰ ਮੁਫ਼ਤ ਸਿਹਤ ਕੈਂਪ | 💉 ਸਾਰੇ ਪੀਐਚਸੀਜ਼ ਵਿੱਚ ਕੋਵਿਡ-19 ਟੀਕਾਕਰਣ ਉਪਲਬਧ | 🏥 ਅੰਮ੍ਰਿਤਸਰ ਵਿੱਚ ਨਵਾਂ ਕੈਂਸਰ ਦੇਖਭਾਲ ਕੇਂਦਰ ਖੁੱਲਿਆ",
    welcome: "ਵਾਪਸੀ 'ਤੇ ਸਵਾਗਤ ਹੈ",
    signin: "ਪੰਜਾਬ ਹੈਲਥਕੇਅਰ ਪੋਰਟਲ 'ਤੇ ਪਹੁੰਚਣ ਲਈ ਸਾਇਨ ਇਨ ਕਰੋ",
    login: "ਲਾਗਿਨ",
    signup: "ਸਾਇਨਅਪ",
    emergency: "ਐਮਰਜੈਂਸੀ",
    emergencyDesc:
      "ਤੁਰੰਤ ਚਿਕਿਤਸਕ ਮਦਦ, ਐਂਬੂਲੈਂਸ ਨੂੰ ਕਾਲ ਕਰੋ ਜਾਂ ਨੇੜਲੇ ਹਸਪਤਾਲ ਨਾਲ ਜੁੜੋ।",
    normal: "ਸਧਾਰਣ ਸਲਾਹ",
    normalDesc:
      "ਮੁਲਾਕਾਤਾਂ ਬੁੱਕ ਕਰੋ, ਲੱਛਣ ਜਾਂਚੋ ਜਾਂ ਡਾਕਟਰਾਂ ਨਾਲ ਆਨਲਾਈਨ ਸਲਾਹ ਕਰੋ।",
    ai: "🤖 ਏਆਈ ਸਹਾਇਕ ਨਾਲ ਗੱਲਬਾਤ ਕਰੋ",
    dashboard: "ਡੈਸ਼ਬੋਰਡ",
    departments: "ਵਿਭਾਗ",
  },
};

// Dummy departments & doctors for Dashboard
const departments = [
  {
    name: "Cardiology",
    doctors: ["Dr. A Singh", "Dr. B Sharma", "Dr. C Kumar"],
  },
  {
    name: "Neurology",
    doctors: ["Dr. D Kaur", "Dr. E Mehta", "Dr. F Reddy"],
  },
  {
    name: "Pediatrics",
    doctors: ["Dr. G Patel", "Dr. H Joshi", "Dr. I Verma"],
  },
];
//main server of th eustemof the system works.
function App() {
  const [lang, setLang] = useState("en");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const t = translations[lang];
  const whatsappNumber = "919876543210";

  // Login
  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", { email, password });
      setUsername(res.data.username);
      setIsLoggedIn(true);
      alert("Login successful!");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  // Signup
  const handleSignup = async () => {
    try {
      const res = await axios.post("http://localhost:5000/signup", {
        email,
        password,
        username,
      });
      alert(res.data.message);
      setShowSignup(false);
      setUsername(username);
      setIsLoggedIn(true);
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-green-700 text-white flex justify-between items-center px-6 py-3 shadow-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <img src={punjabLogo} alt="Punjab Logo" className="h-12 w-12" />
          <h1 className="text-2xl font-bold">{t.title}</h1>
        </div>
        <div className="flex gap-4 items-center text-lg">
          <button className="hover:text-yellow-300 flex items-center gap-1">
            <FaHospital /> {t.hospitals}
          </button>
          <button className="hover:text-yellow-300 flex items-center gap-1">
            <FaUserMd /> {t.doctors}
          </button>
          <button className="hover:text-yellow-300 flex items-center gap-1">
            <FaClipboardList /> {t.services}
          </button>
          <button className="hover:text-yellow-300 flex items-center gap-1">
            <FaPhoneAlt /> {t.contact}
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setLang("en")}
            className={`px-3 py-1 rounded ${
              lang === "en" ? "bg-white text-green-700" : "bg-green-600"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLang("hi")}
            className={`px-3 py-1 rounded ${
              lang === "hi" ? "bg-white text-green-700" : "bg-green-600"
            }`}
          >
            HI
          </button>
          <button
            onClick={() => setLang("pa")}
            className={`px-3 py-1 rounded ${
              lang === "pa" ? "bg-white text-green-700" : "bg-green-600"
            }`}
          >
            ਪੰ
          </button>
        </div>
      </header>

      {/* Scrolling Notice */}
      <div className="bg-yellow-200 text-red-700 font-semibold py-2 px-4 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
          {t.notice}
        </div>
      </div>

      <main className="flex flex-col items-center mt-12">
        {!isLoggedIn ? (
          // Login / Signup Card
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-96">
              <h2 className="text-2xl font-bold text-green-700 mb-4">
                {showSignup ? "Create Account" : t.welcome}
              </h2>
              <p className="text-gray-600 mb-6">
                {showSignup ? "Fill details to signup" : t.signin}
              </p>

              {showSignup && (
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 mb-3"
                />
              )}

              <input
                type="text"
                placeholder="Email / Phone"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 mb-3"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 mb-3"
              />

              <button
                className="w-full bg-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-800"
                onClick={showSignup ? handleSignup : handleLogin}
              >
                {showSignup ? t.signup : t.login}
              </button>
              <button
                className="w-full border border-green-700 text-green-700 py-2 rounded-lg font-semibold mt-3 hover:bg-green-50"
                onClick={() => setShowSignup(!showSignup)}
              >
                {showSignup ? "Back to Login" : "Create Account"}
              </button>
            </div>

            <div>
              <img
                src={docImg}
                alt="Doctor"
                className="max-w-sm rounded-xl shadow-lg"
              />
            </div>
          </div>
        ) : (
          // Dashboard after login
          <div className="w-full max-w-5xl flex flex-col gap-6 mb-20">
            <h2 className="text-3xl font-bold text-green-700 mb-4">
              {t.dashboard}, {username}!
            </h2>
            {departments.map((dept, i) => (
              <div key={i} className="bg-white shadow-lg rounded-xl p-6">
                <h3 className="text-2xl font-semibold mb-3">
                  {t.departments}: {dept.name}
                </h3>
                <ul className="list-disc list-inside">
                  {dept.doctors.map((doc, j) => (
                    <li key={j}>{doc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Emergency & Normal Section */}
        {isLoggedIn && (
          <section className="w-full max-w-5xl flex flex-col md:flex-row gap-8 justify-center items-center mb-20">
            <a
              href={`https://wa.me/${whatsappNumber}?text=🚑 ${t.emergency}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <div className="bg-red-600 text-white rounded-xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition cursor-pointer">
                <FaAmbulance className="text-5xl mb-4" />
                <h3 className="text-2xl font-bold mb-2">{t.emergency}</h3>
                <p className="text-center">{t.emergencyDesc}</p>
              </div>
            </a>

            <a
              href={`https://wa.me/${whatsappNumber}?text=👨‍⚕️ ${t.normal}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <div className="bg-green-600 text-white rounded-xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition cursor-pointer">
                <FaUserMd className="text-5xl mb-4" />
                <h3 className="text-2xl font-bold mb-2">{t.normal}</h3>
                <p className="text-center">{t.normalDesc}</p>
              </div>
      
            </a>
          </section>
        )}
      </main>

      {/* AI Assistant Button */}
      <div className="fixed bottom-6 right-6">
        <a
          href={`https://wa.me/${whatsappNumber}?text=${t.ai}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
            {t.ai}
          </button>
        </a>
      </div>
    </div>
  );
}

export default App;
