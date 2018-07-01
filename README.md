# ![Thought-Swap](client/assets/project-logo.png)

A web app that aims to widen and deepen the scope of participation in 
facilitated discussions by minimizing participant self-consciousness,
social intimidation, and time pressure.

## Project in Action
ThoughtSwap is actively being tested and used at [Virginia Tech](https://vt.edu)
in classroom discussions by over 200 students. You can view the project's home 
at [thoughtswap.cs.vt.edu](http://thoughtswap.cs.vt.edu/)

For discussion facilitators, ThoughtSwap provides a platform for the creation of
groups, group sessions with prompts, and a platform to moderate and discuss 
responses. For participants it provides a platform for viewing the prompt, and
sharing their thoughts. A system of "silly name" generation for usernames and
random thought distribution helps to anonymize them from their peers.

A glimpse of this can be seen below:

### Participant View
![Thought-Swap](screenshots/participant-mock.png)
### Facilitator View
![Thought-Swap](screenshots/facilitator-mock.png)

## Contributing

For general contribution guidelines see [CONTRIBUTING](CONTRIBUTING.md). To
get started, it's as easy as 1, 2, 3:

### Step 1: Fork
Fork the [core repository](https://github.com/VT-CHCI/Thought-Swap) and check
out your copy locally.
```bash
$ git clone git@github.com:username/Thought-Swap.git
$ cd Thought-Swap
$ git remote add upstream git://github.com/VT-CHCI/Thought-Swap.git
```

### Step 2: Install Dependencies
Ensure you have the tools needed to develop. Namely: 
* [Node](https://nodejs.org/en/)
* [SQL Server](https://dev.mysql.com/downloads/mysql/)
* [Sass](https://github.com/sass/dart-sass/releases)

Setup the application by installing the dependencies and then running the test
suite to check that everything is in working order as such:
```bash
$ npm install --prefix client
$ npm install --prefix server
$ npm test --prefix client
$ npm test --prefix server
```

### Step 3: Run
Start up the app with 
```bash
$ npm run dev --prefix server
```
A browser tab will open for you at `localhost:3000`. The console you run this
command from will display output from the client and server apps and hot-reload 
whenever you make a change to either.

<br>

## Recognitions

Thought-Swap © 2014+, Center for Human-Computer Interaction at Virginia Tech 
(VTCHCI). Released under the [MIT License](LICENSE). Special thanks to our
[contributors](https://github.com/VT-CHCI/Thought-Swap/graphs/contributors).
