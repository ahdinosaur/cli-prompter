### Allow Null Values proposal.
Currently, the cli prompter will not accept a null string as the entered
value, but will instead simply repeat the prompt.

This proposal would add an option, **allowNull** to each question object
passed into a prompt.  

If allowNull === true, cli prompter for that question
will accept a null string.  
Otherwise, null strings will not be accepted.

```
    const questions = [ 
        // this accepts a null string...
        { 
            type: 'text',
            name: 'name',
            message: "App Name? ",
            allowNull: true
        },

        // this does not ...
        { 
            type: 'text',
            name: 'name',
            message: "App Name? ",
            allowNull: false
        },
        // nor will this.
        { 
            type: 'text',
            name: 'name',
            message: "App Name? ",
        },
        // and this also will NOT accept a null string
        { 
            type: 'text',
            name: 'name',
            message: "App Name? ",
            allowNull: "true"
        },
    ]
```