import api from "../api/axios";
import {Button} from "@mui/material";
import React from "react";
import {Link, Route} from "react-router-dom";

export default function DeveloperPage() {
    return (
    <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">dev page</h1>
        <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-gray-200 rounded-lg">
                <h1 className="text-xl text-center font-bold mb-4">base functions</h1>
                <div className="flex flex-col space-y-2">
                    <div onClick={() => {
                    }} className="bg-blue-500 text-white text-center px-4 py-2 rounded">notify
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}