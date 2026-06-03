require("dotenv").config({ path: "../.env" });

const common = {
  dialect: "postgres",
  logging: false
};

const production = {
  ...common,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
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
    ...production,
    use_env_variable: "DATABASE_URL"
  }
};
