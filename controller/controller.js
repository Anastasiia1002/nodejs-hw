const Joi = require('joi')
const service = require('../service/service')

const listContacts = async (req, res, next) => {
console.log(req.user)
    try {
      const results = await service.getAllContacts(req.user);
     
      res.json({
        status: 'success',
        code: 200,
        data: {
          contacts: results,
        },
      })
    } catch (e) {
      console.error(e);
      next(e);
    }

  }
const getContactById=async (req, res, next) => {
       try {
      
      const result = await service.getContactById(req.params.contactId, req.user);
      
      if (result) {
        res.json({
          status: 'success',
          code: 200,
          data: { contacts: result },
        });
      } else {

        res.status(404).json({
          status: 'error',
          code: 404,
          message: `Not found task id: ${req.params.contactId}}`,
          data: 'Not Found',
        });
      }
    } catch (e) {
     
      console.error(e);
      next(e);
    }
  };
const addContact=async (req, res, next) => {
    // const{ name, email, phone, favorite } = req.body;
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      favorite: Joi.boolean().required(),
    });
    
    const {error, value} =schema.validate(req.body)
    if (error) {
          return res.status(400).json({ message: "missing required name field" });
    }
    if(value){
    try {
      const result = await service.createContact(req.body, req.user);
      if (result) {
        res.json({
          status: 'success',
          code: 200,
          data: { contacts: result },
        });
      } else {
        res.status(404).json({
          status: 'error',
          code: 404,
           message: `Not found task id`,
          data: 'Not Found',
        });
      }
    } catch (e) {
      console.error(e);
      next(e);
    }}}
   
const removeContact=async (req, res, next) => {
   
    try {
      const result = await service.removeContact(req.params.contactId, req.user);
      if (result) {
        res.json({
          status: 'success',
          code: 200,
          data: { contacts: result },
        });
      } else {
        res.status(404).json({
          status: 'error',
          code: 404,
          message: `Not found task id: ${req.params.contactId}`,
          data: 'Not Found',
        });
      }
    } catch (e) {
      console.error(e);
      next(e);
    }}
const updateContact=async (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      favorite: Joi.boolean().required(),
    });
    
    const {error, value} =schema.validate(req.body)
    if (error) {
          return res.status(400).json({ message: "missing required name field" });
    }
    if(value){
   
    const {contactId} = req.params; 
    try {
      const result = await service.updateContact(req.params.contactId, req.body, req.user);
      if (result) {
        res.json({
          status: 'success',
          code: 200,
          data: { contacts: result },
        });
      } else {
        res.status(404).json({
          status: 'error',
          code: 404,
          message: `Not found contact id: ${contactId}`,
          data: 'Not Found',
        });
      }
    } catch (e) {
      console.error(e);
      next(e);
    }}}

const updateStatusContact=async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean().required(),
  });
  
  const {error, value} =schema.validate(req.body)
  if (error) {
        return res.status(400).json({ message: "missing required name field" });
  }
  if(value){
 
  const {contactId} = req.params; 
  try {
    const result = await service.updateContactupdateContact(req.params.contactId, req.body, req.user);
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { contacts: result },
      });
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found contact id: ${contactId}`,
        data: 'Not Found',
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }}}
    module.exports = { 
         listContacts,
        getContactById,
        removeContact,
        addContact,
        updateContact,
        updateStatusContact,
    }