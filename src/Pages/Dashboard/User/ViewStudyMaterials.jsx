
import { useParams } from "react-router-dom";

import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const ViewStudyMaterials = () => {
    const { id } = useParams(); 
    const [materials, setMaterials] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        console.log("Fetching materials for session:", id); 

        if (!id) {
            console.error("Session ID is undefined!");
            return;
        }

        axiosPublic
            .get(`/bookStudyMaterials/${id}`)
            .then((res) => {
                console.log("Materials Fetched:", res.data); 
                setMaterials(res.data);
            })
            .catch((error) => console.error("Error fetching materials:", error));
    }, [id, axiosPublic]);

    return (
        <div className="p-6">
            <h2 className="text-4xl font-semibold font-Cinzel text-center my-16">Study Materials</h2>
            {materials.length === 0 ? (
                <p className="text-gray-500 text-center">No materials available for this session.</p>
            ) : (
                <div className="grid md:grid-cols-3 gap-6">
                    {materials.map((material) => (
                        <div key={material._id} className="border p-4 rounded-lg shadow">
                            <h3 className="text-2xl  font-medium text-center mb-5"> {material.title}</h3>
                            <h3 className="text-lg font-medium">Tutor Email: {material.tutorEmail}</h3>
                            <img
                                src={material.image}
                                alt="Study Material"
                                className="w-full h-40 object-cover rounded mt-2"
                            />
                            <div className="flex justify-between mt-4">
                                <a
                                    href={material.googleDriveLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    View
                                </a>
                                <a
                                    href={material.image}
                                    download
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                >
                                    Download
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViewStudyMaterials;
