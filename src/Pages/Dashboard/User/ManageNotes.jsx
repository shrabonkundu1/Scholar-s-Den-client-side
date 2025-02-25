import React, { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageNotes = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [notes, setNotes] = useState([]);
    const [editNote, setEditNote] = useState(null);

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/notes/${user.email}`)
                .then(res => setNotes(res.data))
                .catch(err => console.error(err));
        }
    }, [user]);

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.delete(`/notes/${id}`);
                setNotes(notes.filter(note => note._id !== id));
                Swal.fire({
                    title: "Deleted!",
                    text: "Your note has been deleted.",
                    icon: "success"
                });
            }
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const { title, description } = e.target;
        await axiosSecure.patch(`/notes/${editNote._id}`, {
            title: title.value,
            description: description.value
        });
        setNotes(notes.map(n => n._id === editNote._id ? { ...n, title: title.value, description: description.value } : n));
        setEditNote(null);
    };

    return (
       <div className="">
                    <h2 className="text-4xl font-semibold font-Cinzel text-center my-16">Manage Your Notes</h2>
         <div className="max-w-3xl mx-auto p-6 bg-green-300 shadow-lg rounded-lg my-16">
            {notes.length === 0 ? <p>No notes found.</p> : (
                <ul className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5">
                    {notes.map(note => (
                        <li key={note._id} className="border p-4 mb-2  space-y-5 bg-white rounded-lg">
                                <h3 className="font-semibold text-xl font-Cinzel">Title: {note.title}</h3>
                                <p>Description: {note.description}</p>
                            <div>
                                <button onClick={() => setEditNote(note)} className="bg-yellow-500 text-white px-3 py-1 mr-2">Edit</button>
                                <button onClick={() => handleDelete(note._id)} className="bg-red-500 text-white px-3 py-1">Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {editNote && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-5 rounded-lg">
                        <h2 className="text-lg font-semibold font-Cinzel">Edit Note</h2>
                        <form onSubmit={handleUpdate}>
                            <input type="text" name="title" defaultValue={editNote.title} className="w-full p-2 border rounded mb-3"/>
                            <textarea name="description" defaultValue={editNote.description} className="w-full p-2 border rounded mb-3" rows="4"></textarea>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2">Save</button>
                            <button type="button" onClick={() => setEditNote(null)} className="ml-3 text-gray-500">Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
       </div>
    );
};

export default ManageNotes;