import { contactsCollection } from "../db/models/contact.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getContacts = async ({page, perPage, sortBy, sortOrder, filter, userId}) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = contactsCollection.find({userId: userId});
    
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

export const getContactById = async (contactId, userId) => { 
    const contact = await contactsCollection.findOne({
        _id: contactId,
        userId: userId,
    });
    return contact;
};

export const createContact = async (payload, userId) => {
    const newContact = await contactsCollection.create({
        ...payload,
        userId: userId,
    });
    return newContact;
};
 
export const updateContact = async ({contactId, payload, options = {}, userId}) => {
    const rawResult = await contactsCollection.findOneAndUpdate(
        { _id: contactId, userId: userId },
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

export const deleteContact = async (contactId, userId) => {
    const contact = await contactsCollection.findOneAndDelete({
        _id: contactId,
        userId: userId,
    });

    return contact;
};