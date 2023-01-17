const UserForm = require("../../models/UserForm");

exports.submitForm = async (req, res) => {
  try {
    req.body.userId = req.user.id;

    if (req.body.user_id != "") {
      console.log(req.body);
      req.body.userId = req.body.employeeId;
      if (
        req.body.fileName == "NULL" ||
        req.body.fileName == "null" ||
        req.body.fileName == null ||
        req.body.originalFileName == null
      ) {
        let oldForm = await UserForm.findOne({ _id: req.body.user_id });
        console.log(oldForm, "OLD FORM");
        req.body.fileName = oldForm.fileName;
        req.body.originalFileName = oldForm.originalFileName;
      }
      await UserForm.updateOne({ _id: req.body.user_id }, req.body);
      return res.json({ message: "Form updated" });
    }
    let userForm = new UserForm(req.body);
    await userForm.save();
    return res.json({ message: "Form submitted" });
  } catch (err) {
    console.log(err.message);
    console.log(err);
  }
};

exports.deleteFormData = async (req, res) => {
  try {
    await UserForm.deleteOne(req.body.filterObj);
    return res.json({ message: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Error occurred" });
  }
};
