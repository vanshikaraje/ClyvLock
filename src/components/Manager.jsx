import React, { useRef, useState, useEffect } from 'react';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, []);

    const copytext = (text) => {
        toast.success(`Copied to clipboard: ${text}`);
        navigator.clipboard.writeText(text);
    };

    const showPassword = () => {
        if (ref.current.src.includes("public/eye open.png")) {
            passwordRef.current.type = "text";
            ref.current.src = "public/eye-password-hide.png";
        } else {
            ref.current.src = "public/eye open.png";
            passwordRef.current.type = "password";
        }
    };

    const savePassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            const newPassword = { ...form, id: uuidv4() };
            const updatedArray = [...passwordArray, newPassword];
            setPasswordArray(updatedArray);
            localStorage.setItem("passwords", JSON.stringify(updatedArray));
            setform({ site: "", username: "", password: "" });
        } else {
            toast.error("All fields must be at least 4 characters.");
        }
    };

    const deletePassword = (id) => {
        const updatedPasswords = passwordArray.filter((item) => item.id !== id);
        setPasswordArray(updatedPasswords);
        localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
    };

    const editPassword = (id) => {
        const toEdit = passwordArray.find(item => item.id === id);
        setform(toEdit);
        setPasswordArray(passwordArray.filter(item => item.id !== id));
    };

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Updated Background Gradient */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]" />
            
            <div className="px-2 md:p-0 md:mycontainer w-full">
                <h1 className="text-4xl font-bold text-center">
                    <span className="text-violet-600">&lt;</span>
                    <span>ClyvrLock</span>
                    <span className="text-violet-600">/&gt;</span>
                </h1>
                <p className="text-center text-violet-900 text-lg">Your Own Password Manager</p>

                <div className="flex flex-col p-4 text-center text-black gap-8 items-center">
                    <input
                        value={form.site}
                        onChange={handleChange}
                        placeholder="Enter website URL"
                        className="rounded-full border border-violet-400 w-full p-4 py-1"
                        type="text"
                        name="site"
                        id='site'
                    />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input
                            value={form.username}
                            onChange={handleChange}
                            placeholder="Enter username"
                            className="rounded-full border border-violet-400 w-full p-4 py-1"
                            type="text"
                            name="username"
                            id='username'
                        />
                        <div className="relative w-full">
                            <input
                                ref={passwordRef}
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="rounded-full border border-violet-400 w-full p-4 py-1"
                                type="password"
                                name="password"
                                id='password'
                            />
                            <span className="absolute right-[3px] top-[4px] cursor-pointer" onClick={showPassword}>
                                <img ref={ref} className="p-1" width={30} src="public/eye-password-hide.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={savePassword}
                        className="flex justify-center items-center gap-2 bg-violet-500 hover:bg-violet-400 text-white rounded-full px-8 py-2 w-fit border border-violet-700"
                    >
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                        ></lord-icon>
                        Save
                    </button>
                </div>

                <div className="passwords">
                    <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length !== 0 && (
                        <table className="table-auto w-full rounded-md overflow-hidden">
                            <thead className="bg-violet-800 text-white">
                                <tr>
                                    <th className="py-2">Site</th>
                                    <th className="py-2">Username</th>
                                    <th className="py-2">Password</th>
                                    <th className="py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-violet-100">
                                {passwordArray.map((item, index) => (
                                    <tr key={index}>
                                        <td className="py-2 border border-white text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <span>{item.site}</span>
                                                <div className="cursor-pointer" onClick={() => copytext(item.site)}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/depeqmsz.json"
                                                        trigger="hover"
                                                        style={{ width: "25px", height: "25px" }}
                                                    ></lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-2 border border-white text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <span>{item.username}</span>
                                                <div className="cursor-pointer" onClick={() => copytext(item.username)}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/depeqmsz.json"
                                                        trigger="hover"
                                                        style={{ width: "25px", height: "25px" }}
                                                    ></lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-2 border border-white text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <span>{item.password}</span>
                                                <div className="cursor-pointer" onClick={() => copytext(item.password)}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/depeqmsz.json"
                                                        trigger="hover"
                                                        style={{ width: "25px", height: "25px" }}
                                                    ></lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-2 border border-white text-center flex items-center justify-center gap-4">
                                            <span className="cursor-pointer" onClick={() => editPassword(item.id)}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/xaubpxfc.json"
                                                    trigger="hover"
                                                    style={{ width: "25px", height: "25px" }}
                                                ></lord-icon>
                                            </span>
                                            <span className="cursor-pointer" onClick={() => deletePassword(item.id)}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ width: "25px", height: "25px" }}
                                                ></lord-icon>
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
};

export default Manager;
