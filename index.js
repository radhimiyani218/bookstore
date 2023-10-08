const express=require('express')
const app=express()
const db=require('./db')
const storebook=require('./schema')
const middleware=require('./middle')
app.use(express.json())

// get

app.get("/",(req,res)=>{
    res.send('welcome to the book store')
});

app.get("/books",async(req,res)=>{
    const books=await storebook.find();
    res.send(books)
});

app.get('/books/book/:id', async (req, res) => {
    const {id}=req.params
    const book=await storebook.findById(id)
    if (book) {
      res.json(book);
    }
    else {
      res.status(404).json({ message: 'Book not found' });
    }
  });
//   delete

// app.delete("/books/delete/:id",async(req,res)=>{
//     let {id}=req.params
//     let datas=await storebook.findByIdAnddelete(id)
//     let nondlt = await storebook.find()
//     res.send(nondlt)
// })

app.delete('/books/delete/:id',async(req,res)=>{
    const {id} = req.params
    const dlt = await storebook.findByIdAndDelete(id)
    // const nondelete = await storebook.find()

    res.send(dlt)
})

// // post

app.post("/books/addbooks",middleware,async(req,res)=>{
    let datas=await storebook.create(req.body)
    res.status(200).send(datas)
})
// // patch

app.patch("/books/update/:id",async(req,res)=>{
    let {id}=req.params
    let datas=await storebook.findByIdAndUpdate(id,req.body)
    res.send(datas)
})

// // filter

app.get("/books/filter",async(req,res)=>{
    const {author, category, title, sort}=req.query
    const filter={}

    if(author){
        filter.author=author;
    }
    else if(category){
        filter.category=category;
    }
    else if(title){
        filter.title=title;
    }
    // else if(price){
    //     filter.price=price;
    // }

    const sortresult={}

    if(sort=="lth"){
        sortresult.price=1
    }
    else if(sort=="htl"){
        sortresult.price=-1
    }
    let datas=await storebook.find(filter).sort(sortresult)
    res.send(datas)
});

app.listen(8090,()=>{
    console.log("listening part 8090");
    db()
})