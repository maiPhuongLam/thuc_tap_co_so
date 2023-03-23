import { useAuthContext } from "../../hooks/useAuthContext";

function Home() {
    const { user } = useAuthContext() 
    return <h2>Home page</h2>;
}

export default Home;
