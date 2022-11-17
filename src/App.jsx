import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import TeacherDetails from "./pages/TeacherDetails";
import Loginpage from "./pages/Loginpage";
import Regispage from "./pages/Regispage";
import TeacherList from "./pages/TeacherList";
import RequestList from "./pages/RequestList";
import Schedule from "./pages/Schedule";
import OrderForm from "./pages/OrderForm";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/teachers/:id" element={<TeacherDetails />} />
          <Route path="/login" element={<Loginpage />}></Route>
          <Route path="/regis" element={<Regispage />}></Route>
          <Route path="/teacher" element={<TeacherList />}></Route>
          <Route path="/request" element={<RequestList />}></Route>
          <Route path="/schedule" element={<Schedule />}></Route>
          <Route path="/order-form" element={<OrderForm />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
