const userRepo = require("../repositories/user.repository");
const { hashPassword } = require("../utils/password");
const { generateToken } = require("../utils/jwt");

// ------------------ Register User ----------------
const registerUser = async ({ name, email, password }) => {
  const existingUser = await userRepo.findUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
  }
  const hashedPassword = await hashPassword(password);
  const user = await userRepo.createUser({
    name,
    email,
    password: hashedPassword,
  });
  const token = generateToken({ userId: user.id });
  return { user, token };
};

module.exports = {
  registerUser,
};

const { comparePassword } = require("../utils/password");

// ------------------ Login User ----------------
const loginUser = async ({ email, password }) => {
  const user = await userRepo.findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }
  const token = generateToken({ userId: user.id });
  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  };
};

module.exports = {
  registerUser,
  loginUser,
};
