const Contact = require('./schemas/contacts');

const getAllContacts = async (user) => {
  const { docs: contacts, ...rest } = await Contact.paginate(
    { owner: user.id },)
  return { contacts, ...rest }
};

const getContactById = async(id,user) => {
  const contact =await Contact.findOne({ _id: id, owner: user.id });
  return contact
};

const createContact =async (body, user) => {
  const contact =await Contact.create({ ...body, owner: user.id })
  return contact
}

const updateContact = async (id, body,user) => {
  const contact =await Contact.findOneAndUpdate(
    { _id: id, owner: user.id },
    { ...body },
    { new: true },
  )
  return contact
};

const removeContact= async(id,user) => {
  const contact =await Contact.findOneAndRemove({ _id: id, owner: user.id });
  return contact
};


module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
  
};