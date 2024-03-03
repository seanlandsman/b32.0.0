export function getData(): any[] {
    return [
        { id: 1, filePath: ['Documents'], type: 'folder' },
        { id: 2, filePath: ['Documents', 'txt'], type: 'folder' },
        {
            id: 3,
            filePath: ['Documents', 'txt', 'notes.txt'],
            type: 'file',
            dateModified: 'May 21 2017 01:50:00 PM',
            size: 14.7,
        },
        { id: 4, filePath: ['Documents', 'pdf'], type: 'folder' },
        {
            id: 5,
            filePath: ['Documents', 'pdf', 'book.pdf'],
            type: 'file',
            dateModified: 'May 20 2017 01:50:00 PM',
            size: 2.1,
        },
        {
            id: 6,
            filePath: ['Documents', 'pdf', 'cv.pdf'],
            type: 'file',
            dateModified: 'May 20 2016 11:50:00 PM',
            size: 2.4,
        },
        { id: 7, filePath: ['Documents', 'xls'], type: 'folder' },
        {
            id: 8,
            filePath: ['Documents', 'xls', 'accounts.xls'],
            type: 'file',
            dateModified: 'Aug 12 2016 10:50:00 AM',
            size: 4.3,
        },
        { id: 9, filePath: ['Documents', 'stuff'], type: 'folder' },
        {
            id: 10,
            filePath: ['Documents', 'stuff', 'xyz.txt'],
            type: 'file',
            dateModified: 'Jan 17 2016 08:03:00 PM',
            size: 1.1,
        },
        { id: 11, filePath: ['Music'], type: 'folder' },
        { id: 12, filePath: ['Music', 'mp3'], type: 'folder' },
        {
            id: 13,
            filePath: ['Music', 'mp3', 'theme.mp3'],
            type: 'file',
            dateModified: 'Sep 11 2016 08:03:00 PM',
            size: 14.3,
        },
        { id: 14, filePath: ['Misc'], type: 'folder' },
        {
            id: 15,
            filePath: ['Misc', 'temp.txt'],
            type: 'file',
            dateModified: 'Aug 12 2016 10:50:00 PM',
            size: 101,
        },
    ]
}
