const express = require('express');
const cors = require('cors');
const invoiceNumbersRouter = require('./Routes/invoiceNumbers');
const invoiceItemsRouter = require('./Routes/invoiceItems');
const invoicesRouter = require('./Routes/invoices');
const creditNoteRouter = require('./Routes/creditNote');
const getcreditNote = require('./Routes/getCreditNote');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/', invoiceNumbersRouter);
app.use('/', invoiceItemsRouter);
app.use('/', invoicesRouter);
app.use('/',creditNoteRouter);
app.use('/', getcreditNote);

const PORT = process.env.PORT || 6969;
app.listen(PORT, () => {
    console.log(`Server nasłuchuje na porcie ${PORT}`);
});
