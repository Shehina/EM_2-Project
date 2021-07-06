const express = require("express");
const app = express();
const dotenv = require('dotenv');
const Contact = require("./models/Contact");
dotenv.config();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('public'));

const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);


mongoose.connect('mongodb+srv://Shehina:shehina1998@cluster0.w1zdm.mongodb.net/mycontactnumbers?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (!err) {
    console.log('MongoDB Connection Succeeded.');
  } else {
    console.log('Error in DB connection : ' + err);
  }
});

app.listen(3000, function() {
  console.log("Listening for requests on port 3000")
});

app.get('/', (req, res) => {
  Contact.find({}, (err, contacts) => {
  res.render('contacts.ejs', { contactsToAdd: contacts});
});
});


app.post('/', async (req, res) => {
   const contact = new Contact({
      content: req.body.content
    });
    try {
      await contact.save();
      console.log(content)
        res.redirect("/");
        } catch (err) {
        res.redirect("/");
        }
    });

app.route("/edit/:id")
  .get((req, res) => {
    const id = req.params.id;
    Contact.find({}, (err, contacts) => {
      res.render("edit.ejs", { contactsToAdd: contacts, idContact: id});
    });   
})
  .post((req, res) => {
  const id = req.params.id;
  Contact.findByIdAndUpdate(id, { content: req.body.content }, err => {
    if (err) return res.send(500, err);
    res.redirect('/');
  });
  });

app.route("/remove/:id").get((req, res) => {
  const id = req.params.id;
  Contact.findByIdAndRemove(id, err => {
  if (err) return res.send(500, err);
  res.redirect("/");
  });
});





