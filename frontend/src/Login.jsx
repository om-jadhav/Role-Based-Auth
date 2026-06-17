import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [form, setForm] =
        useState({
            email: "",
            password: "",
        });

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res =
                await axios.post(
                    "http://localhost:4900/api/auth/login",
                    form
                );

            localStorage.setItem(
                "token",
                res.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

            if (
                res.data.user.role ===
                "admin"
            ) {
                navigate("/admin");
            } else {
                navigate("/employee");
            }
        } catch (err) {
            alert("Login Failed");
        }
    };

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#f4f4f4",
                color: "black",
            }}
        >
            <form
                onSubmit={handleLogin}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    width: "300px",
                    padding: "20px",
                    background: "white",
                    borderRadius: "10px",
                    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                }}
            >
                <h2
                    style={{
                        textAlign: "center",
                        marginBottom: "10px",
                        color: "#000"
                    }}>Login</h2>

                <input
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            email: e.target.value,
                        })
                    }
                    style={{ padding: "10px" }}
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            password: e.target.value,
                        })
                    }
                    style={{ padding: "10px" }}
                />

                <button
                    style={{
                        padding: "10px",
                        cursor: "pointer",
                    }}
                >
                    Login
                </button>
                <p>
                    Don't have an account?
                    <Link to="/signup"> Signup</Link>
                </p>
            </form>
        </div >
    )
}
export default Login;