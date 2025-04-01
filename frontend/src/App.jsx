import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

function App() {
  return (
    <>
      <Header /> {/* Render the Header */}
      <main className="py-3">
        <Container>
          <Outlet /> {/* This renders the child route components like HomeScreen */}
        </Container>
      </main>
      <Footer /> {/* Render the Footer */}
    </>
  );
}

export default App;
