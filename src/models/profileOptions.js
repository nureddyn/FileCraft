const profileOptions = [
    {
        name: 'Profile photo',
        actions: [
            {actionName: 'Change photo', inputType: 'file'},
            {actionName: 'Delete photo', inputType: 'button'},
        ]
    },
    {
        name: 'Profile name',
        actions: [
            {actionName: 'Change profile name', inputType: 'text'},
        ]
    },
    // {
    //     name: 'Instagram account', 
    //     actions: [
    //         {actionName: 'Save Instagram account'},
    //     ]
    // },
]

module.exports = profileOptions;