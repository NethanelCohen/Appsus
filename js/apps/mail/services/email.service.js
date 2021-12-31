import { utilService } from '../../../services/util.services.js'
import { storageService } from '../../../services/storage.service.js'

export const emailService = {
    query,
    getMailById,
    remove,
    createMail,
    isMailRead,
    getUserDetails,
    isMailStared
}

const loggedinUser = {
    email: 'nati@appsus.com',
    fullname: 'Netanel Netanel'
}

const KEY = 'mails_DB'
_createMails()

function getUserDetails() {
    return loggedinUser;
}



function query(criteria = null) {
    let mails = storageService.loadFromStorage(KEY);
    if (!criteria) return Promise.resolve(mails);
    if (criteria.status === 'stared') {
        return Promise.resolve(_getStaredMails(mails, criteria))
    }
    const criteriaMails = _getCriteriaMails(mails, criteria);
    return Promise.resolve(criteriaMails);
}

function _makeLowerCase(value) {
    return value.toString().toLowerCase();
}

function _getStaredMails(mails) {
    return mails.filter(mail => {
        return mail.isStared === true
    })
}

function _getCriteriaMails(mails, criteria) {
    let { status, txt, isRead, lables } = criteria;
    status = status ? status : '';
    txt = txt ? _makeLowerCase(txt) : '';
    lables = lables ? lables : [];
    return mails.filter(mail => {
        return (_makeLowerCase(mail.subject).includes(_makeLowerCase(txt)) ||
                _makeLowerCase(mail.body).includes(_makeLowerCase(txt))) &&
            mail.status === status &&
            mail.lables.toString().includes(lables.toString())
    })
}

function getMailById(mailId) {
    const mails = storageService.loadFromStorage(KEY);
    const mail = mails.find(mail => {
        return mailId === mail.id
    })
    return Promise.resolve(mail)
}

function isMailStared(mailId) {
    const mails = storageService.loadFromStorage(KEY)
    const staredMail = mails.find(mail => {
        return mail.id === mailId
    })
    staredMail.isStared = !staredMail.isStared;
    _saveMailsToStorage(mails)
    return Promise.resolve();
}


function isMailRead(mailId, state) {
    const mails = storageService.loadFromStorage(KEY)
    const readedMail = mails.find(mail => {
        return mail.id === mailId
    })
    readedMail.isRead = state;
    _saveMailsToStorage(mails)
    return Promise.resolve();
}

function remove(mailId) {
    let mails = storageService.loadFromStorage(KEY);
    var removedMail = mails.find(mail => {
        return mail.id === mailId
    })
    if (removedMail.status === 'trash') {
        mails = mails.filter(mail => mail.id !== removedMail.id)
    } else removedMail.status = 'trash';
    _saveMailsToStorage(mails)
    return Promise.resolve();
}

function createMail(mail) {
    const { subject, status, body, to } = mail
    return {
        id: utilService.makeId(),
        subject,
        body,
        isRead: true,
        isStared: false,
        lables: [],
        status,
        sentAt: new Date().getTime(),
        to: to || ''
    }
}

function _createMails() {
    let mails = storageService.loadFromStorage(KEY) || [];
    if (!mails || !mails.length) {
        mails = [{
                id: utilService.makeId(),
                subject: 'Mail 1',
                body: 'Here the body should go in',
                isRead: false,
                isStared: false,
                lables: [],
                status: 'inbox',
                sentAt: new Date().getTime(),
                to: 'example@example.com'
            },
            {
                id: utilService.makeId(),
                subject: 'Mail 2',
                body: 'Here the body should go in',
                isRead: false,
                isStared: false,
                lables: [],
                status: 'inbox',
                sentAt: new Date().getTime() - 86400001,
                to: 'example@example.com'
            },
            {
                id: utilService.makeId(),
                subject: 'Mail 3',
                body: 'Here the body should go in',
                isRead: false,
                isStared: false,
                lables: [],
                status: 'inbox',
                sentAt: new Date().getTime() - 1000400000,
                to: 'example@example.com'
            },
            {
                id: utilService.makeId(),
                subject: 'Mail 4',
                body: 'Here the body should go in',
                isRead: false,
                isStared: false,
                lables: [],
                status: 'inbox',
                sentAt: new Date().getTime() - 10004250000,
                to: 'example@example.com'
            },
            {
                id: utilService.makeId(),
                subject: 'Mail 5',
                body: 'Here the body should go in',
                isRead: false,
                isStared: false,
                lables: [],
                status: 'inbox',
                sentAt: new Date().getTime() - 10250000000,
                to: 'example@example.com'
            }
        ]
        mails = mails.map(mail => createMail(mail.subject, mail.body, mail.isRead, mail.isStared, mail.lables, mail.status, mail.sentAt, mail.to))
        _saveMailsToStorage(mails)
    }
}

function _saveMailsToStorage(mails) {
    storageService.saveToStorage(KEY, mails)
}