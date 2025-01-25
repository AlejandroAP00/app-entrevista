import React, {useState} from "react";
import axiosClient from "../api/axiosClient";
import INote from "../types/Notes";
import { useNavigate } from "react-router-dom";

const createNote = async (content: string): Promise<INote | null> => {
    try {
        const response = await axiosClient.post<INote>("/notes", {
            content: content,
        });
        return response.data; 
    } catch (error: any) {
        console.error("Error creating note:", error);
        throw new Error(error.response?.data?.message);
    }
};

const CreateNote = () => {
    const [error, setError] = useState<string | null>(null); 
    const navigate = useNavigate(); 

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        setError(null); 
        const formData = new FormData(event.currentTarget);
        const contentValue = formData.get("content") as string;

        try {
            await createNote(contentValue); 
            navigate("/notes");
        } catch (err: any) {
            setError(err.message || "Ha ocurrido un error al crear la nota");
        } 
    };

    return (
        <section className="mt-20">
            <div className="container mx-auto">
                <div className="grid grid-cols-1">
                    <form className="flex flex-wrap" onSubmit={handleSubmit}>
                        <div className="w-full">
                            <textarea
                                name="content"
                                id="content"
                                placeholder="Escribe tu nota aquí..."
                                rows={10}
                                cols={20}
                                className="w-[400px] border border-black p-[4px_12px]"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="border-black p-[8px_16px] border rounded-3xl cursor-pointer"
                        >
                            Guardar
                        </button>
                    </form>

                    {error && <p className="text-red-500 mt-4">{error}</p>}
                </div>
            </div>
        </section>
    );
};

export default CreateNote;