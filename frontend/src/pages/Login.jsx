import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import api from "../services/api";
import "./Login.css";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await api.post("/auth/login", {
                email,
                password,
            });

            console.log("Login response:", response.data);

            // Chuyển về trang Home
            navigate("/");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    "Email hoặc mật khẩu không chính xác."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <aside className="login-aside">
                <div className="login-brand">
                    &lt;học_code<span>/</span>&gt;
                </div>

                <div className="aside-body">
                    <h2>Mỗi ngày một ít, rồi bạn sẽ viết được code.</h2>
                    <pre className="code-card">
                        <code>
                            <span className="line cm">// hôm nay học gì?</span>
                            <span className="line">
                                <span className="kw">const</span> baiHoc ={" "}
                                <span className="str">"tiếp tục"</span>;
                            </span>
                            <span className="line">console.log(baiHoc);</span>
                        </code>
                    </pre>
                </div>

                <p className="aside-note">
                    Bài học ngắn, có bài tập, đi theo lộ trình rõ ràng.
                </p>
            </aside>

            <main className="login-main">
                <form className="login-form" onSubmit={handleLogin}>
                    <div className="login-brand login-brand-mobile">
                        &lt;học_code<span>/</span>&gt;
                    </div>

                    <div className="login-header">
                        <h1>Đăng nhập</h1>
                        <p>Vào học tiếp từ chỗ bạn đã dừng.</p>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            placeholder="ten@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu</label>

                        <div className="password-wrapper">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                placeholder="Nhập mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <button
                                type="button"
                                className="toggle-password"
                                aria-label={
                                    showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"
                                }
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="login-options">
                        <label className="remember">
                            <input
                                type="checkbox"
                                checked={remember}
                                onChange={(e) => setRemember(e.target.checked)}
                            />
                            Ghi nhớ đăng nhập
                        </label>

                        <Link to="/forgot-password">Quên mật khẩu?</Link>
                    </div>

                    {error && <p className="login-error">{error}</p>}

                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >
                        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </button>

                    <div className="login-footer">
                        Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default Login;