import { utilService } from '../../../services/util.services.js'
import { storageService } from '../../../services/storage.service.js'

export const emailService = {
    query,
    getMailById,
    remove,
    createMail,
}

const KEY = 'mails_DB'
_createMails()

const loggedinUser = {
    email: 'nati@appsus.com',
    fullname: 'Netanel Netanel'
}

// const criteria = {
//     status: 'inbox/sent/trash/draft',
//     txt: 'puki',
//     isRead: false,
//     isStared: true,
//     lables: ['important', 'romantic']
// }

function query(criteria = null) {
    const mails = storageService.loadFromStorage(KEY);
    if (!criteria) return Promise.resolve(mails);
    const criteriaMails = _getCriteriaMails(mails, criteria);
    return Promise.resolve(criteriaMails);
}

function _makeLowerCase(value) {
    return value.toString().toLowerCase();
}

function _getCriteriaMails(mails, criteria) {
    let { status, txt, isRead, isStared, lables } = criteria;
    status = status ? status : 'inbox';
<<<<<<< HEAD
    txt === txt ? txt : '';
=======
    _makeLowerCase(txt) || '';
>>>>>>> 9170618f6fcfd839bfdbbbde6133a8e34a6da021
    isRead = isRead ? isRead : false;
    isStared = isStared ? isStared : false;
    lables = lables ? lables : [];
    return mails.filter(mail => {
        console.log(mail.body.includes)
        return (_makeLowerCase(mail.subject).includes(_makeLowerCase(txt)) ||
                mail.body.includes(_makeLowerCase(txt))) &&
            mail.status === status &&
            mail.isRead === isRead &&
            mail.isStared === isStared &&
            mail.lables.toString().includes(lables.toString())
    })
}

function getMailById(mailId) {
    const mails = storageService.loadFromStorage(KEY);
    let mail = mails.find(mail => {
        return mailId === mail.id
    })
    return Promise.resolve(mail)
}

function remove(mailId) {
    let mails = storageService.loadFromStorage(KEY)
    mails = mails.filter(mail => mail.id !== mailId)
    storageService.saveToStorage(KEY, mails)
    return Promise.resolve(mails)
}

function createMail(subject = 'New mail arrived', body = 'This is the body of the mail', isRead = false, isStared = false, lables = [], status = 'inbox', to = 'example@example.com') {
    return {
        id: utilService.makeId(),
        subject,
        body,
        isRead,
        isStared,
        lables,
        status,
        sentAt: Date.now(),
        to
    }
}

function _createMails() {
    let mails = storageService.loadFromStorage(KEY) || [];
    if (!mails || !mails.length) {
        mails = [{
<<<<<<< HEAD
            id: utilService.makeId(),
            subject: 'Mail 1',
            body: 'Here the body should go in',
            isRead: false,
            isStared: false,
            lables: ['important'],
            status: 'trash',
            sentAt: Date.now(),
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
            sentAt: Date.now(),
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
            sentAt: Date.now(),
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
            sentAt: Date.now(),
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
            sentAt: Date.now(),
            to: 'example@example.com'
        }
=======
                id: utilService.makeId(),
                subject: 'Mail 1',
                body: 'Here the body should go in',
                isRead: false,
                isStared: false,
                lables: ['important'],
                status: 'inbox',
                sentAt: Date.now(),
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
                sentAt: Date.now(),
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
                sentAt: Date.now(),
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
                sentAt: Date.now(),
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
                sentAt: Date.now(),
                to: 'example@example.com'
            }
>>>>>>> 9170618f6fcfd839bfdbbbde6133a8e34a6da021
        ]
        mails = mails.map(mail => createMail(mail.subject, mail.body, mail.isRead, mail.isStared, mail.lables, mail.status, mail.to))
        _saveMailsToStorage(mails)
    }
}

function _saveMailsToStorage(mails) {
    storageService.saveToStorage(KEY, mails)
}