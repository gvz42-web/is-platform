const User = require("../model/user");
const Module = require("../model/module");
const generateJWT = require("../middlewares/generateJWT");

const compareArrays = (arr1, arr2) => {
  arr1.sort();
  arr2.sort();
  return JSON.stringify(arr1) === JSON.stringify(arr2);
};

const compareArraysOrder = (arr1, arr2) => {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
};

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
    result.userId = user._id;
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
  const user = await User.findOne({ _id: req.params.id }, (err) => {
    if (err) {
      console.log(err);
    }
  })
    .clone()
    .catch(function (err) {
      console.log(err);
    });
  res.send(user);
};

exports.delete_user = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.send(true);
};

exports.update_user = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.send(true);
};

exports.check_test = async (req) => {
  const { moduleId, result } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  const module = await Module.findById(moduleId);
  let score = 0;
  let exercises = [];
  for (let i = 0; i < module.list.length; i++) {
    const part = module.list[i];
    const answer = result[i];

    if (part.partType === "t") {
      exercises.push("t");
    } else if (part.partType === "v") {
      exercises.push("v");
      score++;
    } else if (
      part.partType === "s" &&
      JSON.parse(part.data).correct === answer
    ) {
      score++;
      exercises.push("right");
    } else if (
      part.partType === "m" &&
      compareArrays(JSON.parse(part.data).correct, answer)
    ) {
      exercises.push("right");
      score++;
    } else if (
      part.partType === "o" &&
      compareArraysOrder(JSON.parse(part.data).options, answer)
    ) {
      exercises.push("right");
      score++;
    } else {
      exercises.push("false");
    }
  }

  let status = "";
  if (module.minimalScore <= score) {
    status = "completed";
  } else {
    status = "failed";
  }

  await User.findOneAndUpdate(
    { token, tests: { $elemMatch: { test_id: moduleId } } },
    {
      $set: {
        "tests.$.exercises": exercises,
        "tests.$.score": score,
        "tests.$.status": status,
        "tests.$.time_end": Date.now(),
      },
    },
    { new: true, safe: true, upsert: true }
  )
    .clone()
    .catch(function (err) {
      console.log(err);
    });
};

exports.delete_test = async (req, res) => {
  console.log(req.params.id);
  await User.findById(req.params.id, (err, user) => {
    if (err) {
      console.log(err);
    }
    if (user) {
      user.tests = user.tests.filter((t) => t.test_id === req.body);
      user.save();
    }
  })
    .clone()
    .catch(function (err) {
      console.log(err);
    });
  res.send(true);
};
