import './App.css'
import {MainLayout} from "../shared/ui";
import {Navbar} from "../widgets/Navbar";
import {ContactsLine} from "../features/ContactsLine";
import fon from './fon.png'

function App() {
    return (
        <MainLayout
            header={<Navbar/>}
            content={<div style={{
                backgroundImage: `url(${fon})`,
                width: "100%",
                height: "100%"
            }}></div>}
            footer={<ContactsLine/>}
        />
    )
}

export default App
