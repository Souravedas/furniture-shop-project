import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FurnitureDetail = () => {
    const { id } = useParams();
    const [furniture, setFurniture] = useState(null);

    useEffect(() => {
        fetch(`/api/furniture/${id}`)
            .then((res) => res.json())
            .then((data) => setFurniture(data));
    }, [id]);

    if (!furniture) return <p>Loading...</p>;

    return (
        <div className="furniture-detail">
            <h2>{furniture.name}</h2>
            <p>Category: {furniture.category}</p>
            <p>Price: ${furniture.price}</p>
            <p>Description: {furniture.description}</p>
        </div>
    );
};

export default FurnitureDetail;
