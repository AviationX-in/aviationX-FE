import { Routes, Route } from "react-router";
import Homepage from "./components/pages/Homepage";

const App = () => {
    return (
        <>
            <Routes>
                <Route index element={<Homepage />} />
            </Routes>
        </>
    );
};
export default App;
