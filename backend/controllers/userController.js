const User = require("../model/user");
const Module = require("../model/module");
const generateJWT = require("../middlewares/generateJWT");

exports.user_login = async (req, res) => {
  const { login, password } = req.body;
  const user = await User.findOne({ email: login }, (err) => {
    if (err) {
      console.log(err);
    }
  })
    .clone()
    .catch(function (err) {
      console.log(err);
    });

  if (user.password === password) {
    const result = await generateJWT(user.email);
    user.token = result.token;
    await user.save();
    res.status(200).json(result);
  } else {
    res.status(403).json({
      error: true,
      message: "Authentication error",
    });
  }
};

exports.create_user = (req, res) => {
  console.log(req.body);
  User.create(req.body, (err) => {
    if (err) {
      console.log(err);
    }
  });
  res.send(true);
};

exports.get_users = async (req, res) => {
  const users = await User.find({}, (err) => {
    if (err) {
      console.log(err);
    }
  })
    .clone()
    .catch(function (err) {
      console.log(err);
    });
  res.send(users);
};

exports.get_user = async (req, res) => {
  const users = await User.findOne({ _id: req.params.id }, (err) => {
    if (err) {
      console.log(err);
    }
  })
    .clone()
    .catch(function (err) {
      console.log(err);
    });
  res.send(users);
};

exports.delete_user = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.send(true);
};

exports.update_user = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.send(true);
};

exports.check_test = async (req, res) => {
  const { token, moduleId, result } = req.body;
  const module = await Module.findById(moduleId);
  let score = 0;
  let exercises = [];
  for (let i = 0; i < module.list.length; i++) {
    const part = module.list[i];
    const answer = result[i];
    if (part.partType === "t") {
      exercises.push("t");
    } else if (JSON.parse(part.data).correct === answer) {
      score++;
      exercises.push(true);
    } else {
      exercises.push(false);
    }
  }
  await User.findOne({ token }, (err, user) => {
    if (err) {
      console.log(err);
    }

    let test = user.tests.filter((t) => t.test_id === moduleId)[0];
    user.exercises = exercises;
    user.score = score;
    user.time_end = Date.now();
    user.save();
  })
    .clone()
    .catch(function (err) {
      console.log(err);
    });
};
