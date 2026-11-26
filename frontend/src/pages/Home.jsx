import { useEffect, useState } from "react";
import api from "../services/api";

function Home() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const getHome = async () => {
            try {
                const response = await api.get("/api/home");
                setData(response.data);
            } catch (error) {
                console.error("Lỗi kết nối API:", error);
            }
        };

        getHome();
    }, []);

    return (
        <div>
            <h1>Website Học Lập Trình</h1>

            {data && (
                <pre>{JSON.stringify(data, null, 2)}</pre>
            )}
        </div>
    );
}

export default Home;