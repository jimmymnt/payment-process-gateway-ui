import {useState} from "react";
import {useAuth} from "@/contexts/auth";

export default function Login() {
  const {login, errors} = useAuth();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const handleLogin = async (event) => {
    event.preventDefault();

    if (email === null || password === null) {
      return;
    }

    try {
      login(email, password);
    } catch (error) {
      console.log(`ERR:`, error);
      // setError(error.response.data.message);
    }
  }

  return (
    <div className="">
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div
            className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleLogin}>
                {
                  errors.length > 0 &&
                  <div
                    className="mb-6 flex items-center p-4 text-sm text-red-800 rounded-lg bg-red-50"
                    role="alert">
                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg"
                         fill="currentColor" viewBox="0 0 20 20">
                      <path
                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                      {errors}
                    </div>
                  </div>
                }
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your
                    email</label>
                  <input type="text"
                         onChange={(event) => setEmail(event.target.value)}
                         name="email"
                         id="email"
                         // value={'kminchelle'}
                         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                         placeholder="name@company.com" required=""/>
                </div>
                <div>
                  <label htmlFor="password"
                         className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                  <input type="password"
                         name="password"
                         id="password"
                         // value={'0lelplR'}
                         onChange={(event) => setPassword(event.target.value)}
                         placeholder="••••••••"
                         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                         required=""/>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="remember" aria-describedby="remember" type="checkbox"
                             className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                             required=""/>
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500">Remember me</label>
                    </div>
                  </div>
                  <a href="#" className="text-sm font-medium text-primary-600 hover:underline">Forgot
                    password?</a>
                </div>
                <button type="submit"
                        className="my-4 w-full ml-auto px-4 py-2 text-sm font-semibold leading-6 text-white transition duration-150 ease-in-out bg-blue-500 rounded-md shadow hover:bg-blue-40">
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500">
                  Don’t have an account yet?
                  <a href="#"
                     className="font-medium text-primary-600 hover:underline">{' '}Sign up</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}