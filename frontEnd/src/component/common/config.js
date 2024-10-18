const config = {
    development: {
        backEndURL: "http://localhost:8000",
    },
    production: {
        backEndURL: "https://alphaware-task.onrender.com",
    }
};

const currentEnv = "production"

export default config[currentEnv];
