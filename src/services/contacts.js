import { contactsCollection } from "../db/models/contact.js";

export const getContacts = async () => {
    const contacts = await contactsCollection.find();
    return contacts;
};

export const getContactById = async (contactId) => { 
    const contact = await contactsCollection.findById(contactId);
    return contact;
};

export const createContact = async (payload) => {
    const newContact = await contactsCollection.create(payload);
    return newContact;
};
 
export const updateContact = async (contactId, payload, options = {}) => {
    const rawResult = await contactsCollection.findOneAndUpdate(
        { _id: contactId },
        payload,
        {
            new: true,
            includeResultMetadata: true,
            ...options,
        },
    );

    if (!rawResult || !rawResult.value) return null;

    return {
        contact: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
};

export const deleteContact = async (contactId) => {
    const contact = await contactsCollection.findByIdAndDelete({
        _id: contactId,
    });

    return contact;
};