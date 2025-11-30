import React, { useState } from "react";

const LoginTest = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");

    const [oldPw, setOldPw] = useState("");
    const [newPw, setNewPw] = useState("");
    const [maTK, setMaTK] = useState("");

    // ------------------------
    // LOGIN
    // ------------------------
    const handleLogin = async () => {
        const res = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                matkhau: password
            })
        });

        const data = await res.text(); // BE trả token dạng string
        setToken(data);

        // refresh token = token luôn (BE của m chưa tách refresh token)
        setRefreshToken(data);

        console.log("Token:", data);
    };

    // ------------------------
    // REFRESH
    // ------------------------
    const handleRefresh = async () => {
        const res = await fetch("http://localhost:8080/api/auth/refresh", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                refreshToken: refreshToken
            }),
        });

        const data = await res.text();
        setToken(data);
        console.log("Token mới:", data);
    };

    // ------------------------
    // CHANGE PASSWORD
    // ------------------------
    const handleChangePw = async () => {
        const res = await fetch("http://localhost:8080/api/auth/change-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                maTK: Number(maTK),
                mkCu: oldPw,
                mkMoi: newPw
            }),
        });

        if (res.ok) {
            alert("Đổi mật khẩu thành công!");
        } else {
            alert("Đổi mật khẩu thất bại!");
        }
    };


    return (
        <div style={{ padding: 40 }}>
            <h2>TEST LOGIN</h2>

            <input placeholder="username" onChange={(e) => setUsername(e.target.value)} /><br />
            <input placeholder="password" onChange={(e) => setPassword(e.target.value)} /><br />
            <button onClick={handleLogin}>Login</button>

            <hr />

            <h2>TEST REFRESH</h2>
            <button onClick={handleRefresh}>Refresh Token</button>

            <p>Token hiện tại:</p>
            <textarea value={token} readOnly style={{ width: "100%", height: 80 }} />

            <hr />

            <h2>TEST CHANGE PASSWORD</h2>

            <input placeholder="Mã TK" onChange={(e) => setMaTK(e.target.value)} /><br />
            <input placeholder="Mật khẩu cũ" onChange={(e) => setOldPw(e.target.value)} /><br />
            <input placeholder="Mật khẩu mới" onChange={(e) => setNewPw(e.target.value)} /><br />

            <button onClick={handleChangePw}>Đổi mật khẩu</button>
        </div>
    );
};

export default LoginTest;
