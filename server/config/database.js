require("dotenv").config({ path: "../.env" });

const common = {
  dialect: "mysql",
  logging: false
};

module.exports = {
  development: {
    ...common,
    use_env_variable: "DATABASE_URL"
  },
  test: {
    ...common,
    use_env_variable: "DATABASE_URL"
  },
  production: {
    ...common,
    use_env_variable: "DATABASE_URL"
  }
};
