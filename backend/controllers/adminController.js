const Admin = require("../model/admin");
const generateJWT = require("../middlewares/generateJWT");

exports.admin_login = async (req, res) => {
  const { login, password } = req.body;

  const admin = await Admin.findOne({ email: login }, (err) => {
    if (err) {
      console.log(err);
    }
  })
    .clone()
    .catch(function (err) {
      console.log(err);
    });
  if (admin) {
    if (admin.password === password) {
      const result = await generateJWT(admin.email);
      admin.token = result.token;
      console.log(admin);
      result.adminId = admin._id;
      await admin.save();
      res.status(200).json(result);
    } else {
      res.status(403).json({
        error: true,
        message: "Authentication error",
      });
    }
  } else {
    res.status(403).json({
      error: true,
      message: "Authentication error",
    });
  }
};

exports.create_admin = (req, res) => {
  console.log(req.body);
  Admin.create(req.body, (err) => {
    if (err) {
      console.log(err);
    }
  });
  res.send(true);
};

exports.get_admins = async (req, res) => {
  const admins = await Admin.find({}, (err) => {
    if (err) {
      console.log(err);
    }
  })
    .clone()
    .catch(function (err) {
      console.log(err);
    });
  res.send(admins);
};

exports.get_admin = async (req, res) => {
  const admin = await Admin.findOne({ _id: req.params.id }, (err) => {
    if (err) {
      console.log(err);
    }
  })
    .clone()
    .catch(function (err) {
      console.log(err);
    });
  res.send(admin);
};

exports.delete_admin = async (req, res) => {
  await Admin.findByIdAndDelete(req.params.id);
  res.send(true);
};
