const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
} = require("../../controller/controller");
const {authMiddleware} = require("../../middleware/authMiddleware")
const router = new express.Router();

router.use(authMiddleware)
router.get("/contacts/", authMiddleware, listContacts);
router.get("/contacts/:contactId",authMiddleware, getContactById)
router.post("/contacts/",authMiddleware, addContact)
router.delete("/contacts/:contactId",authMiddleware, removeContact)
router.put("/contacts/:contactId",authMiddleware, updateContact)
router.patch("/contacts/:contactId/favorite",authMiddleware, updateStatusContact)


module.exports = router
