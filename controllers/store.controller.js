const cloudinary = require('cloudinary').v2;

const Store = require('../models/store.modle');
const Users = require('../models/user.model');
const Books = require('../models/book.model');
const Shops = require('../models/shop.model');
const makePagination = require('../midlewares/pagination.midleware');

cloudinary.config({
  cloud_name: 'v4n8877',
  api_key: '791223667666661',
  api_secret: 'tryp7Qm615EpbJf6IiqhkbZQXSE'
});

module.exports.index = async (req, res) => {
  try {
    const userId = req.signedCookies.userId;
    const getUser = await Users.find({_id: userId}).exec();
    const getStore = await Store.find({}).exec();
    const page = parseInt(req.query.page) || 1;
    const perPage = 10;
    const startPage = (page - 1) * 10;
    const endPage = page * perPage;
    const pageCount = Math.ceil(getStore.length / perPage);
    const newPagination = makePagination.customPagination(page, pageCount);
    // const quantity = req.signedCookies.quantityBook;

    res.render('Stores/stores', {
      stores: getStore.slice(startPage, endPage),
      pageCount: newPagination,
      currentPage: page,
      users: getUser[0],
    })
  } catch (err) {
    res.render('errors/msgErr');
  }
}

module.exports.toCreate = (req, res) => {
  res.render('Stores/createStore');
}

const uploadImage = (avatar) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(avatar, function(error, result) { 
      if (error) return reject(error);
      return resolve(result);
    });
  })
}

module.exports.createStore = async (req, res) => {
  try{
      const userId = req.signedCookies.userId;
      let image = await uploadImage(req.file.path);
      await Store.create({
        userId: userId,
        name: req.body.name,
        icon: image.url,
      });
      res.redirect('/stores');
  }catch(err){ console.log(err)}
}

module.exports.toAddItems = async (req, res) => {
  try {
    const getBooks = await Books.find({}).exec();
    const page = parseInt(req.query.page) || 1;
    const perPage = 10;
    const startPage = (page - 1) * 10;
    const endPage = page * perPage;
    const pageCount = Math.ceil(getBooks.length / perPage);
    const newPagination = makePagination.customPagination(page, pageCount);

    res.render('book/addBook', {
      books: getBooks.slice(startPage, endPage),
      pageCount: newPagination,
      currentPage: page,
      storeId: req.params.storeId
    })
    
  } catch (error) {
    console.log('error', error);
  }
}

module.exports.postAddItems = async (req, res) => {
  try {
    const arrayItems = [];
    const getValue = req.body.items || [];
    getValue.forEach( item => {
      arrayItems.push({ bookId: item });
    });
    const storeId = req.params.storeId
    const findShop = await Shops.find({storeId: storeId}).exec()
    if(findShop.length > 0) {
      Shops.findByIdAndUpdate(id, {items: arrayItems})
    } else {
      await Shops.create({storeId: storeId, items: arrayItems})
    }
    res.redirect('/stores');
  } catch (error) {
    console.log("error", error);
  }
}

module.exports.listBooks = async (req, res) => {
  try {
    const books = await Books.find({}).exec();
    const findShop = await Shops.find({storeId: req.params.storeId}).exec();
    const listItems = books.filter( book => findShop[0].items.find( item => item.bookId === book._id.toString()));
    const page = parseInt(req.query.page) || 1;
    const perPage = 10;
    const startPage = (page - 1) * 10;
    const endPage = page * perPage;
    const pageCount = Math.ceil(listItems.length / perPage);
    const newPagination = makePagination.customPagination(page, pageCount);

    res.render('idStore/idStore', {
      books: listItems.slice(startPage, endPage),
      pageCount: newPagination,
      currentPage: page,
    })

  } catch (error) {
    console.log("error", error)
  }
}