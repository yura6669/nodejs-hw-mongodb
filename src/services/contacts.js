import { contactsCollection } from "../db/models/contact.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getContacts = async ({page, perPage, sortBy, sortOrder, filter}) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = contactsCollection.find();
    
    if (filter.type) {
        contactsQuery.where('contactType').equals(filter.type);
    }

    if (filter.isFavourite) { 
        contactsQuery.where('isFavourite').equals(filter.isFavourite);
    }

    const contactsCount = await contactsCollection.find().merge(contactsQuery).countDocuments();

    const contacts = await contactsQuery
        .skip(skip)
        .limit(limit)
        .sort({[sortBy]: sortOrder})
        .exec();
    const paginationData = calculatePaginationData(contactsCount, perPage, page);
    return {
        data: contacts,
        ...paginationData,
    };
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