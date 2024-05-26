import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config.mjs';
import './LoginRegister.css';

function Login() {
    const navigate = useNavigate();
    const [TCno, setTCno] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Kullanıcı Bilgilerinin Denetleyip Giriş Yapıp Yapmadığını Kontrol Ediyor.
    useEffect(() => {
        const loggedInStatus = localStorage.getItem("isLoggedIn");
        if(loggedInStatus === "true"){
            setIsLoggedIn(true);
            navigate("/");
        }
    }, [navigate]);

    // Kullanıcı Bilgilerini DB'den Doğrulayan BE'den Çekilen APİ.
    const girisYap = async (e) => {
        const formData = {
            TCno: TCno,
            password: password,
        };

        try {
            e.preventDefault();
            let errorMessage = "";
            if(TCno && password) {
                await fetch(`http://localhost:${config.PORT}/auth/login`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                })
                .then((response) => response.json())
                .then((data) => {
                    if(data.ERROR) {
                        Array.isArray(data.ERROR) ? errorMessage = data.ERROR.map(err => err.msg).join("\n") : errorMessage = data.ERROR;
                        alert(errorMessage);
                    }
                    if(data.STATUS) {
                        alert(data.STATUS);
                        localStorage.setItem("isLoggedIn", "true");
                        navigate("/");
                    }
                })
            }
            else 
                alert("Lütfen Gerekli Alanları Doldurunuz!!");

        } catch (err) {
            console.log(err);
        }
    };

    return (
        
            <div className='formbox-login'>
                <form onSubmit={girisYap}>
                    <h1 className='yazi1'>Giriş Yap</h1>
                    <div><span className='icon2'><img src='./assets/username.png' alt='username'  /></span><input type="text" placeholder="T.C Kimlik No" className='input-box2'/></div>
                    <div><span className='icon2'><img src="./assets/password.jpg" alt="password" /></span><input type="password" placeholder="Şifre" className='input-box2' /></div>
                    <div className='sifre-unut' ><a href="#" className='sifrelink'>Şifremi Unuttum</a></div>
                    <button className='girisbutonu'>Giriş Yap</button>
                    <div className='kayitbutondivi'><p className='p2'>Hesabınız yoksa</p><a href="#" className='kayitbuton'> kayıt olun</a></div>
                
                </form>
            </div>
    );
}

export default Login;