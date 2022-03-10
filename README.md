# [NoahArk Frontend](https://github.com/NoahArkDAO)
This is the front-end repo for NoahArk that allows users be part of the future of Greece. 


##  🔧 Setting up Local Development

Required: 
- [Node v14](https://nodejs.org/download/release/latest-v14.x/)  
- [Yarn](https://classic.yarnpkg.com/en/docs/install/) 
- [Git](https://git-scm.com/downloads)


```bash
$ git clone https://github.com/NoahArkDAO
$ cd NoahArkDAO

# set up your environment variables
# read the comments in the .env files for what is required/optional
$ cp .env.example .env

# fill in your own values in .env, then =>
$ yarn
$ yarn start
```

The site is now running at `http://localhost:3000`!
Open the source code and start editing!

## Architecture/Layout
The app is written in [React](https://reactjs.org/) using [Redux](https://redux.js.org/) as the state container. 

The files/folder structure are a  **WIP** and may contain some unused files. The project is rapidly evolving so please update this section if you see it is inaccurate!

```
./src/
├── App.jsx       // Main app page
├── abi/          // Contract ABIs from etherscan.io
├── actions/      // Redux actions 
├── assets/       // Static assets (SVGs)
├── components/   // Reusable individual components
├── constants.js/ // Mainnet Addresses & common ABI
├── contracts/    // TODO: The contracts be here as submodules
├── helpers/      // Helper methods to use in the app
├── hooks/        // Shared reactHooks
├── themes/       // Style sheets for dark vs light theme
└── views/        // Individual Views
```

## Application translation

NoahArk uses [linguijs](https://github.com/lingui/js-lingui) to manage translation.

In order to mark text for translation you can use:
- The <Trans> component in jsx templates eg. `<Trans>Translate me!</Trans>`
- The t function in javascript code and jsx templates. ``` t`Translate me` ```
You can also add comments for the translators. eg.
```
t({
	id: "do_bond",
	comment: "The action of bonding (verb)",
})
```


When new texts are created or existing texts are modified in the application please leave a message in the NoahArkDao app-translation channel for the translators to translate them.

## 🚀 Deployment
Auto deployed on [Fleek.co](http://fleek.co/) fronted by [Cloudflare](https://www.cloudflare.com/). Since it is hosted via IPFS there is no running "server" component and we don't have server sided business logic. Users are served an `index.html` and javascript to run our applications. 

_**TODO**: TheGraph implementation/how/why we use it._



## 🗣 Community

* [Join our Discord](https://discord.com/invite/KaTFSdmj9f) and ask how you can get involved with the DAO!


