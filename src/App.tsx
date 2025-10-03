import Login from "./pages/login";
import logo from "./assets/clinica/logo.webp";
import doctor from "./assets/clinica/doctor.webp";

function App() {
  return (
    <Login
      logo={logo}
      ilustracion={doctor}
      nombreClinica="Clínica Vida Sana"
    />
  );
}

export default App;
