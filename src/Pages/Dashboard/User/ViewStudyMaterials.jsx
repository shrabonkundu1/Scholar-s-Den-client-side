import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useParams } from 'react-router-dom';

const ViewStudyMaterials = () => {
    const { sessionId } = useParams(); 
  const [materials, setMaterials] = useState([]);
  const axiosPublic = useAxiosPublic();
    console.log(materials)
  useEffect(() => {
    axiosPublic
      .get(`/bookStudyMaterials/${sessionId}`)
      .then((res) => setMaterials(res.data))
      .catch((error) => console.error("Error fetching materials:", error));
  }, [sessionId, axiosPublic]);
    return (
        <div className="p-6">
        <h2 className="text-3xl font-semibold text-center my-8">Study Materials</h2>
        {materials.length === 0 ? (
          <p className="text-gray-500 text-center">No materials available for this session.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {materials.map((material) => (
              <div key={material._id} className="border p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold">{material.title}</h3>
                <img
                  src={material.image}
                  alt="Study Material"
                  className="w-full h-40 object-cover rounded mt-2"
                />
                <div className="flex justify-between mt-4">
                  <a
                    href={material.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Open Material
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