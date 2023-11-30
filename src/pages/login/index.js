import { loginApi, registerApi } from "@/rest_API/users_api";
import { setCookie } from "@/utils/cookies";
import { Router, useRouter } from "next/router";
import { useState } from "react";
import styles from "./login.module.css"; // Sesuaikan dengan nama file CSS module yang benar

const login = () => {
    const [isChecked, setIsChecked] = useState(true);
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")


    const router = useRouter()
    const handleLogin = async()=>{
        try {
            const payload = {email,password}
            const response = await loginApi(payload)
            const dataCookie = {...response.data,token:response.token}
            console.log(dataCookie);
            setCookie("user-access",JSON.stringify(dataCookie),{
                expires : 1
            })
            router.push('/dashboard').then(() => router.reload());
        } catch (error) {
            console.log(error);
        }
    }

    const handleRegister = async()=>{
      if (password!=confirmPassword) {
        alert ("password tidak sama")
        return
      }
      try {
        const payload = {name,email,password,confirmPassword}
        const response = await registerApi(payload)
        if (response.status==201) {
          alert("berhasil mendaftar. silahkan log-in")
          setIsChecked(false)   
          setPassword('')       
        } else{throw error}
      } catch (error) {
        console.log(error);
        alert("Email sudah digunakan,silahkan login")
      }
    }
    const isFormRegisterValid = ()=>{
      if (!name||!email||!password||!confirmPassword) {
        return true
      } else{
        return false
      }
    }
    const isFormLoginValid = ()=>{
      if (!email||!password) {
        return true
      } else{
        return false
      }
    }

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className="position-absolute top-50 start-50 translate-middle">
            <div className={styles.container}>
                {isChecked ? (
                    <>
                        <div className={styles.signup1}>
                        <label className={styles.label1} onClick={handleCheckboxChange}>
                                Sign up
                            </label>
                            <input type="text" name="txt" placeholder="Name" required={true} className={styles.input} value={name} onChange={(e)=>setName(e.target.value)} />
                            <input type="email" name="email" placeholder="Email" required="" className={styles.input} value={email} onChange={(e)=>setEmail(e.target.value)} />
                            <input type="password" name="pswd" placeholder="Password" required="" className={styles.input} value={password} onChange={(e)=>setPassword(e.target.value)} />
                            <input type="password" name="pswd" placeholder="Confirm Password" required="" className={styles.input} value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
                            <button className={styles.button} onClick={handleRegister} disabled={isFormRegisterValid()}>Sign up</button>
                        </div>

                        <div className={styles.login1}>
                            <label className={styles.label2} onClick={handleCheckboxChange}>
                                Log in
                            </label>
                            <input type="email" name="email" placeholder="Email" required="" className={styles.input} />
                            <input type="password" name="pswd" placeholder="Password" required="" className={styles.input} />
                            <button className={styles.button} disabled={isFormLoginValid()} >Log In</button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={styles.signup2}>
                            <label className={styles.label1} onClick={handleCheckboxChange}>
                                Sign up
                            </label>
                            <input type="text" name="txt" placeholder="Name" required="" className={styles.input} value={name} onChange={(e)=>setName(e.target.value)} />
                            <input type="email" name="email" placeholder="Email" required="" className={styles.input} value={email} onChange={(e)=>setEmail(e.target.value)} />
                            <input type="password" name="pswd" placeholder="Password" required="" className={styles.input} value={password} onChange={(e)=>setPassword(e.target.value)} />
                            <input type="password" name="pswd" placeholder="Confirm Password" required="" className={styles.input} value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
                            <button className={styles.button} disabled={isFormRegisterValid()}>Sign up</button>
                        </div>

                        <div className={styles.login2}>
                            <label className={styles.label2} onClick={handleCheckboxChange}>
                                Log in
                            </label>
                            <input type="email" name="email" placeholder="Email" required="" className={styles.input} value={email} onChange={(e)=>setEmail(e.target.value)} />
                            <input type="password" name="pswd" placeholder="Password" required="" className={styles.input} value={password} onChange={(e)=>setPassword(e.target.value)} />
                            <button className={styles.button} onClick={handleLogin} disabled={isFormLoginValid()}>Log In</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default login;

