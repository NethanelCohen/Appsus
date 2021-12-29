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

const criteria = {
    status: 'inbox/sent/trash/draft',
    txt: 'puki',
    isStared: true,
    lables: ['important', 'romantic']
}


function query() {
    console.log('from service');
    const mails = storageService.loadFromStorage(KEY);
    return Promise.resolve(mails);
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
    return Promise.resolve()
}

function createMail(subject = 'New mail arrived', body = 'This is the body of the mail', isRead = false, to = 'example@example.com') {
    return {
        id: utilService.makeId(),
        subject,
        body,
        isRead,
        sentAt: Date.now(),
        to
    }
}

function _createMails() {
    console.log('storage');
    const mails = storageService.loadFromStorage(KEY)
    if (!mails || !mails.length) {
        var mails = [
            {
                id: utilService.makeId(),
                subject: 'This is a mail 1',
                body: 'Here the body should go in',
                isRead: false,
                sentAt: Date.now(),
                to: 'example@example.com'
            },
            {
                id: utilService.makeId(),
                subject: 'This is a mail 2',
                body: 'Here the body should go in',
                isRead: false,
                sentAt: Date.now(),
                to: 'example@example.com'
            },
            {
                id: utilService.makeId(),
                subject: 'This is a mail 3',
                body: 'Here the body should go in',
                isRead: false,
                sentAt: Date.now(),
                to: 'example@example.com'
            },
            {
                id: utilService.makeId(),
                subject: 'This is a mail 4',
                body: 'Here the body should go in',
                isRead: false,
                sentAt: Date.now(),
                to: 'example@example.com'
            },
            {
                id: utilService.makeId(),
                subject: 'This is a mail 5',
                body: 'Here the body should go in',
                isRead: false,
                sentAt: Date.now(),
                to: 'example@example.com'
            }
        ]
        mails = mails.map(mail => createMail(mail.subject, mail.body, mail.isRead, mail.to))
        _saveMailsToStorage(mails)
        console.log('saved');
    }
}

function _saveMailsToStorage(mails) {
    storageService.saveToStorage(KEY, mails)
}
