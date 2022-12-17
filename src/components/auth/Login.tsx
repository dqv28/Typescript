
import { SubmitHandler, useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { IUser } from '../../interfaces/user'
import { login } from '../../slices/auth'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../../firebase'
import { useSigninMutation } from '../../services/user'
import { Alert, message, Space } from 'antd'

type Props = {}

const Login = (props: Props) => {
    const { register, handleSubmit, formState: { errors } } = useForm<IUser>()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const provider = new GoogleAuthProvider()
    const loginWidthGoogle = async () => {
        await signInWithPopup(auth, provider)
            .then((result) => {
                const credential: any = GoogleAuthProvider.credentialFromResult(result)
                const token = credential.accessToken
                if (token) {
                    const username: any = result.user.email
                    dispatch(login());
                    localStorage.setItem('username', username);
                    navigate('/admin')
                }
            }).catch((error) => {
                message.info(error)
            })
    }

    const [loginUser] = useSigninMutation()
    const onHandleLogin: SubmitHandler<IUser> = (user: IUser) => {
        loginUser(user).unwrap()
            .then((resp: any) => {
                if (resp.accessToken) {
                    dispatch(login())
                    localStorage.setItem('username', resp.user.email);
                    navigate('/admin/products')
                }
            })
            .catch((err: any) => {
                message.info(err.data)
            })
    }

    return (
        <div>
            <div className="container">
                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                        {/* Nested Row within Card Body */}
                        <div className="row">
                            <div className="col-lg-5 d-none d-lg-block bg-register-image" />
                            <div className="col-lg-7">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">Login</h1>
                                    </div>
                                    {/* <Space direction="vertical" style={{ width: '100%' }}>
                                        <Alert message="Error" type="error" showIcon />
                                    </Space> */}
                                    <form className="user" onSubmit={handleSubmit(onHandleLogin)}>
                                        <div className="form-group">
                                            <input type="text" className="form-control form-control-user"
                                                placeholder="Email"
                                                {...register('email', { required: true })} />
                                            {errors.email && errors.email.type === "required" &&
                                                <span className='text-danger small'>This field is not required.</span>
                                            }
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control form-control-user"
                                                placeholder="Password"
                                                {...register('password', { required: true })} />
                                            {errors.password && errors.password.type === "required" &&
                                                <span className='text-danger small'>This field is not required.</span>
                                            }
                                        </div>
                                        <button type='submit' className="btn btn-primary btn-user btn-block">
                                            Login
                                        </button>
                                        <hr />
                                        <button onClick={loginWidthGoogle} type="button" className="btn btn-google btn-user btn-block">
                                            <i className="fab fa-google fa-fw" /> Register with Google
                                        </button>
                                        <a href="index.html" className="btn btn-facebook btn-user btn-block">
                                            <i className="fab fa-facebook-f fa-fw" /> Register with Facebook
                                        </a>
                                    </form>
                                    <hr />
                                    <div className="text-center">
                                        <a className="small" href="forgot-password.html">Forgot Password?</a>
                                    </div>
                                    <div className="text-center">
                                        <NavLink to={'/register'}>
                                            <a className="small">Create an Account!</a>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login