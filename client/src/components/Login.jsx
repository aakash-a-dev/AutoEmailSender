const Login = () => {

    const handleOAuthClick = () => {
        // Redirect the user to the OAuth page
        window.location.href = 'http://localhost:8000/';
      };
    return (
        <div className="flex justify-center items-center h-screen bg-dark">
        <div className="bg-gray-800 bg-opacity-80 p-8 rounded-lg shadow-lg">
          <h1 className="text-white text-2xl mb-4">Login</h1>
          <button onClick={handleOAuthClick} className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded">
          <i className="mdi mdi-login mr-2"></i>
            Login with Google
          </button>
        </div>
      </div>
    )
}

export default Login;