# React DRF SimpleJWT App

TL;DR: Django, DRF, DRF SimpleJWT with React Frontend sample.

The purpose of this is to get you started with a secure React-Django project.
No need to implement authentication+authorization on your frontend when it's
already done for you. You can start by pressing "Use this template"; it's not
a fork but a new repository with a fresh initial commit with all the code from
here.

Test user: `test` and pw `test`.

---
### Example repositories

- Android: [Andrew-Chen-Wang/mobile-auth-example](https://github.com/Andrew-Chen-Wang/mobile-auth-example)
- iOS: [Andrew-Chen-Wang/mobile-auth-example](https://github.com/Andrew-Chen-Wang/mobile-auth-example)
- React: [SimpleJWT/drf-SimpleJWT-React](https://github.com/SimpleJWT/drf-SimpleJWT-React)

---
### Introduction

This repository is an example of using React on the front end comminicating with Django, Django Rest Framework and DRF SimpleJWT applications.

---
### Usage

#### Backend (Django) Instructions.


1. `cd server` to get your terminal/cmd into the server directory.
2. To run the server, create a virtual environment `virtualenv venv && source venv/bin/activate`, install packages `pip install -r requirements.txt` -- the requirements.txt file is inside the server subdirectory -- and do `python manage.py migrate && python manage.py runserver`.
    - Again, make sure when you do this, you are inside the server directory on your terminal/cmd.
    - On Windows, you should do `venv\Scripts\activate` instead of `source venv/bin/activate`
3. If you're writing for an example repository, please create
a new directory labeled with the name of the framework (e.g. jwt-ios),
and add its `.gitignore`. Please use the
[github/gitignore](https://github.com/github/gitignore) repository.
Provide detailed instructions if necessary.

A default user with the username `test` and password `test` have been created.

This repository does not come with throttling, but **it is
highly recommended that you add throttling to your entire
project.** You can use a third-party package called
Django-ratelimit or DRF's internal throttling mechanism.
Django-ratelimit is more extensive -- covering Django views,
as well -- and thus more supported by SimpleJWT.

#### Frontend (jwt-react) React instructions.

1. `cd jwt-react` to get your terminal/server into the frontend (react) folder.

2. `npm install` to install all of the dependencies for the front end application.

3. `npm start` and you should be good to go, ensure that your backend is running on port `http://localhost:8000`, if you run it on another port/ip please change the `BASE_URL` in `jwt-react/src/api/auth.js`

4. Use `npm test` if you'd like to run the test which tests the api/ folder currently.


---
### License

This repository is licensed under the 
[MIT License](https://github.com/SimpleJWT/drf-SimpleJWT-server-template/blob/master/LICENSE).
