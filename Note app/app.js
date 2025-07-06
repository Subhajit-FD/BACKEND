const express = require('express');
const app = express();

/* use(express.json()) is a midlleware that is used to accept the data and format it so that the server can read it into json format*/
app.use(express.json());

let notes =[]

/*Post method is use to get data from frontend */
app.post('/notes', (req, res) => {
    notes.push(req.body);
    res.json({
        message: "Note added successfully",
    })
})


/*Get method is used to get data from the server */
app.get('/notes', (req, res) => {
    res.json({
        message: "Notes fetched successfully",
        notes: notes
    })
})

/* Patch method is use to update data in server */
/* : means creating a dynamic route which value can be anything */
app.patch('/notes/:index', (req,res)=>{
    const index = req.params.index;
    const {title} = req.body;
    notes[index].title = title;
    res.json({
        message: "Note updated successfully",
    })
})

/* Delete method is used to delete data from the server */
app.delete('/notes/:index', (req, res) => {
    const index = req.params.index;
    delete notes[index];
    res.json({
        message: "Note deleted successfully",
    })
})

app.listen(3000, ()=> console.log("Server is running on port 3000"));