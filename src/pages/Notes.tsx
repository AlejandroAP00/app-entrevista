import axiosClient from "../api/axiosClient";
import { useEffect } from "react";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { Route, Navigate, useNavigate } from "react-router-dom";

import INote from "../types/Notes";

const fetchNotes = async (): Promise<INote[]> => {
    try {
        const {data} = await axiosClient.get<INote[]>("/notes")
        return data
    } catch (error) {
        console.log(error)
        throw new Error("error")
    }
}

const Notes = () => {

    let navigate = useNavigate();
    const { data } = useQuery({
        queryKey: ['notes'],
        queryFn: fetchNotes
    });

    return (
        <section className="mt-20">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 mb-10">
                    <div>
                        <button onClick={() =>  navigate("/create-note")} className="border-black p-[8px_16px] border rounded-3xl cursor-pointer">
                            Crear nota
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-[8px]">
                    {data?.map((note) => (
                        <div className="nota border-2  rounded-2xl p-[8px]" key={note.id}>
                            <div className="cuerpo">
                                <p> {note.contenido} </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}


export default Notes;