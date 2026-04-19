# Arogyam 🏥
**AI-Powered Healthcare Access for Rural Punjab**

Arogyam is a responsive full-stack web portal designed to bridge the healthcare gap in rural communities. By leveraging the widespread familiarity with **WhatsApp**, the platform provides immediate emergency response and AI-driven medical guidance for non-emergency symptoms.

---

## 🚀 Key Features

### 👤 Seamless Access
* **Multi-Device Support:** Fully responsive design optimized for both desktop and mobile browsers used in rural areas.
* **User Authentication:** Secure sign-in system to manage patient dashboards and history.

### 🤖 AI Chatbot Integration
* **WhatsApp Ecosystem:** Integrates directly with the WhatsApp API, allowing users to consult an AI assistant on a platform they already know and use.
* **Immediate Guidance:** Instant automated assistance for preliminary health concerns.

### 🚨 Emergency Response (The "1-Minute" Protocol)
* **One-Tap Alert:** Users can select "Emergency" for critical incidents like accidents or severe pain.
* **Rapid Coordination:** Within 60 seconds, the system notifies the nearest hospital, alerts a nurse, dispatches the second-nearest ambulance, and shares the user's location.

### 📋 Non-Emergency Consultation
* **Visual Symptom Analysis:** Users can upload photos of symptoms (e.g., rashes) for AI-driven analysis.
* **Doctor Directory:** Provides a localized list of available doctors and timings based on analyzed symptoms.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js, Tailwind CSS, JavaScript (ES6+) |
| **Backend** | Node.js, Express |
| **Messaging** | WhatsApp API Integration |
| **AI/ML** | Image Analysis & Conversational AI |
| **Version Control** | Git & GitHub |

---

## 📂 Project Structure



```text
arogyam/
├── public/          # Static assets and index.html
├── src/             # Frontend React components & logic
├── server/          # Backend Node.js server (server.js)
├── package.json     # Project dependencies & scripts
└── .gitignore       # Files ignored by Git
```


---

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Dhruvtara108/Arogyam.git
   cd Arogyam
   ```
  

2. **Install Frontend Dependencies:**
   ```bash
   npm install
   ```
  

3. **Install Backend Dependencies:**
   ```bash
   cd server
   npm install
   ```
  

4. **Run the Application:**
   * Start the frontend: `npm start`
   * Start the backend: `node server.js`

---

## 🌟 Impact
Arogyam minimizes critical delays in emergency situations and provides a professional medical gateway for users with limited access to city hospitals, utilizing basic mobile internet to save lives in rural Punjab.