const Module = require("../model/module");
const { Types } = require("mongoose");

exports.create_module = (req, res) => {
  console.log(req.body);
  Module.create(req.body, (err) => {
    if (err) {
      console.log(err);
    }
  });
  res.send({ msg: "Hello man!" });
};

exports.get_modules = async (req, res) => {
  const modules = await Module.find({}, (err) => {
    if (err) {
      console.log(err);
    }
  })
    .clone()
    .catch(function (err) {
      console.log(err);
    });
  res.send(modules);
};

exports.list_modules = async (req, res) => {
  const modules = await Module.find({ _id: req.query.ids }, (err) => {
    if (err) {
      console.log(err);
    }
  })
    .clone()
    .catch(function (err) {
      console.log(err);
    });

  console.log(modules);

  res.send(modules);
};

exports.get_moduleInfo = async (req, res) => {
  // TODO: get info
};

exports.get_module = async (req, res) => {
  const module = await Module.findById(req.params.id, (err) => {
    if (err) {
      console.log(err);
    }
  })
    .clone()
    .catch(function (err) {
      console.log(err);
    });
  res.send(module);
};

exports.delete_module = async (req, res) => {
  await Module.findByIdAndDelete(req.params.id);
  res.send(true);
};

exports.update_module = async (req, res) => {
  await Module.findByIdAndUpdate(req.params.id, req.body);
  res.send(true);
};
