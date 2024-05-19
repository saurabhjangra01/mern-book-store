import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useSnackbar } from 'notistack';

const EditBook = () => {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { id } = useParams();

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5555/books/${id}`);
                setAuthor(response.data.author);
                setTitle(response.data.title);
                setPublishYear(response.data.publishYear);
                setLoading(false);
            }
            catch (error) {
                setLoading(false);
                alert('An error occured. Please try again later')
                console.log(error);
            }
        })();
    }, []);

    const handleEditBook = async () => {
        try {
            const data = {
                title,
                author,
                publishYear
            }

            setLoading(true);

            await axios.put(`http://localhost:5555/books/${id}`, data);
            setLoading(false);
            enqueueSnackbar('Book Edited Successfully', { variant: 'success' });
            navigate('/');
        }
        catch (error) {
            setLoading(false);
            // alert('An error occured. Please try Again');
            enqueueSnackbar('An error occured. Please try again later', { variant: 'error' });
            console.log(error);
        }
    }

    return (
        <div className="p-4">
            <BackButton />
            <h1 className="text-3xl my-4">Edit Book</h1>
            {loading ? <Spinner /> : ''}
            <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border-2 border-gray-500 px-4 py-2 w-full"
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Author</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="border-2 border-gray-500 px-4 py-2 w-full"
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Publish Year</label>
                    <input
                        type="number"
                        value={publishYear}
                        onChange={(e) => setPublishYear(e.target.value)}
                        className="border-2 border-gray-500 px-4 py-2 w-full"
                    />
                </div>
                <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>
                    Edit Book
                </button>
            </div>
        </div>
    );
};

export default EditBook;