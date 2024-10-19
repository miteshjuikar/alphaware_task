const apiUrl = import.meta.env.VITE_API_URL;

const config = {
    development: {
        backEndURL: "http://localhost:8000",
    },
    production: {
        backEndURL: "https://alphaware-task.onrender.com",
    }
};


// Determine the current environment
const currentEnv = apiUrl || process.env.NODE_ENV || 'development';

export default config[currentEnv];
