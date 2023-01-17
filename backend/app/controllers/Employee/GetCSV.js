const UserForm = require("../../models/UserForm");

exports.getCsv = async (req, res) => {
  list = await UserForm.find({ userId: req.body.userId });
  let i = list.length;
  let response = [];
  list.forEach((e) => {
    response.unshift({ id: i--, ...e._doc });
  });
  res.json(response, 200);
};

exports.filterData = async (req, res) => {
  try {
    list = await UserForm.find(req.body.filterObj);
    let i = list.length;
    let response = [];
    list.forEach((e) => {
      response.unshift({ id: i--, ...e._doc });
    });
    return res.json(response, 200);
  } catch (e) {
    console.log(e.message);
  }
};
